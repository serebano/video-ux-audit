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
| `events.json` | Every action, caption, console message, exception, request (status, ms, bytes, failures), long task and layout shift, timestamped on the video clock |
| `timeline.md` | The fused timeline, plus **auto-detected signals**, each linked to the frame where it happened |
| `ai-pack/` | Keyframes named by video time, `timeline.md` and `PROMPT.md`, ready for any multimodal LLM to review in one shot |
| `findings.md` | The final ranked list: issues, gaps and opportunities, each with evidence, a UX fix and a performance fix |

## 0. Safety

- Use test accounts and test data, and make writes only in a sandbox. Real user data is read-only.
- Never publish names, emails, phone numbers, ids or tokens. Scrub `events.json` (URLs, console text) before sharing.
- Use a throwaway browser profile, and close it at the end.

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

Scenario steps: `goto`, `say`, `click` (CSS selector, with a visible pointer), `type` (human speed), `press`, `scroll`, `wait`, and `problem` (a red caption, a screenshot and a finding).

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
| duplicate-request (same call within 2 s) | Wasted work; dedupe or cache |
| never-finished | Hung request, missing timeout, spinner forever |
| long-task (≥ 200 ms; P1 at ≥ 500 ms) | Frozen UI; split the work, virtualise, move to a worker |
| layout-shift (≥ 0.05, no input) | Content jumps; reserve space |

The thresholds can be changed with `--slow` and `--big`.

## 5. One-shot AI review

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

## 7. Close the loop

- Fix P0 first, then the P1s, with one small change per finding.
- Re-run the **same scenario** after each fix. Its new timeline is the proof: the signal is gone and the timing is better. Attach the before and after.
- Keep the scenarios as a library. Re-running them after each release catches regressions in seconds.
