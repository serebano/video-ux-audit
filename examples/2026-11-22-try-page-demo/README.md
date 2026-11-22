# Example: one real pass on a public demo page (2026-11-22)

A short, real run of this method on a public page that anyone can open: the "try it" page of an AI chat product, showing a demo interior-design studio's assistant (`https://busymate.ai/try/wordpress.demo.busymate.ai`). The page belongs to the authors' own product, and the studio is a demo site, not a customer. Nothing was signed in: the recorder used a fresh, isolated browser context with no cookies, and sent Global Privacy Control and Do Not Track so the visit stayed out of the site's analytics.

| File | What it is |
|---|---|
| [`audit.mp4`](audit.mp4) | The 33-second captioned video (1280×800, 330 KB) |
| [`findings.md`](findings.md) | 4 findings, each with evidence and a "Found by" column |
| [`timeline.md`](timeline.md) | Steps table (each user step with its trace id, requests, Server-Timing), auto-signals and the fused timeline |
| [`scenario.json`](scenario.json) | The exact script; re-run it to check a fix |
| [`explore-timeline.md`](explore-timeline.md) | The first, uncaptioned exploratory pass the findings came from |
| [`contact-sheet.jpg`](contact-sheet.jpg) | 9 frames from the video, for a quick look |
| `events.json`, `signals.json`, `meta.json` | Raw events on the video clock, signals, recording start time and the per-step trace ids |

Frames (`frames/`) and keyframes (`ai-pack/*.jpg`) were left out to keep the folder small; `record.mjs` + `timeline.mjs` recreate them.

## How it was run

1. **Exploratory pass, unattended (34 s).** A short script: open the page, read it, type one question, send it, wait, scroll. No problem captions, since nothing was known yet.
2. **Review afterwards (about 10 minutes of agent time).** Read `timeline.md` (signals and the steps table), checked suspicious signals against `events.json`, and looked at keyframes and a contact sheet, zooming into the frames around each event. This is where EX-01 and EX-04 were seen: neither leaves any trace in the console or network.
3. **Captioned pass (35 s, including encoding).** The same script plus three `problem` steps, so each issue is captioned in the video with a screenshot. This scenario is now the regression test for the fixes.

```bash
node scripts/record.mjs scenario.json --port 9234 --out ./out --correlate https://busymate.ai
bash scripts/encode.sh ./out && node scripts/timeline.mjs ./out && node scripts/report.mjs ./out --title "Try page (public demo)"
```

## What it found, and what was noise

The captioned run raised **18 auto-signals**. Each one was checked by hand:

| Signals | Verdict |
|---|---|
| 8 × duplicate-request (`suggest` ×4, `scan` ×3, `deep/watch` stream ×1) | **Real**, one cause: EX-02 |
| http-4xx + console-error on `bot-challenge` | **Real**, minor: EX-03 |
| console-warning "Multiple GoTrueClient instances" | Real but minor; not captioned |
| 3 × never-finished (2 analytics POSTs, `bot-challenge`) | **Noise**, most likely: the server answered (200/404), but the browser never reported the end of the body. Typical of keepalive or beacon-style requests; not proven either way |
| 1 × duplicate POST to the analytics endpoint | **Noise**: two different events sent to the same URL |
| 3 × layout-shift while the answer streams | **Noise**: the chat grows as text arrives, by design |

So **11 of 18 signals (61%) were real**, and they collapsed into **3 issues**. The other 7 were noise a person dismisses in a minute. One more finding (**EX-04**, Markdown flicker while streaming) appeared **only in the frames**, and so did **EX-01** (the brand flash, about 0.5 s).

The same page, before today's tool fixes, produced **42 signals in the exploratory pass**. Half of them were false: 19 memory-cache hits counted as duplicate requests, plus 2 open event streams counted as "never finished". `record.mjs` now records `Network.requestServedFromCache`, and `timeline.mjs` skips cached responses and streams. That cut the exploratory pass to 21 signals.

## Backend correlation in this run

The page belongs to someone else's backend from the reader's point of view, so no server logs are included. Everything below came from the browser:

- every same-origin request carried a per-step `traceparent` header (see the Trace id column in `timeline.md`), ready for a server that logs it;
- the server's own `Server-Timing` header was captured on every response (here only a middleware time, `mw;dur≈0.3–12 ms`);
- `meta.json` holds the recording's start time (`t0Iso`), so any server log line can be put on the video clock with `scripts/correlate.mjs`.

## Honest notes

- The answers from the AI differ between runs: pass 1 said "I don't have a list of kitchen-specific work", pass 2 said "Yes, we do kitchen renovations". The `problem` steps were written for what happens every time (EX-01 to EX-03); EX-04 depends on the answer containing bold text.
- First visit vs. repeat visit: in the exploratory pass the suggested questions took about 7 s to appear (`suggest` responses of 3.2–11.7 s); in the captioned pass, minutes later, they took under 0.4 s. Server-side caching is the likely reason; the timeline alone cannot prove it.
- Captions sit at the bottom centre and can cover the thing they point at (see EX-02's screenshot).
