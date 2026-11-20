# video-ux-audit

A universal way to catch issues, gaps and opportunities in any UI. Record a short session of a person using it, and capture **every console, network and performance event on the same clock as the video frames**. An AI then reviews the whole fused timeline in one shot, and you get a ranked `findings.md` with evidence and fixes for UX and speed.

Video alone shows *what* went wrong; events alone show *something* went wrong. Put together, each frame is explained by its events, and each event is seen in its frame.

The method comes from an audit of a help-desk inbox: one recording produced 48 findings (1 P0, 20 P1, 27 P2), and these were turned into about 20 small fixes.

## Quickstart

Needs Node 22 or later, ffmpeg and Chrome.

```bash
# 1. Start Chrome with a debugging port and a throwaway profile
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir=/tmp/vua-profile

# 2. Record the example scenario: a tiny inbox with a broken search
node scripts/record.mjs examples/demo-scenario.json --port 9222 --out ./audit-out
#    (edit "goto" in the scenario to point at your copy of examples/demo.html)

# 3. Video, fused timeline with auto-signals, AI pack, report
bash scripts/encode.sh ./audit-out
node scripts/timeline.mjs ./audit-out
node scripts/report.mjs ./audit-out --title "Demo inbox"
```

Then give `audit-out/ai-pack/` (keyframes, `timeline.md` and `PROMPT.md`) to any multimodal LLM for a one-shot review. Every finding it returns must cite a frame or an event.

For free exploration, use a scenario of `{"url": "https://…", "freeSeconds": 60}`: you or an agent drive the browser, and everything is recorded.

The output is `audit.mp4`, `events.json`, `timeline.md`, `signals.json`, `ai-pack/`, `findings.md` and `shots/`.

See `examples/demo-out/` for a real 13-second run. The demo page has a JS error, a failed request, a 500 response and a frozen main thread planted in it, and the timeline flags each one at the frame where it happens.

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
