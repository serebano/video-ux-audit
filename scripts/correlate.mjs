#!/usr/bin/env node
// Put server-side logs on the video clock and link each line to the scenario step that caused it.
// Usage: node scripts/correlate.mjs <audit-out-dir> <log-file>... [--source api] [--skew-ms 0] [--pad-ms 5000]
// A log file is any text file whose lines carry a timestamp: JSON lines (ts/time/timestamp/@timestamp/t),
// or plain text starting with an ISO-8601 or "YYYY-MM-DD HH:MM:SS(.mmm)" time (UTC unless an offset is given).
// Typical sources, exported for the recording window (meta.json has t0Iso and durationMs):
//   kubectl logs deploy/api --since-time=<t0Iso> --timestamps      docker logs --timestamps --since <t0Iso> api
//   journalctl -u api -o short-iso-precise --since "<t0Iso>"       Postgres log with log_min_duration_statement=0
//   any APM / log store export (Loki, CloudWatch, Datadog, Sentry) filtered by the trace ids in meta.json
// Matching: a line that contains a step's trace id (32 hex chars, from the traceparent header) is linked to that
// step exactly. Every other line is placed by time only and linked to the step that was running at that moment.
import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'node:fs';
import { join, basename } from 'node:path';

const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf(k); return i >= 0 ? argv[i + 1] : d; };
const dir = argv[0]; const files = argv.slice(1).filter((a, i, all) => !a.startsWith('--') && !(all[i - 1] ?? '').startsWith('--'));
if (!dir || !files.length) { console.error('usage: correlate.mjs <audit-out-dir> <log-file>... [--source name] [--skew-ms 0] [--pad-ms 5000]'); process.exit(2); }
const meta = JSON.parse(readFileSync(join(dir, 'meta.json'), 'utf8'));
const skew = Number(opt('--skew-ms', 0)), pad = Number(opt('--pad-ms', 5000));
const browserCopy = join(dir, 'events.browser.json');
if (!existsSync(browserCopy)) copyFileSync(join(dir, 'events.json'), browserCopy); // keep the browser-only events once
const events = JSON.parse(readFileSync(browserCopy, 'utf8'));
const byTrace = new Map(meta.steps.map((s) => [s.traceId, s]));
const stepAt = (t) => { let cur = null; for (const s of meta.steps) { if (s.t <= t) cur = s; else break; } return cur; };

const TS_KEYS = ['ts', 'time', 'timestamp', '@timestamp', 't', 'date'];
const parseTime = (v) => {
  if (typeof v === 'number') return v > 1e12 ? v : v * 1000; // epoch ms or s
  if (typeof v !== 'string') return NaN;
  let s = v.trim().replace(' ', 'T');
  if (/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d+)?$/.test(s)) s += 'Z'; // no offset: treat as UTC
  return Date.parse(s);
};
const LEAD = /^\s*\[?(\d{4}-\d\d-\d\d[T ]\d\d:\d\d:\d\d(?:[.,]\d+)?(?:Z|[+-]\d\d:?\d\d)?)\]?\s*/;
const server = [];
for (const file of files) {
  const source = opt('--source', basename(file).replace(/\.[^.]+$/, ''));
  for (const raw of readFileSync(file, 'utf8').split('\n')) {
    if (!raw.trim()) continue;
    let epoch = NaN, text = raw, level = '', json = null;
    if (raw.trim().startsWith('{')) { try { json = JSON.parse(raw); } catch {} }
    if (json) { for (const k of TS_KEYS) if (json[k] !== undefined) { epoch = parseTime(json[k]); break; }
      level = String(json.level ?? json.severity ?? json.lvl ?? '').toLowerCase(); text = json.msg ?? json.message ?? raw; }
    else { const m = raw.match(LEAD); if (m) { epoch = parseTime(m[1].replace(',', '.')); text = raw.slice(m[0].length); } }
    if (Number.isNaN(epoch)) continue;
    const t = epoch + skew - meta.t0EpochMs;
    if (t < -pad || t > meta.durationMs + pad) continue;
    if (!level) level = (String(text).match(/\b(fatal|panic|error|err|warn(?:ing)?|info|debug)\b/i)?.[1] ?? '').toLowerCase();
    const trace = String(raw).match(/\b[0-9a-f]{32}\b/i)?.[0]?.toLowerCase();
    const exact = trace && byTrace.get(trace);
    const jms = json ? Number(json.duration_ms ?? json.elapsed_ms ?? json.latency_ms ?? json.response_time_ms ?? NaN) : NaN;
    const ms = !Number.isNaN(jms) ? jms : Number(String(raw).match(/\b(?:duration|dur|elapsed|took|time)["=:\s]+([\d.]+)\s*ms\b/i)?.[1] ?? NaN);
    const step = exact ?? stepAt(t);
    server.push({ t: Math.round(t), type: 'server', source, level, text: String(typeof text === 'string' ? text : JSON.stringify(text)).slice(0, 500),
      ...(Number.isNaN(ms) ? {} : { ms }), ...(trace ? { traceId: trace } : {}), step: step?.n ?? 0, link: exact ? 'trace' : 'time' });
  }
}
const merged = [...events, ...server].sort((a, b) => a.t - b.t);
writeFileSync(join(dir, 'events.json'), JSON.stringify(merged, null, 1));
const exact = server.filter((s) => s.link === 'trace').length;
console.log(`server lines on the video clock: ${server.length} (${exact} linked by trace id, ${server.length - exact} by time) → events.json; rerun timeline.mjs`);
