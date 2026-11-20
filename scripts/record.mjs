#!/usr/bin/env node
// Zero-dependency captioned screen recorder over the Chrome DevTools Protocol.
// Usage: node scripts/record.mjs <scenario.json> [--port 9222] [--out ./audit-out]
// Chrome must run with --remote-debugging-port=<port>. Node >= 22 (built-in WebSocket).
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : d; };
const scenarioPath = args.find((a) => a.endsWith('.json'));
if (!scenarioPath) { console.error('usage: record.mjs <scenario.json> [--port 9222] [--out dir]'); process.exit(2); }
const scenario = JSON.parse(readFileSync(scenarioPath, 'utf8'));
const port = Number(opt('--port', scenario.port ?? 9222));
const out = resolve(opt('--out', scenario.out ?? './audit-out'));
const W = scenario.viewport?.width ?? 1440, H = scenario.viewport?.height ?? 900;
mkdirSync(join(out, 'frames'), { recursive: true }); mkdirSync(join(out, 'shots'), { recursive: true });

const target = await (await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: 'PUT' })).json();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
let seq = 0; const pending = new Map(); const handlers = [];
ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { const p = pending.get(d.id); pending.delete(d.id); d.error ? p.j(new Error(d.error.message)) : p.r(d.result); } else handlers.forEach((h) => h(d)); };
const send = (method, params = {}) => new Promise((r, j) => { const id = ++seq; pending.set(id, { r, j }); ws.send(JSON.stringify({ id, method, params })); });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const evaluate = async (expr) => (await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true })).result?.value;

// Frames: keep each frame with its wall-clock time; encode later with exact durations.
const frames = []; const t0 = Date.now();
handlers.push(async (d) => {
  if (d.method !== 'Page.screencastFrame') return;
  const n = frames.length; const file = `frames/f${String(n).padStart(6, '0')}.jpg`;
  writeFileSync(join(out, file), Buffer.from(d.params.data, 'base64'));
  frames.push({ file, t: Date.now() - t0 });
  send('Page.screencastFrameAck', { sessionId: d.params.sessionId }).catch(() => {});
});

await send('Page.enable'); await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 600 });
// Overlay: visible pointer + caption bar, re-injected after every navigation.
const OVERLAY = `(() => { if (window.__vua) return; window.__vua = 1;
  const c = document.createElement('div'); c.id='__vua_cursor';
  c.style.cssText='position:fixed;z-index:2147483647;width:18px;height:18px;border-radius:50%;background:rgba(255,80,80,.55);border:2px solid #fff;box-shadow:0 0 0 1px #000;pointer-events:none;left:-40px;top:-40px;transition:left .45s ease,top .45s ease';
  const b = document.createElement('div'); b.id='__vua_caption';
  b.style.cssText='position:fixed;z-index:2147483647;left:50%;bottom:28px;transform:translateX(-50%);max-width:80%;padding:12px 18px;border-radius:10px;font:600 20px/1.35 system-ui,sans-serif;color:#fff;background:rgba(0,0,0,.82);pointer-events:none;display:none;text-align:center';
  document.documentElement.append(c, b); })()`;
await send('Page.addScriptToEvaluateOnNewDocument', { source: `addEventListener('DOMContentLoaded', () => ${OVERLAY})` });
await send('Page.startScreencast', { format: 'jpeg', quality: 80, maxWidth: W, maxHeight: H, everyNthFrame: 1 });

const captions = []; const findings = []; const timings = [];
const now = () => Date.now() - t0;
const caption = async (text, ms = 3500, kind = 'note', onShown) => {
  await evaluate(OVERLAY);
  await evaluate(`(() => { const b = document.getElementById('__vua_caption'); b.textContent = ${JSON.stringify(text)}; b.style.background = ${JSON.stringify(kind === 'problem' ? 'rgba(180,20,20,.9)' : 'rgba(0,0,0,.82)')}; b.style.display='block'; })()`);
  captions.push({ start: now(), end: now() + ms, text, kind }); await sleep(400); if (onShown) await onShown(); await sleep(Math.max(0, ms - 400));
  await evaluate(`(() => { const b = document.getElementById('__vua_caption'); if (b) b.style.display='none'; })()`);
};
const center = async (sel) => evaluate(`(() => { const e = document.querySelector(${JSON.stringify(sel)}); if (!e) return null; e.scrollIntoView({block:'center'}); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; })()`);
const moveTo = async ({ x, y }) => { await evaluate(OVERLAY); await evaluate(`(() => { const c = document.getElementById('__vua_cursor'); c.style.left='${x - 9}px'; c.style.top='${y - 9}px'; })()`); await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); await sleep(600); };
const click = async (sel) => { const p = await center(sel); if (!p) throw new Error(`not found: ${sel}`); await moveTo(p); const s = Date.now();
  for (const type of ['mousePressed', 'mouseReleased']) await send('Input.dispatchMouseEvent', { type, x: p.x, y: p.y, button: 'left', clickCount: 1 });
  await sleep(150); timings.push({ step: `click ${sel}`, ms: Date.now() - s }); };
const type = async (sel, text) => { await click(sel); for (const ch of text) { await send('Input.insertText', { text: ch }); await sleep(90 + Math.random() * 140); } };

let shotN = 0;
for (const step of scenario.steps) {
  if (step.goto) { const s = Date.now(); await send('Page.navigate', { url: step.goto }); await sleep(step.settle ?? 2500);
    const nav = await evaluate(`JSON.stringify((() => { const n = performance.getEntriesByType('navigation')[0] || {}; const lcp = performance.getEntriesByType('largest-contentful-paint').pop(); return { ttfb: Math.round(n.responseStart||0), dcl: Math.round(n.domContentLoadedEventEnd||0), load: Math.round(n.loadEventEnd||0), lcp: lcp ? Math.round(lcp.startTime) : null }; })())`);
    timings.push({ step: `open ${step.goto}`, wallMs: Date.now() - s, ...JSON.parse(nav || '{}') }); }
  if (step.say) await caption(step.say, step.ms ?? 3000, 'note');
  if (step.click) await click(step.click);
  if (step.type) await type(step.type.selector, step.type.text);
  if (step.press) { for (const type of ['keyDown', 'keyUp']) await send('Input.dispatchKeyEvent', { type, key: step.press }); }
  if (step.scroll) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: W / 2, y: H / 2, deltaX: 0, deltaY: step.scroll }); await sleep(700); }
  if (step.wait) await sleep(step.wait);
  if (step.problem) { // { id, severity, title, expected, actual, area, ux, perf }
    const shot = `shots/${step.problem.id ?? `F${++shotN}`}.png`;
    const ts = now(); await caption(`${step.problem.severity ?? 'P2'} · ${step.problem.title}`, step.ms ?? 4000, 'problem', async () => {
      const png = await send('Page.captureScreenshot', { format: 'png' }); writeFileSync(join(out, shot), Buffer.from(png.data, 'base64')); });
    findings.push({ ...step.problem, videoAt: ts, screenshot: shot, steps: step.problem.steps ?? '' }); }
}
await send('Page.stopScreencast'); await sleep(300);
// ffconcat with exact per-frame durations (variable frame rate → real timing).
const lines = ['ffconcat version 1.0'];
frames.forEach((f, i) => { const next = frames[i + 1]?.t ?? f.t + 1000; lines.push(`file '${f.file}'`, `duration ${((next - f.t) / 1000).toFixed(3)}`); });
if (frames.length) lines.push(`file '${frames.at(-1).file}'`);
writeFileSync(join(out, 'frames.ffconcat'), lines.join('\n') + '\n');
writeFileSync(join(out, 'captions.json'), JSON.stringify(captions, null, 2));
writeFileSync(join(out, 'findings.json'), JSON.stringify(findings, null, 2));
writeFileSync(join(out, 'timings.json'), JSON.stringify(timings, null, 2));
await fetch(`http://127.0.0.1:${port}/json/close/${target.id}`).catch(() => {}); ws.close();
console.log(`recorded ${frames.length} frames, ${captions.length} captions, ${findings.length} findings → ${out}`);
