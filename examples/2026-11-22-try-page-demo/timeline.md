# Timeline: video frames + actions + console + network + performance

Duration 00:33.394 · 600 frames · 11 actions · 166 requests (1250 KB) · 18 auto-signals · 3 captioned findings

## Steps (browser + server cost of each user step)

Recording started 2026-11-22T19:58:10.703Z (video 00:00.000). Server time of any line = t0 + video time.

| # | Video | Step | Requests | KB | Slowest ms | Server-Timing max ms | Errors | Server lines | Trace id |
|---|---|---|---|---|---|---|---|---|---|
| 1 | 00:00.023 | {"goto":"https://busymate.ai/try/wordpress.demo.busymate.ai","settle": | 142 | 1139 | 375 | 11 | 2 | 0 | `35e78e17…` |
| 2 | 00:03.764 | {"say":"I run a small studio. I want to see what this mate would tell  | 0 | 0 |  |  | 0 | 0 | `f791baf3…` |
| 3 | 00:06.769 | {"problem":{"id":"EX-01","severity":"P2","title":"On load the chat fir | 7 | 15 | 93 | 0 | 0 | 0 | `6e25be86…` |
| 4 | 00:10.323 | {"problem":{"id":"EX-02","severity":"P2","title":"Behind the scenes th | 0 | 0 |  |  | 0 | 0 | `4efd7285…` |
| 5 | 00:13.874 | {"clickAt":[376,547]} | 10 | 84 | 63 |  | 0 | 0 | `cce38453…` |
| 6 | 00:14.651 | {"keys":"Do you do kitchen renovations? What does a consult cost?"} | 0 | 0 |  |  | 0 | 0 | `bef7d496…` |
| 7 | 00:21.087 | {"press":"Enter"} | 2 | 8 | 3760 | 375 | 1 | 0 | `0c73e0ba…` |
| 8 | 00:21.121 | {"say":"Waiting for the answer…","ms":2000} | 4 | 4 | 87 | 1 | 0 | 0 | `716f3694…` |
| 9 | 00:23.138 | {"wait":6000} | 1 | 1 | 61 | 0 | 0 | 0 | `e448f16b…` |
| 10 | 00:29.140 | {"problem":{"id":"EX-03","severity":"P2","title":"Every visit logs a r | 0 | 0 |  |  | 0 | 0 | `c0e44f69…` |
| 11 | 00:32.711 | {"wait":1000} | 0 | 0 |  |  | 0 | 0 | `23c7d9af…` |

## Auto-detected signals (verify each against its frame)

| Time | Sev | Kind | Detail | Frame |
|---|---|---|---|---|
| 00:00.722 | P2 | never-finished | POST /api/try-events | frames/f000006.jpg |
| 00:00.833 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000009.jpg |
| 00:00.887 | P2 | never-finished | POST /api/try-events | frames/f000009.jpg |
| 00:00.887 | P2 | duplicate-request | same POST /api/try-events twice within 2 s | frames/f000009.jpg |
| 00:00.891 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000009.jpg |
| 00:00.892 | P2 | duplicate-request | same GET /api/quickstart/deep/watch?host=wordpress.demo.busymate.ai twice within 2 s | frames/f000009.jpg |
| 00:00.946 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000012.jpg |
| 00:00.946 | P2 | duplicate-request | same GET /api/quickstart/suggest?id=qs_rupddqfyshz46lkp5qc4xggo&lang=en twice within 2 s | frames/f000012.jpg |
| 00:01.179 | P2 | http-4xx | 404 GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo | frames/f000013.jpg |
| 00:01.179 | P2 | never-finished | GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo | frames/f000013.jpg |
| 00:01.209 | P2 | console-warning | GoTrueClient@sb-api-auth-token:1 (2.110.8) 2026-11-22T19:58:11.910Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, but this should be avoided as it may produ | frames/f000015.jpg |
| 00:01.228 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000017.jpg |
| 00:01.229 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000017.jpg |
| 00:01.233 | P2 | console-error | Failed to load resource: the server responded with a status of 404 () | frames/f000018.jpg |
| 00:01.266 | P2 | duplicate-request | same GET /api/quickstart/scan/qs_rupddqfyshz46lkp5qc4xggo twice within 2 s | frames/f000021.jpg |
| 00:21.133 | P2 | layout-shift | content jumped (CLS 0.2396) | frames/f000165.jpg |
| 00:24.208 | P2 | layout-shift | content jumped (CLS 0.095) | frames/f000463.jpg |
| 00:24.880 | P2 | layout-shift | content jumped (CLS 0.0546) | frames/f000530.jpg |

## Full timeline (noise filtered: only failed, slow or ≥400 requests)

| Time | Event | Frame |
|---|---|---|
| 00:00.023 | ACTION {"goto":"https://busymate.ai/try/wordpress.demo.busymate.ai","settle":3500} | frames/f000000.jpg |
| 00:00.724 | perf:layout-shift 0.0003 | frames/f000006.jpg |
| 00:00.788 | perf:layout-shift 0.0002 | frames/f000007.jpg |
| 00:00.892 | net 200 59ms (server 0ms) GET /api/quickstart/deep/watch?host=wordpress.demo.busymate.ai trace 35e78e17… | frames/f000009.jpg |
| 00:01.179 | net 404 ?ms (server 0ms) GET /api/quickstart/bot-challenge?id=qs_rupddqfyshz46lkp5qc4xggo trace 35e78e17… | frames/f000013.jpg |
| 00:01.209 | console:warning GoTrueClient@sb-api-auth-token:1 (2.110.8) 2026-11-22T19:58:11.910Z Multiple GoTrueClient instances detected in the same browser context. It is not an error, bu | frames/f000015.jpg |
| 00:01.233 | log:error Failed to load resource: the server responded with a status of 404 () | frames/f000018.jpg |
| 00:01.246 | perf:layout-shift 0.039 | frames/f000019.jpg |
| 00:03.764 | log:warning Deprecated API for given entry type. | frames/f000039.jpg |
| 00:03.764 | ACTION {"say":"I run a small studio. I want to see what this mate would tell my customers.","ms":3000} | frames/f000039.jpg |
| 00:03.764 | CAPTION[note] I run a small studio. I want to see what this mate would tell my customers. | frames/f000039.jpg |
| 00:06.769 | ACTION {"problem":{"id":"EX-01","severity":"P2","title":"On load the chat first said 'Hi, I'm your mate' with the Busymate logo, then switched to the studio","steps":"Open the try page in a fresh browser","e | frames/f000046.jpg |
| 00:06.769 | CAPTION[problem] P2 · On load the chat first said 'Hi, I'm your mate' with the Busymate logo, then switched to the studio | frames/f000046.jpg |
| 00:10.323 | ACTION {"problem":{"id":"EX-02","severity":"P2","title":"Behind the scenes the page fetched the same suggestions 4 times and the same scan 4 times","steps":"Open the try page; watch the network lane","expect | frames/f000056.jpg |
| 00:10.323 | CAPTION[problem] P2 · Behind the scenes the page fetched the same suggestions 4 times and the same scan 4 times | frames/f000056.jpg |
| 00:13.874 | ACTION {"clickAt":[376,547]} | frames/f000067.jpg |
| 00:13.929 | perf:layout-shift 0 | frames/f000068.jpg |
| 00:13.934 | perf:layout-shift 0 | frames/f000068.jpg |
| 00:13.953 | perf:layout-shift 0 | frames/f000069.jpg |
| 00:13.956 | perf:layout-shift 0 | frames/f000070.jpg |
| 00:13.966 | perf:layout-shift 0 | frames/f000072.jpg |
| 00:13.976 | perf:layout-shift 0 | frames/f000073.jpg |
| 00:13.986 | perf:layout-shift 0 | frames/f000074.jpg |
| 00:13.996 | perf:layout-shift 0 | frames/f000075.jpg |
| 00:14.005 | perf:layout-shift 0 | frames/f000076.jpg |
| 00:14.015 | perf:layout-shift 0 | frames/f000077.jpg |
| 00:14.024 | perf:layout-shift 0 | frames/f000078.jpg |
| 00:14.034 | perf:layout-shift 0 | frames/f000079.jpg |
| 00:14.044 | perf:layout-shift 0 | frames/f000080.jpg |
| 00:14.057 | perf:layout-shift 0 | frames/f000081.jpg |
| 00:14.067 | perf:layout-shift 0 | frames/f000082.jpg |
| 00:14.076 | perf:layout-shift 0 | frames/f000083.jpg |
| 00:14.084 | perf:layout-shift 0 | frames/f000084.jpg |
| 00:14.094 | perf:layout-shift 0 | frames/f000085.jpg |
| 00:14.105 | perf:layout-shift 0 | frames/f000086.jpg |
| 00:14.114 | perf:layout-shift 0 | frames/f000087.jpg |
| 00:14.124 | perf:layout-shift 0 | frames/f000088.jpg |
| 00:14.134 | perf:layout-shift 0 | frames/f000089.jpg |
| 00:14.144 | perf:layout-shift 0 | frames/f000090.jpg |
| 00:14.157 | perf:layout-shift 0 | frames/f000091.jpg |
| 00:14.164 | perf:layout-shift 0 | frames/f000092.jpg |
| 00:14.173 | perf:layout-shift 0 | frames/f000093.jpg |
| 00:14.184 | perf:layout-shift 0 | frames/f000094.jpg |
| 00:14.194 | perf:layout-shift 0 | frames/f000095.jpg |
| 00:14.204 | perf:layout-shift 0 | frames/f000096.jpg |
| 00:14.214 | perf:layout-shift 0 | frames/f000097.jpg |
| 00:14.224 | perf:layout-shift 0 | frames/f000098.jpg |
| 00:14.233 | perf:layout-shift 0 | frames/f000099.jpg |
| 00:14.244 | perf:layout-shift 0 | frames/f000100.jpg |
| 00:14.254 | perf:layout-shift 0 | frames/f000101.jpg |
| 00:14.264 | perf:layout-shift 0 | frames/f000102.jpg |
| 00:14.651 | ACTION {"keys":"Do you do kitchen renovations? What does a consult cost?"} | frames/f000109.jpg |
| 00:14.665 | perf:layout-shift 0.039 | frames/f000109.jpg |
| 00:21.087 | ACTION {"press":"Enter"} | frames/f000165.jpg |
| 00:21.120 | net 200 3760ms (server 375ms) POST /api/agent/eve/v1/session?turnStream=0 trace 0c73e0ba… | frames/f000165.jpg |
| 00:21.121 | ACTION {"say":"Waiting for the answer…","ms":2000} | frames/f000165.jpg |
| 00:21.121 | CAPTION[note] Waiting for the answer… | frames/f000165.jpg |
| 00:21.133 | perf:layout-shift 0.2396 | frames/f000165.jpg |
| 00:23.138 | ACTION {"wait":6000} | frames/f000357.jpg |
| 00:23.349 | perf:layout-shift 0.0004 | frames/f000378.jpg |
| 00:23.358 | perf:layout-shift 0.0007 | frames/f000378.jpg |
| 00:23.367 | perf:layout-shift 0.0003 | frames/f000380.jpg |
| 00:23.438 | perf:layout-shift 0.0005 | frames/f000387.jpg |
| 00:23.448 | perf:layout-shift 0.0003 | frames/f000388.jpg |
| 00:23.462 | perf:layout-shift 0.0006 | frames/f000389.jpg |
| 00:23.468 | perf:layout-shift 0.0005 | frames/f000390.jpg |
| 00:23.479 | perf:layout-shift 0.001 | frames/f000391.jpg |
| 00:23.489 | perf:layout-shift 0.0004 | frames/f000392.jpg |
| 00:23.499 | perf:layout-shift 0.0007 | frames/f000393.jpg |
| 00:23.509 | perf:layout-shift 0.0007 | frames/f000394.jpg |
| 00:23.521 | perf:layout-shift 0.001 | frames/f000395.jpg |
| 00:23.530 | perf:layout-shift 0.0008 | frames/f000396.jpg |
| 00:23.539 | perf:layout-shift 0.0014 | frames/f000397.jpg |
| 00:23.549 | perf:layout-shift 0.0012 | frames/f000398.jpg |
| 00:23.561 | perf:layout-shift 0.001 | frames/f000399.jpg |
| 00:23.569 | perf:layout-shift 0.0009 | frames/f000400.jpg |
| 00:23.578 | perf:layout-shift 0.0009 | frames/f000401.jpg |
| 00:23.589 | perf:layout-shift 0.0013 | frames/f000402.jpg |
| 00:23.600 | perf:layout-shift 0.0011 | frames/f000403.jpg |
| 00:23.609 | perf:layout-shift 0.001 | frames/f000404.jpg |
| 00:23.619 | perf:layout-shift 0.0009 | frames/f000405.jpg |
| 00:23.629 | perf:layout-shift 0.0017 | frames/f000406.jpg |
| 00:23.639 | perf:layout-shift 0.0012 | frames/f000407.jpg |
| 00:23.649 | perf:layout-shift 0.001 | frames/f000408.jpg |
| 00:23.660 | perf:layout-shift 0.0014 | frames/f000409.jpg |
| 00:23.670 | perf:layout-shift 0.0439 | frames/f000410.jpg |
| 00:23.680 | perf:layout-shift 0.0003 | frames/f000411.jpg |
| 00:23.689 | perf:layout-shift 0.001 | frames/f000411.jpg |
| 00:23.698 | perf:layout-shift 0.0012 | frames/f000413.jpg |
| 00:23.709 | perf:layout-shift 0.0012 | frames/f000414.jpg |
| 00:23.719 | perf:layout-shift 0.0014 | frames/f000415.jpg |
| 00:23.729 | perf:layout-shift 0.0013 | frames/f000416.jpg |
| 00:23.739 | perf:layout-shift 0.0015 | frames/f000417.jpg |
| 00:23.749 | perf:layout-shift 0.0012 | frames/f000418.jpg |
| 00:23.759 | perf:layout-shift 0.0012 | frames/f000419.jpg |
| 00:23.769 | perf:layout-shift 0.0016 | frames/f000420.jpg |
| 00:23.778 | perf:layout-shift 0.0013 | frames/f000421.jpg |
| 00:23.789 | perf:layout-shift 0.0015 | frames/f000422.jpg |
| 00:23.799 | perf:layout-shift 0.0015 | frames/f000423.jpg |
| 00:23.809 | perf:layout-shift 0.0017 | frames/f000424.jpg |
| 00:23.819 | perf:layout-shift 0.0015 | frames/f000425.jpg |
| 00:23.828 | perf:layout-shift 0.0013 | frames/f000426.jpg |
| 00:23.839 | perf:layout-shift 0.0017 | frames/f000427.jpg |
| 00:23.852 | perf:layout-shift 0.0461 | frames/f000428.jpg |
| 00:23.859 | perf:layout-shift 0.0019 | frames/f000429.jpg |
| 00:23.869 | perf:layout-shift 0.0016 | frames/f000430.jpg |
| 00:23.879 | perf:layout-shift 0.0019 | frames/f000431.jpg |
| 00:23.889 | perf:layout-shift 0.0016 | frames/f000432.jpg |
| 00:23.900 | perf:layout-shift 0.0017 | frames/f000433.jpg |
| 00:23.912 | perf:layout-shift 0.0017 | frames/f000434.jpg |
| 00:23.920 | perf:layout-shift 0.0014 | frames/f000435.jpg |
| 00:23.932 | perf:layout-shift 0.0022 | frames/f000436.jpg |
| 00:23.950 | perf:layout-shift 0.002 | frames/f000438.jpg |
| 00:23.960 | perf:layout-shift 0.0022 | frames/f000439.jpg |
| 00:23.969 | perf:layout-shift 0.0018 | frames/f000440.jpg |
| 00:23.980 | perf:layout-shift 0.0019 | frames/f000441.jpg |
| 00:24.000 | perf:layout-shift 0.0015 | frames/f000443.jpg |
| 00:24.010 | perf:layout-shift 0.0022 | frames/f000444.jpg |
| 00:24.039 | perf:layout-shift 0.0019 | frames/f000446.jpg |
| 00:24.039 | perf:layout-shift 0.0043 | frames/f000446.jpg |
| 00:24.042 | perf:layout-shift 0.0003 | frames/f000446.jpg |
| 00:24.048 | perf:layout-shift 0.0009 | frames/f000447.jpg |
| 00:24.059 | perf:layout-shift 0.0015 | frames/f000448.jpg |
| 00:24.072 | perf:layout-shift 0.002 | frames/f000449.jpg |
| 00:24.079 | perf:layout-shift 0.0025 | frames/f000450.jpg |
| 00:24.089 | perf:layout-shift 0.0018 | frames/f000451.jpg |
| 00:24.099 | perf:layout-shift 0.0019 | frames/f000452.jpg |
| 00:24.109 | perf:layout-shift 0.0411 | frames/f000453.jpg |
| 00:24.119 | perf:layout-shift 0.0023 | frames/f000454.jpg |
| 00:24.131 | perf:layout-shift 0.0019 | frames/f000455.jpg |
| 00:24.139 | perf:layout-shift 0.003 | frames/f000456.jpg |
| 00:24.148 | perf:layout-shift 0.0019 | frames/f000457.jpg |
| 00:24.158 | perf:layout-shift 0.0019 | frames/f000458.jpg |
| 00:24.169 | perf:layout-shift 0.0018 | frames/f000459.jpg |
| 00:24.179 | perf:layout-shift 0.0027 | frames/f000460.jpg |
| 00:24.188 | perf:layout-shift 0.0017 | frames/f000461.jpg |
| 00:24.197 | perf:layout-shift 0.0026 | frames/f000462.jpg |
| 00:24.208 | perf:layout-shift 0.095 | frames/f000463.jpg |
| 00:24.219 | perf:layout-shift 0.0026 | frames/f000464.jpg |
| 00:24.231 | perf:layout-shift 0.0028 | frames/f000465.jpg |
| 00:24.239 | perf:layout-shift 0.0014 | frames/f000466.jpg |
| 00:24.249 | perf:layout-shift 0.0024 | frames/f000467.jpg |
| 00:24.259 | perf:layout-shift 0.0024 | frames/f000468.jpg |
| 00:24.268 | perf:layout-shift 0.002 | frames/f000469.jpg |
| 00:24.280 | perf:layout-shift 0.0017 | frames/f000470.jpg |
| 00:24.297 | perf:layout-shift 0.0021 | frames/f000472.jpg |
| 00:24.309 | perf:layout-shift 0.0022 | frames/f000473.jpg |
| 00:24.319 | perf:layout-shift 0.0019 | frames/f000474.jpg |
| 00:24.331 | perf:layout-shift 0.0024 | frames/f000475.jpg |
| 00:24.339 | perf:layout-shift 0.002 | frames/f000476.jpg |
| 00:24.349 | perf:layout-shift 0.003 | frames/f000477.jpg |
| 00:24.360 | perf:layout-shift 0.0018 | frames/f000478.jpg |
| 00:24.369 | perf:layout-shift 0.0025 | frames/f000479.jpg |
| 00:24.379 | perf:layout-shift 0.0022 | frames/f000480.jpg |
| 00:24.389 | perf:layout-shift 0.039 | frames/f000481.jpg |
| 00:24.398 | perf:layout-shift 0.0025 | frames/f000482.jpg |
| 00:24.408 | perf:layout-shift 0.002 | frames/f000483.jpg |
| 00:24.420 | perf:layout-shift 0.0027 | frames/f000484.jpg |
| 00:24.432 | perf:layout-shift 0.0023 | frames/f000485.jpg |
| 00:24.443 | perf:layout-shift 0.0022 | frames/f000486.jpg |
| 00:24.449 | perf:layout-shift 0.0016 | frames/f000487.jpg |
| 00:24.460 | perf:layout-shift 0.0025 | frames/f000488.jpg |
| 00:24.470 | perf:layout-shift 0.0024 | frames/f000489.jpg |
| 00:24.480 | perf:layout-shift 0.0025 | frames/f000490.jpg |
| 00:24.500 | perf:layout-shift 0.0027 | frames/f000492.jpg |
| 00:24.510 | perf:layout-shift 0.0017 | frames/f000493.jpg |
| 00:24.520 | perf:layout-shift 0.0022 | frames/f000494.jpg |
| 00:24.530 | perf:layout-shift 0.0022 | frames/f000495.jpg |
| 00:24.540 | perf:layout-shift 0.0022 | frames/f000496.jpg |
| 00:24.550 | perf:layout-shift 0.0019 | frames/f000497.jpg |
| 00:24.561 | perf:layout-shift 0.0017 | frames/f000498.jpg |
| 00:24.570 | perf:layout-shift 0.0023 | frames/f000499.jpg |
| 00:24.583 | perf:layout-shift 0.0017 | frames/f000500.jpg |
| 00:24.590 | perf:layout-shift 0.0385 | frames/f000501.jpg |
| 00:24.600 | perf:layout-shift 0.0018 | frames/f000502.jpg |
| 00:24.610 | perf:layout-shift 0.0019 | frames/f000503.jpg |
| 00:24.631 | perf:layout-shift 0.0013 | frames/f000505.jpg |
| 00:24.640 | perf:layout-shift 0.002 | frames/f000506.jpg |
| 00:24.650 | perf:layout-shift 0.0019 | frames/f000507.jpg |
| 00:24.665 | perf:layout-shift 0.002 | frames/f000508.jpg |
| 00:24.670 | perf:layout-shift 0.0019 | frames/f000509.jpg |
| 00:24.684 | perf:layout-shift 0.0018 | frames/f000510.jpg |
| 00:24.690 | perf:layout-shift 0.0018 | frames/f000511.jpg |
| 00:24.699 | perf:layout-shift 0.0018 | frames/f000512.jpg |
| 00:24.710 | perf:layout-shift 0.0017 | frames/f000513.jpg |
| 00:24.720 | perf:layout-shift 0.0022 | frames/f000514.jpg |
| 00:24.730 | perf:layout-shift 0.0023 | frames/f000515.jpg |
| 00:24.740 | perf:layout-shift 0.0391 | frames/f000516.jpg |
| 00:24.753 | perf:layout-shift 0.0019 | frames/f000517.jpg |
| 00:24.760 | perf:layout-shift 0.0025 | frames/f000518.jpg |
| 00:24.770 | perf:layout-shift 0.0017 | frames/f000519.jpg |
| 00:24.780 | perf:layout-shift 0.002 | frames/f000520.jpg |
| 00:24.791 | perf:layout-shift 0.002 | frames/f000521.jpg |
| 00:24.800 | perf:layout-shift 0.0016 | frames/f000522.jpg |
| 00:24.810 | perf:layout-shift 0.0015 | frames/f000523.jpg |
| 00:24.820 | perf:layout-shift 0.0017 | frames/f000524.jpg |
| 00:24.833 | perf:layout-shift 0.0013 | frames/f000525.jpg |
| 00:24.840 | perf:layout-shift 0.0014 | frames/f000526.jpg |
| 00:24.850 | perf:layout-shift 0.0012 | frames/f000527.jpg |
| 00:24.873 | perf:layout-shift 0.0014 | frames/f000529.jpg |
| 00:24.880 | perf:layout-shift 0.0546 | frames/f000530.jpg |
| 00:24.880 | perf:layout-shift 0.0021 | frames/f000530.jpg |
| 00:24.890 | perf:layout-shift 0.0003 | frames/f000531.jpg |
| 00:24.900 | perf:layout-shift 0.0007 | frames/f000532.jpg |
| 00:24.911 | perf:layout-shift 0.0013 | frames/f000533.jpg |
| 00:24.921 | perf:layout-shift 0.0008 | frames/f000534.jpg |
| 00:24.930 | perf:layout-shift 0.0011 | frames/f000535.jpg |
| 00:24.940 | perf:layout-shift 0.0004 | frames/f000536.jpg |
| 00:24.950 | perf:layout-shift 0.0012 | frames/f000537.jpg |
| 00:24.960 | perf:layout-shift 0.001 | frames/f000538.jpg |
| 00:24.970 | perf:layout-shift 0.0004 | frames/f000539.jpg |
| 00:24.980 | perf:layout-shift 0.001 | frames/f000540.jpg |
| 00:24.990 | perf:layout-shift 0.0013 | frames/f000541.jpg |
| 00:25.000 | perf:layout-shift 0.0007 | frames/f000542.jpg |
| 00:25.010 | perf:layout-shift 0.0003 | frames/f000543.jpg |
| 00:25.020 | perf:layout-shift 0.0007 | frames/f000544.jpg |
| 00:25.031 | perf:layout-shift 0.001 | frames/f000545.jpg |
| 00:25.041 | perf:layout-shift 0.0007 | frames/f000546.jpg |
| 00:25.053 | perf:layout-shift 0.0005 | frames/f000547.jpg |
| 00:25.060 | perf:layout-shift 0.0007 | frames/f000548.jpg |
| 00:25.071 | perf:layout-shift 0.0002 | frames/f000549.jpg |
| 00:25.080 | perf:layout-shift 0.0011 | frames/f000550.jpg |
| 00:25.090 | perf:layout-shift 0.0001 | frames/f000551.jpg |
| 00:25.100 | perf:layout-shift 0.0007 | frames/f000552.jpg |
| 00:25.111 | perf:layout-shift 0.0005 | frames/f000553.jpg |
| 00:25.120 | perf:layout-shift 0.0007 | frames/f000554.jpg |
| 00:25.130 | perf:layout-shift 0.0005 | frames/f000555.jpg |
| 00:25.144 | perf:layout-shift 0.0007 | frames/f000556.jpg |
| 00:25.150 | perf:layout-shift 0.0005 | frames/f000557.jpg |
| 00:25.164 | perf:layout-shift 0.0338 | frames/f000558.jpg |
| 00:25.170 | perf:layout-shift 0.0002 | frames/f000559.jpg |
| 00:25.180 | perf:layout-shift 0.0003 | frames/f000560.jpg |
| 00:25.191 | perf:layout-shift 0.0003 | frames/f000561.jpg |
| 00:25.200 | perf:layout-shift 0.0003 | frames/f000562.jpg |
| 00:25.210 | perf:layout-shift 0.0006 | frames/f000563.jpg |
| 00:25.220 | perf:layout-shift 0.0003 | frames/f000564.jpg |
| 00:25.231 | perf:layout-shift 0.0004 | frames/f000565.jpg |
| 00:25.243 | perf:layout-shift 0.0003 | frames/f000566.jpg |
| 00:25.250 | perf:layout-shift 0.0003 | frames/f000567.jpg |
| 00:25.260 | perf:layout-shift 0.0003 | frames/f000568.jpg |
| 00:25.272 | perf:layout-shift 0.0005 | frames/f000569.jpg |
| 00:25.280 | perf:layout-shift 0.0002 | frames/f000570.jpg |
| 00:25.290 | perf:layout-shift 0.0005 | frames/f000571.jpg |
| 00:25.300 | perf:layout-shift 0.0003 | frames/f000572.jpg |
| 00:25.310 | perf:layout-shift 0.0005 | frames/f000573.jpg |
| 00:25.320 | perf:layout-shift 0.0003 | frames/f000574.jpg |
| 00:25.330 | perf:layout-shift 0.0002 | frames/f000575.jpg |
| 00:29.140 | ACTION {"problem":{"id":"EX-03","severity":"P2","title":"Every visit logs a red 404 in the console: the bot check answers 404 when there is nothing to check","steps":"Open the try page with DevTools console  | frames/f000587.jpg |
| 00:29.140 | CAPTION[problem] P2 · Every visit logs a red 404 in the console: the bot check answers 404 when there is nothing to check | frames/f000587.jpg |
| 00:32.711 | ACTION {"wait":1000} | frames/f000596.jpg |
