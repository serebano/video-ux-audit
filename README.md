# video-ux-audit

An agent skill and a set of zero-dependency tools for a **captioned video UX and performance audit** of any web view. The agent, or you, drives a real Chrome like a non-technical person. Every intent and every problem appears as a caption burned into the video, and the run ends with a `findings.md` that lists each issue with its repro steps, timestamp, screenshot, and UX and performance suggestions.

The method comes from an audit of a help-desk inbox: one recording produced 48 findings (1 P0, 20 P1, 27 P2), and these were turned into about 20 small fixes.

## Quickstart

Needs Node 22 or later, ffmpeg and Chrome.

```bash
# 1. Start Chrome with a debugging port and a throwaway profile
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir=/tmp/vua-profile

# 2. Record the example scenario: a tiny inbox with a broken search
node scripts/record.mjs examples/demo-scenario.json --port 9222 --out ./audit-out
#    (edit "goto" in the scenario to point at your copy of examples/demo.html)

# 3. Make the video and the report
bash scripts/encode.sh ./audit-out
node scripts/report.mjs ./audit-out --title "Demo inbox"
```

The output is `audit-out/audit.mp4`, `audit-out/findings.md`, `audit-out/shots/*.png` and `audit-out/timings.json`.

See `examples/demo-out/` for a real run: a 12-second video, one P1 finding, and a screenshot with the caption visible.

## Use it as an agent skill

Copy this folder into `.claude/skills/video-ux-audit/`, or wherever your agent loads skills from. `SKILL.md` holds the full method: safety rules, persona rules, the scenario step types, severity levels, how to write a good finding, a performance pass and how to deliver.

Then ask your agent: *"Run a video UX audit of /inbox as a non-technical support agent."*

## How it works

- `scripts/record.mjs` talks to Chrome directly over the DevTools Protocol, with no npm packages. It:
  - streams screencast frames with their real timestamps;
  - injects a visible pointer and a caption bar into the page, so captions are part of the recorded frames and need no ffmpeg text filters;
  - moves the pointer and types at human speed;
  - screenshots each problem while its caption is on screen;
  - records page timings.
- `scripts/encode.sh` turns the frames into a variable-frame-rate mp4 with their exact durations.
- `scripts/report.mjs` writes the findings, sorted by severity, to the Markdown table, followed by a timing table.

## Rules

Use only test accounts and test data. Make writes only in a sandbox. Never publish real customer names, emails, phone numbers or ids. The details are in `SKILL.md` §0.

MIT licensed.
