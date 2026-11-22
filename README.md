# video-ux-audit

A universal way to catch issues, gaps and opportunities in any UI. Record a short session of a person or an agent using it, and capture **every console, network and performance event on the same clock as the video frames**. Server logs can join the same clock too. Then review the fused timeline and the frames, and you get a ranked `findings.md` with evidence and fixes for UX and speed.

Video alone shows *what* went wrong; events alone show *something* went wrong. Put together, each frame is explained by its events, and each event is seen in its frame.

- **Real example, 33 s:** [`examples/2026-11-22-try-page-demo/`](examples/2026-11-22-try-page-demo/) has the video, 4 findings and a signal-by-signal count of what was real and what was noise.
- **Guide:** https://busymate.ai/artifact/video-ux-audit-guide

## Quickstart

Needs Node 22 or later, ffmpeg and Chrome.

```bash
# 1. Start Chrome with a debugging port (any profile: the recorder opens its own throwaway context)
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --remote-debugging-port=9222 --user-data-dir=/tmp/vua-profile

# 2. Record the example scenario: a tiny inbox with a broken search
node scripts/record.mjs examples/demo-scenario.json --port 9222 --out ./audit-out
#    (edit "goto" in the scenario to point at your copy of examples/demo.html)

# 3. Video, fused timeline with auto-signals, AI pack, report
bash scripts/encode.sh ./audit-out
node scripts/timeline.mjs ./audit-out
node scripts/report.mjs ./audit-out --title "Demo inbox"

# 4. Optional: put your server logs on the same clock (see "Backend correlation")
node scripts/correlate.mjs ./audit-out api.log db.log && node scripts/timeline.mjs ./audit-out
```

The output is `audit.mp4`, `events.json`, `meta.json`, `timeline.md`, `signals.json`, `ai-pack/`, `findings.md` and `shots/`.

## How it works

- `scripts/record.mjs` talks to Chrome over the DevTools Protocol, with no npm packages. It:
  - opens a **fresh, isolated browser context** (no cookies, no signed-in state) and removes it at the end, even on Ctrl-C. Pass `--shared-context` to use the browser's own profile instead;
  - streams screencast frames with their real timestamps;
  - records console messages, exceptions, every request (status, time, size, cache, failures), long tasks and layout shifts, all on the frame clock;
  - captures the server's own `Server-Timing` and request-id headers on every response;
  - with `--correlate <origin>`, gives each scenario step its own W3C `traceparent` header (see below);
  - injects a visible pointer and a caption bar into the page, so captions are part of the frames;
  - moves the pointer and types at human speed, and screenshots each problem while its caption is on screen.
- `scripts/encode.sh` turns the frames into a variable-frame-rate mp4 with their exact durations.
- `scripts/timeline.mjs` writes `timeline.md`: a **Steps** table (what each user step cost the browser and the server, with its trace id), the auto-signals, and the full timeline. It also builds `ai-pack/` for a model review.
- `scripts/correlate.mjs` merges server logs into `events.json` on the video clock.
- `scripts/report.mjs` writes `findings.md`.

Scenario steps: `goto`, `say`, `click` (CSS selector), `clickAt` ([x, y]; this reaches into iframes and canvases), `type` (selector + text), `keys` (type into whatever has focus), `press` (Enter, Tab, Escape…), `scroll`, `wait`, `problem`. Scenario options: `viewport`, `correlate` (list of origins), `privacySignals` (sends Global Privacy Control and Do Not Track so audit visits stay out of the site's analytics), `freeSeconds` (free mode: you or an agent drive the browser while everything is recorded).

## Backend correlation: what happens on the server during a pass

**What you get with no preparation, on any site:** everything the browser sees. That means every request with its status, timing, size and failure, the console and exceptions, frozen-UI moments and layout shifts. You also get any `Server-Timing` header (for example `db;dur=53, app;dur=120`) and any request-id header the server already sends (`x-request-id`, `traceparent`, `cf-ray`, `x-amzn-trace-id`, …). These are listed per request in `timeline.md`.

**What needs a little preparation (once per project):**

1. **Tie server work to the step.** Run with `--correlate https://app.example.com` (one or more of your own origins). For every scenario step, the recorder creates a new trace id and adds `traceparent: 00-<trace id>-<span id>-01` and `x-vua-step: <n>` to requests sent to those origins only. Same-origin requests need no CORS change. A cross-origin API must allow both headers in `Access-Control-Allow-Headers`. Third-party hosts never get them.
2. **Make the server log the trace id.** OpenTelemetry and most APM agents read `traceparent` without any change. Without one, add the header value to your request log line (one middleware line). For the database, pass it on as a query comment (sqlcommenter style: `/* traceparent='…' */`) so slow-query logs carry it too.
3. **Optional: send `Server-Timing`** from your API (`db;dur=…, cache;desc=hit`). The browser then shows server time per request, with no log access at all.

**After the pass**, export the logs for the recording window (`meta.json` has `t0Iso` and `durationMs`) and run `correlate.mjs`:

| Source | Example export |
|---|---|
| Kubernetes | `kubectl logs deploy/api --since-time=<t0Iso> --timestamps > api.log` |
| Docker | `docker logs --timestamps --since <t0Iso> api > api.log` |
| systemd | `journalctl -u api -o short-iso-precise --since "<t0Iso>" > api.log` |
| PostgreSQL | `log_min_duration_statement = 0` (or a threshold) for the test run; copy the log |
| APM / log store | export from Loki, CloudWatch, Datadog or Sentry, filtered by the trace ids in `meta.json` |

`correlate.mjs` reads JSON-lines logs and plain-text logs that start with a timestamp. It puts each line on the video clock (`video time = log time − t0`). Lines that contain a step's trace id are linked to that step **exactly**. Other lines are linked **by time** to the step running at that moment, and are labelled that way. Server errors and slow lines (`duration … ms`, `duration_ms`) become signals at their frame. `--skew-ms` corrects a server clock that is off (check it with NTP, or compare one request's server time with the browser's).

**What it does not do today:** it does not pull logs from your servers by itself, it does not read database query plans, and it does not see server work that no request triggered (queues, cron jobs, webhooks) unless that work logs the trace id it was handed.

## Video analysis: notes during the pass, or a review afterwards

There are two ways to find problems, and they catch different things:

| | During the pass | After the pass |
|---|---|---|
| Who | The agent or person driving, writing a `problem` step, or a note, the moment something looks wrong | A model (or person) given `ai-pack/`: keyframes about once a second plus a frame at every signal and step, `timeline.md` and `PROMPT.md` |
| Catches | Broken flows, wrong results, "two screens disagree", anything that needs intent and context | Things too fast or too quiet to notice live: flashes of the wrong content, half-rendered states, layout jumps, a spinner that never stopped, network waste that never reaches the screen |
| Misses | Short visual glitches, background waste | Anything that needs to know what the user meant, or state outside the frames |

Do both when it matters. In the example, two of the four findings (a half-second brand flash and raw Markdown flickering while the answer streamed) were seen only by looking at the frames afterwards, zooming into the moments around each event. Neither left any trace in the console or network. Today the review step is manual: hand `ai-pack/` to any multimodal model, or look at the frames yourself. No script calls a model for you. The whole video is never sent: one frame a second, plus one at every event, is enough and much cheaper.

## In practice: time, cost, noise, how to start

Real numbers, with their sources:

| Run | Scope | Time | Result |
|---|---|---|---|
| A help-desk inbox, full flow (the run this method came from) | Every control in an action inventory: list, filters, keyboard, thread actions, ownership, contact panel, deep links, a phone-width pass | **55 min** wall time for an agent (one model, Opus tier), producing a **14 min 37 s** video in 5 segments | **48 findings** (1 P0, 20 P1, 27 P2). None was withdrawn as false; 6 turned out to share a root cause with another finding. About 20 fixes, shipped one by one |
| The example in this repo | One screen, one question | Exploratory pass 34 s + review about 10 min + captioned pass 35 s | **18 signals**: 11 real (61%), which collapsed into 3 issues, and 7 noise. 1 more issue was found only in the frames. 4 findings in total, all P2 |

- **Cost of the inbox run:** about 61 M cached input tokens read, 0.4 M written to cache, 0.13 M output. At list API prices for that model ($4 input, $20 output and $0.20 cache read per million tokens), that is roughly **$17**. Most of it is the agent re-reading its own long context. A single screen is a small fraction of that. The example was not metered on its own.
- **Noise:** auto-signals are hints, not findings. In the example, the noise was requests the browser never reported as finished (keepalive-style analytics), and layout shifts while a chat answer grows. Cached responses and open event streams were noise too, until the tools learned to skip them; that halved the signal count. Plan a few minutes per screen to dismiss noise by looking at each signal's frame.
- **How to start:**
  - *Scripted:* write `scenario.json` yourself. It is repeatable, and after a fix it becomes the regression test.
  - *"Check screen X":* tell an agent "audit /inbox as a non-technical support agent". It first writes an **action inventory** from the UI (and the code, if it has it): every control, menu, shortcut, state and route into the screen. Then it walks that list as its to-do list, recording in free mode or writing the scenario as it goes. The inbox run worked this way.
  - Best of both: explore first without captions, review, then record a short captioned pass for the issues you confirmed (that is how the example was made).

## What I would change if I started again

- **Correlation ids from day one.** The first big run had no backend correlation at all: server causes were found later, while fixing. Per-step `traceparent` plus `Server-Timing` costs one middleware line and saves hours.
- **Shorter passes, one area each.** 14 minutes in one video was too long to review well. 30–90 s per screen, one job per pass, is easier to review and to re-run.
- **Read the console and network after every segment, not once.** In the first run, events were read back only after the first segment, and a browser restart lost the rest.
- **An isolated browser context by default.** Recording in a signed-in profile risks showing private data in frames; that is now the default.
- **Review the frames on purpose.** The brief, silent glitches only show up when you look at the frames around each event afterwards.
- **Teach the signals what is normal.** Streams, cache hits and beacons first raised false alarms; each rule that knows "this is by design" makes the list shorter and more trusted.
- **Still to do:** a caption position option (captions can cover what they point at), a script that sends `ai-pack/` to a model, and log fetchers for common stacks so `correlate.mjs` gets its input without a manual export.

## Use it as an agent skill

Copy this folder into `.claude/skills/video-ux-audit/`, or wherever your agent loads skills from. `SKILL.md` holds the full method: safety rules, persona rules, step types, severity levels, how to write a good finding, a performance pass and how to deliver.

## Rules

Use only test accounts and test data, and make writes only in a sandbox. Never publish real customer names, emails, phone numbers or ids, and scrub `events.json` before sharing it. The details are in `SKILL.md` §0.

MIT licensed.
