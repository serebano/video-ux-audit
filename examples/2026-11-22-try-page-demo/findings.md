# Try page (public demo): video UX audit, findings

Video: `audit.mp4` (timestamps are caption times). Total: 4, P0 0, P1 0, P2 4.

| ID | Sev | Finding | Steps | Expected | Actual | Video | Screenshot | Suspected area | UX suggestion | Performance suggestion | Found by |
|---|---|---|---|---|---|---|---|---|---|---|---|
| EX-01 | P2 | On load the chat first said 'Hi, I'm your mate' with the Busymate logo, then switched to the studio | Open the try page in a fresh browser | The studio's name and logo from the first frame (or a neutral skeleton) | A generic mate greeting and logo for about 0.5 s (frames 00:00.46–00:01.11), then the studio's | 00:06 | shots/EX-01-at-00-00-965.png (the generic state) · shots/EX-01.png (caption time) | chat iframe first render before the workspace branding arrives | Render a skeleton until branding is known, or pass the branding in the iframe URL | Inline the branding in the iframe's HTML so no second render is needed | post-hoc frame review of the exploratory pass, then captioned in this pass |
| EX-02 | P2 | Behind the scenes the page fetched the same suggestions 4 times and the same scan 4 times | Open the try page; watch the network lane | One request per resource | 4 identical GET /api/quickstart/suggest (one aborted), 4 identical GET /api/quickstart/scan in 0.45 s, 2 event streams to /api/quickstart/deep/watch (one aborted) | 00:10 | shots/EX-02.png | try page data hooks (effect runs twice / several components fetch the same thing) | None visible directly; on first visit the suggested questions took about 7 s to appear | Share one request per resource (a cache or request dedupe), open one stream | auto-signal duplicate-request, checked in events.json, then captioned |
| EX-03 | P2 | Every visit logs a red 404 in the console: the bot check answers 404 when there is nothing to check | Open the try page with DevTools console open | A 200/204 'no challenge' answer, a clean console | GET /api/quickstart/bot-challenge → 404 and 'Failed to load resource' in the console | 00:29 | shots/EX-03.png | quickstart bot-challenge endpoint | None for visitors; it hides real errors from developers and monitoring | Return 204 or skip the call when no challenge is configured | auto-signals http-4xx + console-error, then captioned |
| EX-04 | P2 | While the answer streams, raw Markdown shows for a moment: '*Design Package' in italics with a stray asterisk before the bold renders | Ask a question whose answer has a bold list item; watch the stream | Bold text appears bold, or plain, never with stray markup | At 00:24.019 the list item reads '*Design Package' (italic, leading asterisk); 30 ms later it is bold | 00:24 | shots/EX-04.png | chat streaming Markdown renderer (partial '**' token) | Hold back an unclosed '*'/'**' until the closing marker arrives | None | post-hoc frame review (not seen during the pass) |

## Timings

| Step | Wall ms | TTFB | DCL | Load | LCP |
|---|---|---|---|---|---|
| open https://busymate.ai/try/wordpress.demo.busymate.ai | 3741 | 234 | 574 | 788 |  |

## Next

- Fix P0 first, then P1. One small change per finding, each proven with a fresh recording of the same steps.
