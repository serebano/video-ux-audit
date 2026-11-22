---
name: video-ux-audit
description: Universal instrument to find issues, gaps and opportunities in any UI fast. Record a short session of a person using it, capture every console, network and performance event on the same clock as the video frames, and let an AI review the whole fused timeline in one shot. Output is a ranked findings.md with evidence and UX and performance fixes. Use for "audit this view/app/flow", "why does X feel broken or slow", before a redesign, or after a release.
---

# Video + timeline UX audit

**The idea:** a few seconds to a few minutes of real use already holds most of what is wrong. Problems slip past because nobody sees everything at once: what the person tried, what the screen showed, what the code logged, and what the network did. This method records all of it **on one clock**, so every frame can be explained by its events and every event can be seen in its frame. An AI then reads the whole picture in a single pass.

## Outputs

| File | What it is |
|---|---|
| `audit.mp4` | The session, with captions burned in: black for intent, red for each problem |
| `events.json` | Every action, caption, console message, exception, request (status, ms, bytes, cache, failures, Server-Timing, request ids, trace id), long task and layout shift, timestamped on the video clock; server log lines too once `correlate.mjs` ran |
| `meta.json` | Recording start (`t0Iso`, epoch ms), duration, and each step with its time and trace id: the key to put any server log on the video clock |
| `timeline.md` | The fused timeline, plus **auto-detected signals**, each linked to the frame where it happened |
| `ai-pack/` | Keyframes named by video time, `timeline.md` and `PROMPT.md`, ready for any multimodal LLM to review in one shot |
| `findings.md` | The final ranked list: issues, gaps and opportunities, each with evidence, a UX fix and a performance fix |

## 0. Safety

- Use test accounts and test data, and make writes only in a sandbox. Real user data is read-only.
- Never publish names, emails, phone numbers, ids or tokens. Scrub `events.json` (URLs, console text) before sharing.
- The recorder opens a throwaway, isolated browser context and disposes of it at the end; keep it that way (`--shared-context` only for a test account). Set `"privacySignals": true` to keep audit visits out of the site's analytics.

## 1. Frame the session (2 minutes)

- Name **one to three jobs** a real user comes for, in their words. For example: "find the order", "reply to the customer", "change my plan".
- Choose the length to fit the UI: **10–60 s** for one screen, **2–5 min** for a whole flow. Shorter, focused sessions beat long ones.

## 2. Act like a real, non-technical person

- **Say what you intend** before each move (a `say` caption).
- **Use only what is visible.** No typed URLs, no dev tools, no hidden shortcuts.
- **Try the obvious path first.** When it fails, that is a finding, even if another route works.
- **After every action, check that everything agrees:** list, counters, header, other panels, and the other party's view.
- **Stress the state.** Reload, go back, open in a new tab, use a slow network, and use phone width (390×844).
- **Note the waits.** If you wait, the user waits.

There are two ways to drive:
- **Scripted.** A `scenario.json` of steps. It is repeatable, and the same file becomes the regression proof after the fix.
- **Free.** `{"url": "...", "freeSeconds": 90}`. A person or an agent drives the browser by hand while everything is recorded. Use this for exploration.

## 3. Record (web: Chrome DevTools Protocol, zero dependencies)

```bash
chrome --remote-debugging-port=9222 --user-data-dir=/tmp/vua   # throwaway profile
node scripts/record.mjs scenario.json --port 9222 --out ./audit-out
bash scripts/encode.sh ./audit-out                 # → audit.mp4
node scripts/timeline.mjs ./audit-out              # → timeline.md, signals.json, ai-pack/
node scripts/report.mjs ./audit-out --title "X"    # → findings.md (captioned findings)
```

Scenario steps: `goto`, `say`, `click` (CSS selector, with a visible pointer), `clickAt` ([x, y], reaches into iframes), `type` (human speed), `keys` (into the focused field), `press`, `scroll`, `wait`, and `problem` (a red caption, a screenshot and a finding).

### 3b. Backend correlation

- **Out of the box:** requests, console, exceptions, `Server-Timing` and request-id response headers, per request.
- **Per-step trace ids:** `--correlate https://your-app` (your own origins only). Each step gets a new W3C `traceparent` plus `x-vua-step`; `timeline.md` shows each step's trace id, request count, bytes, slowest request and Server-Timing.
- **Prepare once in code:** log the `traceparent` (OpenTelemetry/APM do this already), pass it to SQL as a comment so slow-query logs carry it, and send `Server-Timing`.
- **After the pass:** export the logs for `meta.json`'s window (kubectl/docker/journalctl/Postgres/APM), then `node scripts/correlate.mjs <out> <log>... && node scripts/timeline.mjs <out>`. Lines with a step's trace id link to that step exactly; the rest link by time and say so. Server errors and slow lines become signals at their frame. Fix clock drift with `--skew-ms`.
- Not covered: work no request triggered (queues, cron) unless it logs the trace id it was given.

**Other environments use the same method with a different capture.** Whatever the platform, record the screen plus the platform's log and network streams, put all of them on one clock, and pass them to `timeline.mjs` as `events.json`:

| Platform | Screen | Logs and network |
|---|---|---|
| iOS | `xcrun simctl io booted recordVideo` | `log stream`; a proxy (mitmproxy) for network |
| Android | `adb shell screenrecord` | `adb logcat`; a proxy for network |
| Desktop / Electron | OS screen capture | the CDP port, as for the web |
| Terminal / CLI | `asciinema` | stderr, with timestamps |

## 4. Auto-signals (found for you, verify each one against its frame)

| Signal | Typical meaning |
|---|---|
| js-exception, console-error | Broken feature, often silent for the user |
| request-failed, http-5xx, http-4xx | Missing data, wrong state, bad permissions |
| slow-request (≥ 1 s; P1 at ≥ 3 s) | A wait the user feels; candidate for cache, prefetch or an index |
| heavy-payload (≥ 500 KB) | Slow on mobile; paginate, compress or trim fields |
| duplicate-request (same call within 2 s; cache hits skipped) | Wasted work; dedupe or cache |
| never-finished (streams skipped) | Hung request, missing timeout, spinner forever; often noise for keepalive or beacon requests |
| long-task (≥ 200 ms; P1 at ≥ 500 ms) | Frozen UI; split the work, virtualise, move to a worker |
| layout-shift (≥ 0.05, no input) | Content jumps; reserve space |
| server-error (after `correlate.mjs`) | A server log line at error level, linked to its step by trace id or by time |
| slow-server (≥ 1 s in a log line) | A slow handler or query, at the frame where the user waited |

The thresholds can be changed with `--slow` and `--big`.

## 5. Two kinds of review

- **During the pass:** write a `problem` step (or a note) the moment something looks wrong. This catches broken flows, wrong results and screens that disagree: anything that needs intent.
- **After the pass:** look at the frames around every signal and step, at least once a second. This catches what is too fast or too quiet to see live: flashes of wrong content, half-rendered states, Markdown or layout flicker, spinners that never stop, and network waste that never reaches the screen. Don't send the whole video; `ai-pack/` already samples it.

### One-shot AI review

Give the AI `ai-pack/` (the keyframes, `timeline.md` and `PROMPT.md`). It returns, in a single pass:

1. **Issues**, each with severity and evidence: a frame and the timeline lines that explain it.
2. **Gaps**: dead ends, missing feedback, unclear states, missing affordances, and two screens that disagree.
3. **Opportunities**: requests to remove, cache or prefetch; steps to merge; defaults to set; what a top competitor does better.
4. **A ranking** of everything by user impact ÷ effort.

Rule: **no evidence, no row.** Every claim cites a frame or an event.

## 6. Severity

- **P0**: data loss, wrong recipient, privacy or security leak, or the core job is impossible.
- **P1**: the core job is broken or misleading, an action takes over 1 s or a view over 3 s, a JS exception sits on the main path, or two surfaces disagree.
- **P2**: friction, confusing wording, a cosmetic problem, or wasted requests.

## 7. Budget and noise (measured)

- One screen: an exploratory pass under a minute, about 10 minutes of review, a captioned pass under a minute. A whole flow (about 15 minutes of video) took an agent 55 minutes and about $17 at list API prices, and produced 48 findings.
- About 60% of auto-signals were real in the measured example. The usual noise is keepalive or beacon requests reported as never finished, and layout shifts while content streams in by design. Check every signal against its frame before it becomes a finding.

## 8. Close the loop

- Fix P0 first, then the P1s, with one small change per finding.
- Re-run the **same scenario** after each fix. Its new timeline is the proof: the signal is gone and the timing is better. Attach the before and after.
- Keep the scenarios as a library. Re-running them after each release catches regressions in seconds.
