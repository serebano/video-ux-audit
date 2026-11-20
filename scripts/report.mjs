#!/usr/bin/env node
// findings.json + timings.json → findings.md (the audit report).
// Usage: node scripts/report.mjs <audit-out-dir> [--title "Inbox"]
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
const dir = process.argv[2]; if (!dir) { console.error('usage: report.mjs <audit-out-dir> [--title X]'); process.exit(2); }
const ti = process.argv.indexOf('--title'); const title = ti > 0 ? process.argv[ti + 1] : 'View';
const read = (f, d) => existsSync(join(dir, f)) ? JSON.parse(readFileSync(join(dir, f), 'utf8')) : d;
const findings = read('findings.json', []); const timings = read('timings.json', []);
const order = { P0: 0, P1: 1, P2: 2 }; findings.sort((a, b) => (order[a.severity] ?? 3) - (order[b.severity] ?? 3));
const mmss = (ms) => `${String(Math.floor(ms / 60000)).padStart(2, '0')}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
const cell = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const count = (s) => findings.filter((f) => f.severity === s).length;
const md = [
  `# ${title}: video UX audit, findings`, '',
  `Video: \`audit.mp4\` (timestamps are caption times). Total: ${findings.length}, P0 ${count('P0')}, P1 ${count('P1')}, P2 ${count('P2')}.`, '',
  '| ID | Sev | Finding | Steps | Expected | Actual | Video | Screenshot | Suspected area | UX suggestion | Performance suggestion |',
  '|---|---|---|---|---|---|---|---|---|---|---|',
  ...findings.map((f) => `| ${cell(f.id)} | ${cell(f.severity)} | ${cell(f.title)} | ${cell(f.steps)} | ${cell(f.expected)} | ${cell(f.actual)} | ${mmss(f.videoAt ?? 0)} | ${cell(f.screenshot)} | ${cell(f.area)} | ${cell(f.ux)} | ${cell(f.perf)} |`),
  '', '## Timings', '', '| Step | Wall ms | TTFB | DCL | Load | LCP |', '|---|---|---|---|---|---|',
  ...timings.map((t) => `| ${cell(t.step)} | ${t.wallMs ?? t.ms ?? ''} | ${t.ttfb ?? ''} | ${t.dcl ?? ''} | ${t.load ?? ''} | ${t.lcp ?? ''} |`),
  '', '## Next', '', '- Fix P0 first, then P1. One small change per finding, each proven with a fresh recording of the same steps.', '',
].join('\n');
writeFileSync(join(dir, 'findings.md'), md); console.log(`wrote ${join(dir, 'findings.md')} (${findings.length} findings)`);
