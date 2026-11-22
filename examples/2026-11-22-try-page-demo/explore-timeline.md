# Timeline: video frames + actions + console + network + performance

Duration 00:33.779 · 960 frames · 12 actions · 165 requests (1247 KB) · 21 auto-signals · 0 captioned findings

## Steps (browser + server cost of each user step)

Recording started 2026-11-22T19:53:58.758Z (video 00:00.000). Server time of any line = t0 + video time.

| # | Video | Step | Requests | KB | Slowest ms | Server-Timing max ms | Errors | Server lines | Trace id |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 00:00.022 | {"goto":"https://busymate.ai/try/wordpress.demo.busymate.ai","settle": | 140 | 1136 | 11669 | 5 | 3 | 0 | `27552b03…` |
| 2 | 00:04.256 | {"say":"I run a small studio. I want to see what this mate would tell  | 2 | 1 | 53 | 0 | 0 | 0 | `5cf70673…` |
| 3 | 00:06.758 | {"wait":2500} | 7 | 15 | 57 | 1 | 0 | 0 | `7873e7a8…` |
| 4 | 00:09.262 | {"clickAt":[376,547]} | 10 | 84 | 63 |  | 0 | 0 | `5a0e7900…` |
| 5 | 00:10.031 | {"keys":"Do you do kitchen renovations, and what does a first consult  | 0 | 0 |  |  | 0 | 0 | `5ee49cdd…` |
| 6 | 00:17.645 | {"press":"Enter"} | 2 | 8 | 2070 | 159 | 1 | 0 | `01076bac…` |
| 7 | 00:17.681 | {"say":"Waiting for the answer","ms":2000} | 2 | 2 | 70 | 0 | 0 | 0 | `effdac2a…` |
| 8 | 00:19.700 | {"wait":9000} | 2 | 1 | 65 | 0 | 0 | 0 | `9b5d0a6d…` |
| 9 | 00:28.702 | {"scroll":500} | 0 | 0 |  |  | 0 | 0 | `3104269d…` |
| 10 | 00:29.407 | {"wait":2500} | 0 | 0 |  |  | 0 | 0 | `e5edd1a2…` |
| 11 | 00:31.910 | {"scroll":-500} | 0 | 0 |  |  | 0 | 0 | `f5f24b00…` |
| 12 | 00:32.613 | {"wait":1500} | 0 | 0 |  |  | 0 | 0 | `80666003…` |

## Auto-detected signals (verify each against its frame)

| Time | Sev | Kind | Detail | Frame |
|---|---|---|---|---|
| 00:00.686 | P2 | never-finished | POST /api/try-events | frames/f000005.jpg |
| 00:00.687 | P1 | slow-request | 3198 ms GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en | frames/f000005.jpg |
| 00:00.793 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000008.jpg |
| 00:00.848 | P1 | slow-request | 5872 ms GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en | frames/f000008.jpg |
| 00:00.848 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000008.jpg |
| 00:00.849 | P2 | duplicate-request | same GET /api/quickstart/deep/watch?host=wordpress.demo.busymate.ai twice within 2 s | frames/f000008.jpg |
| 00:00.901 | P1 | slow-request | 8653 ms GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en | frames/f000010.jpg |
| 00:00.901 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000010.jpg |
| 00:00.901 | P1 | slow-request | 11669 ms GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en | frames/f000010.jpg |
| 00:00.901 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000010.jpg |
| 00:01.150 | P2 | http-4xx | 404 GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo | frames/f000010.jpg |
| 00:01.150 | P2 | never-finished | GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo | frames/f000010.jpg |
| 00:01.178 | P2 | console-warning | GoTrueClient@sb-api-auth-token:1 (2.110.8) 2026-11-22T19:53:59.934Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produ | frames/f000012.jpg |
| 00:01.195 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000014.jpg |
| 00:01.200 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000014.jpg |
| 00:01.204 | P2 | console-error | Failed to load resource: the server responded with a status of 404 () | frames/f000015.jpg |
| 00:01.238 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000018.jpg |
| 00:06.721 | P2 | never-finished | POST /api/try-events | frames/f000556.jpg |
| 00:17.695 | P2 | layout-shift | content jumped (CLS 0.2735) | frames/f000673.jpg |
| 00:19.797 | P2 | never-finished | POST /api/try-events | frames/f000877.jpg |
| 00:19.827 | P2 | layout-shift | content jumped (CLS 0.1545) | frames/f000880.jpg |

## Full timeline (noise filtered: only failed, slow or ≥400 requests)

| Time | Event | Frame |
|---|---|---|
| 00:00.023 | ACTION {"goto":"https://busymate.ai/try/wordpress.demo.busymate.ai","settle":4000} | frames/f000000.jpg |
| 00:00.687 | net 200 3198ms (server 0ms) GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en trace 27552b03… | frames/f000005.jpg |
| 00:00.688 | perf:layout-shift 0.0003 | frames/f000005.jpg |
| 00:00.771 | perf:layout-shift 0.0002 | frames/f000007.jpg |
| 00:00.793 | net net::ERR_ABORTED 56ms GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en trace 27552b03… | frames/f000008.jpg |
| 00:00.848 | net 200 5872ms (server 0ms) GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en trace 27552b03… | frames/f000008.jpg |
| 00:00.849 | net 200 5872ms (server 0ms) GET /api/quickstart/deep/watch?host=wordpress.demo.busymate.ai trace 27552b03… | frames/f000008.jpg |
| 00:00.901 | net 200 8653ms (server 0ms) GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en trace 27552b03… | frames/f000010.jpg |
| 00:00.901 | net 200 11669ms (server 0ms) GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en trace 27552b03… | frames/f000010.jpg |
| 00:01.150 | net 404 ?ms (server 0ms) GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo trace 27552b03… | frames/f000010.jpg |
| 00:01.178 | console:warning GoTrueClient@sb-api-auth-token:1 (2.110.8) 2026-11-22T19:53:59.934Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, bu | frames/f000012.jpg |
| 00:01.204 | log:error Failed to load resource: the server responded with a status of 404 () | frames/f000015.jpg |
| 00:04.255 | log:warning Deprecated API for given entry type. | frames/f000316.jpg |
| 00:04.256 | ACTION {"say":"I run a small studio. I want to see what this mate would tell my customers.","ms":2500} | frames/f000316.jpg |
| 00:04.256 | CAPTION[note] I run a small studio. I want to see what this mate would tell my customers. | frames/f000316.jpg |
| 00:06.758 | ACTION {"wait":2500} | frames/f000558.jpg |
| 00:06.789 | perf:layout-shift 0.039 | frames/f000558.jpg |
| 00:09.262 | ACTION {"clickAt":[376,547]} | frames/f000563.jpg |
| 00:09.303 | perf:layout-shift 0 | frames/f000564.jpg |
| 00:09.315 | perf:layout-shift 0 | frames/f000565.jpg |
| 00:09.326 | perf:layout-shift 0 | frames/f000566.jpg |
| 00:09.333 | perf:layout-shift 0 | frames/f000567.jpg |
| 00:09.344 | perf:layout-shift 0 | frames/f000568.jpg |
| 00:09.352 | perf:layout-shift 0 | frames/f000569.jpg |
| 00:09.361 | perf:layout-shift 0 | frames/f000570.jpg |
| 00:09.370 | perf:layout-shift 0 | frames/f000571.jpg |
| 00:09.381 | perf:layout-shift 0 | frames/f000572.jpg |
| 00:09.391 | perf:layout-shift 0 | frames/f000573.jpg |
| 00:09.401 | perf:layout-shift 0 | frames/f000574.jpg |
| 00:09.410 | perf:layout-shift 0 | frames/f000575.jpg |
| 00:09.420 | perf:layout-shift 0 | frames/f000576.jpg |
| 00:09.431 | perf:layout-shift 0 | frames/f000577.jpg |
| 00:09.441 | perf:layout-shift 0 | frames/f000578.jpg |
| 00:09.450 | perf:layout-shift 0 | frames/f000579.jpg |
| 00:09.460 | perf:layout-shift 0 | frames/f000580.jpg |
| 00:09.470 | perf:layout-shift 0 | frames/f000581.jpg |
| 00:09.480 | perf:layout-shift 0 | frames/f000582.jpg |
| 00:09.490 | perf:layout-shift 0 | frames/f000583.jpg |
| 00:09.503 | perf:layout-shift 0 | frames/f000584.jpg |
| 00:09.513 | perf:layout-shift 0 | frames/f000585.jpg |
| 00:09.519 | perf:layout-shift 0 | frames/f000586.jpg |
| 00:09.530 | perf:layout-shift 0 | frames/f000587.jpg |
| 00:09.541 | perf:layout-shift 0 | frames/f000588.jpg |
| 00:09.550 | perf:layout-shift 0 | frames/f000589.jpg |
| 00:09.560 | perf:layout-shift 0 | frames/f000590.jpg |
| 00:09.571 | perf:layout-shift 0 | frames/f000591.jpg |
| 00:09.580 | perf:layout-shift 0 | frames/f000592.jpg |
| 00:09.590 | perf:layout-shift 0 | frames/f000593.jpg |
| 00:09.600 | perf:layout-shift 0 | frames/f000594.jpg |
| 00:09.610 | perf:layout-shift 0 | frames/f000595.jpg |
| 00:09.620 | perf:layout-shift 0 | frames/f000596.jpg |
| 00:09.630 | perf:layout-shift 0 | frames/f000597.jpg |
| 00:09.640 | perf:layout-shift 0 | frames/f000598.jpg |
| 00:10.031 | ACTION {"keys":"Do you do kitchen renovations, and what does a first consult cost?"} | frames/f000605.jpg |
| 00:10.043 | perf:layout-shift 0.039 | frames/f000605.jpg |
| 00:17.645 | ACTION {"press":"Enter"} | frames/f000672.jpg |
| 00:17.681 | ACTION {"say":"Waiting for the answer","ms":2000} | frames/f000672.jpg |
| 00:17.681 | CAPTION[note] Waiting for the answer | frames/f000672.jpg |
| 00:17.681 | net 200 2070ms (server 159ms) POST /api/agent/eve/v1/session?turnStream=0 trace 01076bac… | frames/f000672.jpg |
| 00:17.695 | perf:layout-shift 0.2735 | frames/f000673.jpg |
| 00:19.036 | perf:layout-shift 0.0024 | frames/f000801.jpg |
| 00:19.045 | perf:layout-shift 0.0019 | frames/f000802.jpg |
| 00:19.055 | perf:layout-shift 0.0016 | frames/f000803.jpg |
| 00:19.068 | perf:layout-shift 0.0021 | frames/f000804.jpg |
| 00:19.075 | perf:layout-shift 0.0018 | frames/f000805.jpg |
| 00:19.085 | perf:layout-shift 0.0024 | frames/f000806.jpg |
| 00:19.095 | perf:layout-shift 0.0017 | frames/f000807.jpg |
| 00:19.105 | perf:layout-shift 0.0019 | frames/f000808.jpg |
| 00:19.115 | perf:layout-shift 0.0023 | frames/f000809.jpg |
| 00:19.125 | perf:layout-shift 0.0018 | frames/f000810.jpg |
| 00:19.135 | perf:layout-shift 0.0018 | frames/f000811.jpg |
| 00:19.145 | perf:layout-shift 0.0017 | frames/f000812.jpg |
| 00:19.155 | perf:layout-shift 0.0439 | frames/f000813.jpg |
| 00:19.166 | perf:layout-shift 0.0019 | frames/f000814.jpg |
| 00:19.175 | perf:layout-shift 0.002 | frames/f000815.jpg |
| 00:19.185 | perf:layout-shift 0.0022 | frames/f000816.jpg |
| 00:19.196 | perf:layout-shift 0.0019 | frames/f000817.jpg |
| 00:19.206 | perf:layout-shift 0.0022 | frames/f000818.jpg |
| 00:19.216 | perf:layout-shift 0.002 | frames/f000819.jpg |
| 00:19.226 | perf:layout-shift 0.0019 | frames/f000820.jpg |
| 00:19.236 | perf:layout-shift 0.0018 | frames/f000821.jpg |
| 00:19.246 | perf:layout-shift 0.002 | frames/f000822.jpg |
| 00:19.256 | perf:layout-shift 0.0021 | frames/f000823.jpg |
| 00:19.266 | perf:layout-shift 0.0018 | frames/f000824.jpg |
| 00:19.276 | perf:layout-shift 0.0463 | frames/f000825.jpg |
| 00:19.289 | perf:layout-shift 0.0027 | frames/f000826.jpg |
| 00:19.296 | perf:layout-shift 0.0018 | frames/f000827.jpg |
| 00:19.308 | perf:layout-shift 0.002 | frames/f000828.jpg |
| 00:19.316 | perf:layout-shift 0.0019 | frames/f000829.jpg |
| 00:19.326 | perf:layout-shift 0.0018 | frames/f000830.jpg |
| 00:19.336 | perf:layout-shift 0.0022 | frames/f000831.jpg |
| 00:19.346 | perf:layout-shift 0.0024 | frames/f000832.jpg |
| 00:19.356 | perf:layout-shift 0.0013 | frames/f000833.jpg |
| 00:19.366 | perf:layout-shift 0.0022 | frames/f000834.jpg |
| 00:19.376 | perf:layout-shift 0.0021 | frames/f000835.jpg |
| 00:19.386 | perf:layout-shift 0.0017 | frames/f000836.jpg |
| 00:19.406 | perf:layout-shift 0.0018 | frames/f000838.jpg |
| 00:19.416 | perf:layout-shift 0.0014 | frames/f000839.jpg |
| 00:19.426 | perf:layout-shift 0.0015 | frames/f000840.jpg |
| 00:19.436 | perf:layout-shift 0.0017 | frames/f000841.jpg |
| 00:19.446 | perf:layout-shift 0.0026 | frames/f000842.jpg |
| 00:19.456 | perf:layout-shift 0.0019 | frames/f000843.jpg |
| 00:19.486 | perf:layout-shift 0.0021 | frames/f000846.jpg |
| 00:19.497 | perf:layout-shift 0.0023 | frames/f000847.jpg |
| 00:19.517 | perf:layout-shift 0.0022 | frames/f000849.jpg |
| 00:19.526 | perf:layout-shift 0.002 | frames/f000850.jpg |
| 00:19.537 | perf:layout-shift 0.0018 | frames/f000851.jpg |
| 00:19.546 | perf:layout-shift 0.0016 | frames/f000852.jpg |
| 00:19.556 | perf:layout-shift 0.0021 | frames/f000853.jpg |
| 00:19.576 | perf:layout-shift 0.0023 | frames/f000855.jpg |
| 00:19.586 | perf:layout-shift 0.0013 | frames/f000856.jpg |
| 00:19.596 | perf:layout-shift 0.0023 | frames/f000857.jpg |
| 00:19.607 | perf:layout-shift 0.0017 | frames/f000858.jpg |
| 00:19.619 | perf:layout-shift 0.0015 | frames/f000859.jpg |
| 00:19.627 | perf:layout-shift 0.0018 | frames/f000860.jpg |
| 00:19.636 | perf:layout-shift 0.0012 | frames/f000861.jpg |
| 00:19.647 | perf:layout-shift 0.0014 | frames/f000862.jpg |
| 00:19.656 | perf:layout-shift 0.0013 | frames/f000863.jpg |
| 00:19.666 | perf:layout-shift 0.0014 | frames/f000864.jpg |
| 00:19.676 | perf:layout-shift 0.0021 | frames/f000865.jpg |
| 00:19.687 | perf:layout-shift 0.0024 | frames/f000866.jpg |
| 00:19.697 | perf:layout-shift 0.0025 | frames/f000867.jpg |
| 00:19.700 | ACTION {"wait":9000} | frames/f000867.jpg |
| 00:19.707 | perf:layout-shift 0.0023 | frames/f000868.jpg |
| 00:19.717 | perf:layout-shift 0.0081 | frames/f000869.jpg |
| 00:19.726 | perf:layout-shift 0.002 | frames/f000870.jpg |
| 00:19.737 | perf:layout-shift 0.009 | frames/f000871.jpg |
| 00:19.753 | perf:layout-shift 0.0016 | frames/f000872.jpg |
| 00:19.756 | perf:layout-shift 0.0029 | frames/f000872.jpg |
| 00:19.767 | perf:layout-shift 0.0004 | frames/f000874.jpg |
| 00:19.777 | perf:layout-shift 0.0017 | frames/f000875.jpg |
| 00:19.787 | perf:layout-shift 0.0014 | frames/f000876.jpg |
| 00:19.797 | perf:layout-shift 0.0015 | frames/f000877.jpg |
| 00:19.807 | perf:layout-shift 0.0056 | frames/f000878.jpg |
| 00:19.818 | perf:layout-shift 0.0013 | frames/f000879.jpg |
| 00:19.827 | perf:layout-shift 0.1545 | frames/f000880.jpg |
| 00:19.838 | perf:layout-shift 0.0013 | frames/f000881.jpg |
| 00:19.846 | perf:layout-shift 0.0009 | frames/f000882.jpg |
| 00:19.857 | perf:layout-shift 0.0011 | frames/f000883.jpg |
| 00:19.867 | perf:layout-shift 0.0013 | frames/f000884.jpg |
| 00:19.877 | perf:layout-shift 0.0009 | frames/f000885.jpg |
| 00:19.887 | perf:layout-shift 0.0009 | frames/f000886.jpg |
| 00:19.897 | perf:layout-shift 0.0012 | frames/f000887.jpg |
| 00:19.907 | perf:layout-shift 0.0007 | frames/f000888.jpg |
| 00:19.917 | perf:layout-shift 0.001 | frames/f000889.jpg |
| 00:19.927 | perf:layout-shift 0.001 | frames/f000890.jpg |
| 00:19.937 | perf:layout-shift 0.0009 | frames/f000891.jpg |
| 00:19.947 | perf:layout-shift 0.0009 | frames/f000892.jpg |
| 00:19.957 | perf:layout-shift 0.0007 | frames/f000893.jpg |
| 00:19.967 | perf:layout-shift 0.0012 | frames/f000894.jpg |
| 00:19.977 | perf:layout-shift 0.0005 | frames/f000895.jpg |
| 00:19.987 | perf:layout-shift 0.001 | frames/f000896.jpg |
| 00:19.997 | perf:layout-shift 0.0008 | frames/f000897.jpg |
| 00:20.007 | perf:layout-shift 0.0009 | frames/f000898.jpg |
| 00:20.017 | perf:layout-shift 0.0004 | frames/f000899.jpg |
| 00:20.027 | perf:layout-shift 0.0004 | frames/f000900.jpg |
| 00:20.037 | perf:layout-shift 0.0095 | frames/f000901.jpg |
| 00:20.047 | perf:layout-shift 0.0006 | frames/f000902.jpg |
| 00:20.057 | perf:layout-shift 0.0006 | frames/f000903.jpg |
| 00:20.067 | perf:layout-shift 0.0002 | frames/f000904.jpg |
| 00:20.078 | perf:layout-shift 0.0048 | frames/f000905.jpg |
| 00:20.087 | perf:layout-shift 0.0007 | frames/f000906.jpg |
| 00:20.097 | perf:layout-shift 0.0005 | frames/f000907.jpg |
| 00:20.107 | perf:layout-shift 0.0008 | frames/f000908.jpg |
| 00:20.117 | perf:layout-shift 0.0003 | frames/f000909.jpg |
| 00:20.127 | perf:layout-shift 0.0005 | frames/f000910.jpg |
| 00:20.137 | perf:layout-shift 0.0005 | frames/f000911.jpg |
| 00:20.147 | perf:layout-shift 0.0005 | frames/f000912.jpg |
| 00:20.157 | perf:layout-shift 0.001 | frames/f000913.jpg |
| 00:20.167 | perf:layout-shift 0.0005 | frames/f000914.jpg |
| 00:20.177 | perf:layout-shift 0.0007 | frames/f000915.jpg |
| 00:20.187 | perf:layout-shift 0.0005 | frames/f000916.jpg |
| 00:20.197 | perf:layout-shift 0.0006 | frames/f000917.jpg |
| 00:20.207 | perf:layout-shift 0.0005 | frames/f000918.jpg |
| 00:20.217 | perf:layout-shift 0.0008 | frames/f000919.jpg |
| 00:20.227 | perf:layout-shift 0.0005 | frames/f000920.jpg |
| 00:20.237 | perf:layout-shift 0.0007 | frames/f000921.jpg |
| 00:20.247 | perf:layout-shift 0.0006 | frames/f000922.jpg |
| 00:20.257 | perf:layout-shift 0.0008 | frames/f000923.jpg |
| 00:20.270 | perf:layout-shift 0.0005 | frames/f000924.jpg |
| 00:20.277 | perf:layout-shift 0.0004 | frames/f000925.jpg |
| 00:28.702 | ACTION {"scroll":500} | frames/f000943.jpg |
| 00:29.407 | ACTION {"wait":2500} | frames/f000947.jpg |
| 00:31.910 | ACTION {"scroll":-500} | frames/f000952.jpg |
| 00:32.613 | ACTION {"wait":1500} | frames/f000956.jpg |
