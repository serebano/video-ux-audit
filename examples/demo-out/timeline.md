# Timeline: video frames + actions + console + network + performance

Duration 00:17.109 · 75 frames · 9 actions · 3 requests (1 KB) · 7 auto-signals · 1 captioned findings

## Auto-detected signals (verify each against its frame)

| Time | Sev | Kind | Detail | Frame |
|---|---|---|---|---|
| 00:04.399 | P1 | js-exception | ReferenceError: undefinedFn is not defined | frames/f000027.jpg |
| 00:04.399 | P1 | request-failed | GET file:///missing-api.json · net::ERR_FAILED | frames/f000027.jpg |
| 00:04.399 | P1 | http-5xx | 500 GET /status/500 | frames/f000027.jpg |
| 00:04.401 | P2 | console-error | Access to fetch at 'file:///missing-api.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: chrome, chrome-experimental-site-token- | frames/f000027.jpg |
| 00:04.402 | P2 | console-error | Failed to load resource: net::ERR_FAILED | frames/f000027.jpg |
| 00:04.402 | P2 | console-error | Failed to load resource: the server responded with a status of 500 () | frames/f000027.jpg |
| 00:04.402 | P2 | long-task | main thread blocked 452 ms (UI frozen) | frames/f000027.jpg |

## Full timeline (noise filtered: only failed, slow or ≥400 requests)

| Time | Event | Frame |
|---|---|---|
| 00:00.005 | ACTION {"goto":"file://examples/demo.html","settle":1500} | frames/f000000.jpg |
| 00:01.515 | log:warning Deprecated API for given entry type. | frames/f000001.jpg |
| 00:01.516 | ACTION {"say":"First, Sam's refund chat.","ms":1800} | frames/f000001.jpg |
| 00:01.516 | CAPTION[note] First, Sam's refund chat. | frames/f000001.jpg |
| 00:03.326 | ACTION {"click":"li:nth-child(2)"} | frames/f000002.jpg |
| 00:03.406 | perf:layout-shift 0 | frames/f000003.jpg |
| 00:03.423 | perf:layout-shift 0 | frames/f000005.jpg |
| 00:03.440 | perf:layout-shift 0 | frames/f000006.jpg |
| 00:03.455 | perf:layout-shift 0 | frames/f000007.jpg |
| 00:03.474 | perf:layout-shift 0 | frames/f000008.jpg |
| 00:03.490 | perf:layout-shift 0 | frames/f000009.jpg |
| 00:03.506 | perf:layout-shift 0 | frames/f000010.jpg |
| 00:03.524 | perf:layout-shift 0 | frames/f000011.jpg |
| 00:03.540 | perf:layout-shift 0 | frames/f000012.jpg |
| 00:03.556 | perf:layout-shift 0 | frames/f000013.jpg |
| 00:03.574 | perf:layout-shift 0 | frames/f000014.jpg |
| 00:03.590 | perf:layout-shift 0 | frames/f000015.jpg |
| 00:03.605 | perf:layout-shift 0 | frames/f000016.jpg |
| 00:03.623 | perf:layout-shift 0 | frames/f000017.jpg |
| 00:03.640 | perf:layout-shift 0 | frames/f000018.jpg |
| 00:03.656 | perf:layout-shift 0 | frames/f000019.jpg |
| 00:03.690 | perf:layout-shift 0 | frames/f000021.jpg |
| 00:04.399 | exception ReferenceError: undefinedFn is not defined | frames/f000027.jpg |
| 00:04.399 | net net::ERR_FAILED 3ms GET file:///missing-api.json | frames/f000027.jpg |
| 00:04.399 | net 500 3ms GET /status/500 | frames/f000027.jpg |
| 00:04.401 | log:error Access to fetch at 'file:///missing-api.json' from origin 'null' has been blocked by CORS policy: Cross origin requests are only supported for protocol schemes: | frames/f000027.jpg |
| 00:04.402 | log:error Failed to load resource: net::ERR_FAILED | frames/f000027.jpg |
| 00:04.402 | log:error Failed to load resource: the server responded with a status of 500 () | frames/f000027.jpg |
| 00:04.402 | perf:longtask 452 | frames/f000027.jpg |
| 00:04.551 | ACTION {"wait":1500} | frames/f000028.jpg |
| 00:06.053 | ACTION {"say":"The page froze for a moment when I opened it.","ms":2200} | frames/f000028.jpg |
| 00:06.053 | CAPTION[note] The page froze for a moment when I opened it. | frames/f000028.jpg |
| 00:08.260 | ACTION {"say":"I'm a support person. I want to find the customer who asked about an order.","ms":3000} | frames/f000029.jpg |
| 00:08.260 | CAPTION[note] I'm a support person. I want to find the customer who asked about an order. | frames/f000029.jpg |
| 00:11.268 | ACTION {"type":{"selector":"#search","text":"order"}} | frames/f000031.jpg |
| 00:11.292 | perf:layout-shift 0 | frames/f000033.jpg |
| 00:11.307 | perf:layout-shift 0 | frames/f000034.jpg |
| 00:11.324 | perf:layout-shift 0 | frames/f000035.jpg |
| 00:11.340 | perf:layout-shift 0 | frames/f000036.jpg |
| 00:11.357 | perf:layout-shift 0 | frames/f000037.jpg |
| 00:11.373 | perf:layout-shift 0 | frames/f000038.jpg |
| 00:11.390 | perf:layout-shift 0 | frames/f000039.jpg |
| 00:11.406 | perf:layout-shift 0 | frames/f000040.jpg |
| 00:11.423 | perf:layout-shift 0 | frames/f000041.jpg |
| 00:11.440 | perf:layout-shift 0 | frames/f000042.jpg |
| 00:11.457 | perf:layout-shift 0 | frames/f000043.jpg |
| 00:11.473 | perf:layout-shift 0 | frames/f000044.jpg |
| 00:11.490 | perf:layout-shift 0 | frames/f000045.jpg |
| 00:11.507 | perf:layout-shift 0 | frames/f000046.jpg |
| 00:11.523 | perf:layout-shift 0 | frames/f000047.jpg |
| 00:11.557 | perf:layout-shift 0 | frames/f000049.jpg |
| 00:12.776 | ACTION {"wait":800} | frames/f000063.jpg |
| 00:13.578 | ACTION {"problem":{"id":"DEMO-01","severity":"P1","title":"Search ignores message text: 'order' finds nothing","steps":"Type 'order' in Search","expected":"Alex's conversation (its message mentions an order) | frames/f000064.jpg |
| 00:13.578 | CAPTION[problem] P1 · Search ignores message text: 'order' finds nothing | frames/f000064.jpg |
