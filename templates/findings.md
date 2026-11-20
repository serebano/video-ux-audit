# Demo inbox: video UX audit, findings

Video: `audit.mp4` (timestamps are caption times). Total: 1, P0 0, P1 1, P2 0.

| ID | Sev | Finding | Steps | Expected | Actual | Video | Screenshot | Suspected area | UX suggestion | Performance suggestion |
|---|---|---|---|---|---|---|---|---|---|---|
| DEMO-01 | P1 | Search ignores message text: 'order' finds nothing | Type 'order' in Search | Alex's conversation (its message mentions an order) | Empty list; search matches names only | 00:06 | shots/DEMO-01.png | list search filter | Search names AND message text; show 'No results for X' with a clear button | Search server-side with a text index; debounce 150 ms |

## Timings

| Step | Wall ms | TTFB | DCL | Load | LCP |
|---|---|---|---|---|---|
| open file://examples/demo.html | 1512 | 0 | 9 | 13 |  |
| click #search | 158 |  |  |  |  |
| click li | 154 |  |  |  |  |

## Next

- Fix P0 first, then P1. One small change per finding, each proven with a fresh recording of the same steps.
