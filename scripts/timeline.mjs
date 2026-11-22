#!/usr/bin/env node
// Fuse video frames + console + network + perf + actions into ONE timeline, auto-flag signals,
// and build a single-shot AI review pack (timeline.md + keyframes) for any LLM.
// Usage: node scripts/timeline.mjs <audit-out-dir> [--slow 1000] [--big 500000]
import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs';
import { join } from 'node:path';
const dir = process.argv[2]; if (!dir) { console.error('usage: timeline.mjs <audit-out-dir>'); process.exit(2); }
const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? Number(process.argv[i + 1]) : d; };
const SLOW = arg('--slow', 1000), BIG = arg('--big', 500000);
const read = (f, d) => existsSync(join(dir, f)) ? JSON.parse(readFileSync(join(dir, f), 'utf8')) : d;
const events = read('events.json', []), frames = read('frames.json', []), findings = read('findings.json', []), meta = read('meta.json', null);
const serverMs = (e) => { const st = e.ids?.['server-timing']; if (!st) return null; const d = [...st.matchAll(/dur=([\d.]+)/g)].map((m) => +m[1]); return d.length ? Math.round(Math.max(...d)) : null; };
const frameAt = (t) => { let best = frames[0]; for (const f of frames) { if (f.t <= t) best = f; else break; } return best?.file ?? ''; };
const ts = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}.${String(ms % 1000).padStart(3, '0')}`;
const short = (u = '') => u.replace(/^https?:\/\/[^/]+/, '').slice(0, 90) || u.slice(0, 90);

// Auto-detected signals: things a human usually misses while watching.
const signals = []; const flag = (e, sev, kind, text) => signals.push({ t: e.t, sev, kind, text, frame: frameAt(e.t) });
const seen = new Map();
for (const e of events) {
  if (e.type === 'exception') flag(e, 'P1', 'js-exception', e.text.split('\n')[0]);
  if ((e.type === 'console' && /error|assert/.test(e.level)) || (e.type === 'log' && e.level === 'error')) flag(e, 'P2', 'console-error', e.text);
  if (e.type === 'console' && e.level === 'warning') flag(e, 'P2', 'console-warning', e.text);
  if (e.type === 'request') {
    if (e.failed && !/ERR_ABORTED/.test(e.failed)) flag(e, 'P1', 'request-failed', `${e.method} ${short(e.url)} · ${e.failed}${e.blocked ? ` (${e.blocked})` : ''}`);
    else if (e.status >= 500) flag(e, 'P1', 'http-5xx', `${e.status} ${e.method} ${short(e.url)}`);
    else if (e.status >= 400) flag(e, 'P2', 'http-4xx', `${e.status} ${e.method} ${short(e.url)}`);
    const stream = /event-stream/.test(e.mime ?? '') || e.kind === 'EventSource' || e.kind === 'WebSocket'; // open by design
    const cached = e.fromCache || (e.bytes === 0 && (e.ms ?? 0) < 5);
    if (e.ms >= SLOW && !e.failed && !stream) flag(e, e.ms >= 3 * SLOW ? 'P1' : 'P2', 'slow-request', `${e.ms} ms ${e.method} ${short(e.url)}`);
    if (e.bytes >= BIG) flag(e, 'P2', 'heavy-payload', `${Math.round(e.bytes / 1024)} KB ${short(e.url)}`);
    if (e.pending && !stream) flag(e, 'P2', 'never-finished', `${e.method} ${short(e.url)}`);
    const k = `${e.method} ${e.url}`; const prev = seen.get(k);
    if (prev !== undefined && e.t - prev < 2000 && e.kind !== 'Image' && !cached) flag(e, 'P2', 'duplicate-request', `same ${e.method} ${short(e.url)} twice within 2 s`);
    seen.set(k, e.t);
  }
  if (e.type === 'server' && /fatal|panic|error|err|crit/.test(e.level)) flag(e, 'P1', 'server-error', `[${e.source}] step ${e.step} (${e.link}): ${e.text.split('\n')[0]}`);
  if (e.type === 'server' && e.ms >= SLOW) flag(e, e.ms >= 3 * SLOW ? 'P1' : 'P2', 'slow-server', `[${e.source}] ${e.ms} ms step ${e.step}: ${e.text.split('\n')[0]}`);
  if (e.type === 'perf' && e.kind === 'longtask' && e.ms >= 200) flag(e, e.ms >= 500 ? 'P1' : 'P2', 'long-task', `main thread blocked ${e.ms} ms (UI frozen)`);
  if (e.type === 'perf' && e.kind === 'layout-shift' && !e.hadInput && e.value >= 0.05) flag(e, 'P2', 'layout-shift', `content jumped (CLS ${e.value})`);
}
// Action → response gaps: an action with no network/DOM-visible response for a long time.
const actions = events.filter((e) => e.type === 'action');
const reqCount = events.filter((e) => e.type === 'request').length;
const totalBytes = events.filter((e) => e.type === 'request').reduce((a, e) => a + (e.bytes || 0), 0);

const rows = [...events.filter((e) => e.type !== 'request' || e.failed || e.status >= 400 || e.ms >= SLOW).map((e) => ({ t: e.t, what: e.type === 'server' ? `SERVER[${e.source}${e.level ? `:${e.level}` : ''}] step ${e.step} by ${e.link}${e.ms ? ` ${e.ms}ms` : ''} ${e.text.split('\n')[0].slice(0, 160)}` : e.type === 'request' ? `net ${e.status ?? e.failed} ${e.ms ?? '?'}ms${serverMs(e) != null ? ` (server ${serverMs(e)}ms)` : ''} ${e.method} ${short(e.url)}${e.traceparent ? ` trace ${e.traceparent.slice(3, 11)}…` : ''}${e.ids?.['x-request-id'] ? ` req ${e.ids['x-request-id'].slice(0, 12)}` : ''}` : e.type === 'action' ? `ACTION ${e.step}` : e.type === 'caption' ? `CAPTION[${e.kind}] ${e.text}` : `${e.type}${e.level ? `:${e.level}` : ''}${e.kind ? `:${e.kind}` : ''} ${(e.text ?? (e.ms ?? e.value) ?? '').toString().split('\n')[0].slice(0, 160)}` }))];
// Per-step summary: what each user step cost the browser and the server.
const stepRows = (meta?.steps ?? []).map((st, i, all) => { const end = all[i + 1]?.t ?? Infinity;
  const inStep = (e) => e.step === st.n || (e.step === undefined && e.t >= st.t && e.t < end);
  const rq = events.filter((e) => e.type === 'request' && inStep(e)); const sv = events.filter((e) => e.type === 'server' && e.step === st.n);
  const bad = rq.filter((e) => e.failed || e.status >= 400).length + events.filter((e) => (e.type === 'exception' || (e.type === 'console' && e.level === 'error')) && e.t >= st.t && e.t < end).length;
  const srv = rq.map(serverMs).filter((x) => x != null);
  return `| ${st.n} | ${ts(st.t)} | ${st.step.replace(/\|/g, '\\|').slice(0, 70)} | ${rq.length} | ${Math.round(rq.reduce((a, e) => a + (e.bytes || 0), 0) / 1024)} | ${rq.length ? Math.max(...rq.map((e) => e.ms || 0)) : ''} | ${srv.length ? Math.max(...srv) : ''} | ${bad} | ${sv.length} | \`${st.traceId.slice(0, 8)}…\` |`; });
const md = [
  '# Timeline: video frames + actions + console + network + performance', '',
  `Duration ${ts(frames.at(-1)?.t ?? 0)} · ${frames.length} frames · ${actions.length} actions · ${reqCount} requests (${Math.round(totalBytes / 1024)} KB) · ${signals.length} auto-signals · ${findings.length} captioned findings`, '',
  ...(stepRows.length ? ['## Steps (browser + server cost of each user step)', '', `Recording started ${meta.t0Iso} (video 00:00.000). Server time of any line = t0 + video time.`, '',
    '| # | Video | Step | Requests | KB | Slowest ms | Server-Timing max ms | Errors | Server lines | Trace id |', '|---|---|---|---|---|---|---|---|---|---|', ...stepRows, ''] : []),
  '## Auto-detected signals (verify each against its frame)', '',
  '| Time | Sev | Kind | Detail | Frame |', '|---|---|---|---|---|',
  ...signals.map((s) => `| ${ts(s.t)} | ${s.sev} | ${s.kind} | ${s.text.replace(/\|/g, '\\|').slice(0, 200)} | ${s.frame} |`),
  '', '## Full timeline (noise filtered: only failed, slow or ≥400 requests)', '', '| Time | Event | Frame |', '|---|---|---|',
  ...rows.map((r) => `| ${ts(r.t)} | ${r.what.replace(/\|/g, '\\|')} | ${frameAt(r.t)} |`), '',
].join('\n');
writeFileSync(join(dir, 'timeline.md'), md);
writeFileSync(join(dir, 'signals.json'), JSON.stringify(signals, null, 1));

// Single-shot AI pack: ~1 keyframe per second + one at every signal/caption, plus the prompt.
const pack = join(dir, 'ai-pack'); mkdirSync(pack, { recursive: true });
const pick = new Set(); let last = -1e9;
for (const f of frames) if (f.t - last >= 1000) { pick.add(f.file); last = f.t; }
for (const s of signals) if (s.frame) pick.add(s.frame);
for (const e of events) if (e.type === 'caption' || e.type === 'action') { const f = frameAt(e.t + 300); if (f) pick.add(f); }
const keyframes = frames.filter((f) => pick.has(f.file)).slice(0, 120);
for (const f of keyframes) copyFileSync(join(dir, f.file), join(pack, `${ts(f.t).replace(/[:.]/g, '-')}.jpg`));
writeFileSync(join(pack, 'PROMPT.md'), `You are a senior UX + performance reviewer. Attached: keyframes named by video time (mm-ss-mmm.jpg) and timeline.md (actions, captions, console, network, perf and, when exported, SERVER log lines, all on the SAME clock; the Steps table links each step to its trace id).
In ONE pass, produce findings.md rows: ID, severity (P0 data loss/privacy/core job impossible · P1 broken, misleading, slow >1 s action / >3 s view, or two surfaces disagree · P2 friction/wording/cosmetic), title, steps, expected, actual, video time, evidence (frame + event lines), suspected area, UX suggestion, performance suggestion.
Then list OPPORTUNITIES and GAPS: missing affordances, dead ends, unclear states, missing feedback, redundant requests, cacheable or prefetchable data, things a competitor does better. Rank everything by user impact ÷ effort. Do not invent: every row must cite a frame or a timeline line.\n`);
copyFileSync(join(dir, 'timeline.md'), join(pack, 'timeline.md'));
console.log(`timeline.md: ${signals.length} signals · ai-pack: ${keyframes.length} keyframes + PROMPT.md + timeline.md`);
