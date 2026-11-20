---
name: video-ux-audit
description: Run a captioned video UX + performance audit of any web view (inbox, dashboard, checkout, settings…) by driving a real browser like a non-technical person, burning a caption into the video at every problem, and writing findings.md with severity, repro steps, expected vs actual, timestamps, screenshots and concrete UX and performance suggestions. Use when asked to "audit this page/view", "record a UX review", "find what's broken in X", or before a redesign.
---

# Video UX audit

You produce three things for one view:

1. **`audit.mp4`**: a screen recording of a person using the view. A caption is shown on screen whenever you narrate an intent (black) or hit a problem (red, `P1 · title`).
2. **`findings.md`**: one row per problem: ID, severity, steps, expected, actual, video timestamp, screenshot, suspected area, UX suggestion and performance suggestion. Below it is a timing table.
3. **`shots/<ID>.png`**: a screenshot of each problem with its caption visible.

In the original use case, an inbox (help-desk) view, one 15-minute recording produced 48 findings: 1 P0, 20 P1 and 27 P2. Those became about 20 small fixes, each re-proven with a fresh recording.

## 0. Safety first (non-negotiable)

- Use only **test data and test accounts**. Make writes (send, claim, resolve, edit) only in a sandbox or test workspace. On real customer data, stay **read-only**.
- Never put real names, emails, phone numbers or ids in a caption, a file name or a published example. Blur them or use test records.
- Use a dedicated browser profile. Close the browser and the tabs you opened when you finish.

## 1. Plan the walk (5 minutes)

List the **jobs** a real user does in this view, in plain words. For an inbox, for example:
- find a conversation;
- read it;
- reply;
- hand it to someone;
- resolve it;
- come back later via a link;
- use it on a phone.

For each job, write the path a non-technical person would try first, not the path the developers designed.

## 2. Persona rules (how to "be a human")

- **Narrate the intent** before acting: `say: "I want to find the customer who asked about an order."`
- **Use what is visible.** Use buttons, labels and menus; no URLs typed by hand, no dev tools and no keyboard shortcuts unless the UI teaches them.
- **Move slowly.** Move the pointer to the target, pause, click, and type at human speed. The recorder already does this.
- **Try the obvious thing first.** If it fails, try the second-most-obvious thing, and log the first failure as a finding.
- **Check the "after".** After every action, check that the list, counts, header and the other side (for example the customer's view) all agree.
- **Reload, go back, open the link in a new tab.** State that does not survive these is a finding.
- **Repeat at phone width** (390×844) for the main jobs.

## 3. Record

Chrome must run with `--remote-debugging-port`. Write a scenario (see `examples/demo-scenario.json`). Step types:

| step | meaning |
|---|---|
| `goto` (+`settle` ms) | open a URL; also records TTFB / DCL / load / LCP |
| `say` (+`ms`) | intent caption (black) |
| `click` (CSS selector) | move the visible pointer, then click |
| `type` `{selector, text}` | click, then type character by character |
| `press` (key) / `scroll` (px) / `wait` (ms) | keyboard, wheel, pause |
| `problem` `{id, severity, title, steps, expected, actual, area, ux, perf}` | red caption + screenshot + finding |

```bash
node scripts/record.mjs my-scenario.json --port 9222 --out ./audit-out
bash scripts/encode.sh ./audit-out             # → audit-out/audit.mp4
node scripts/report.mjs ./audit-out --title "Inbox"   # → audit-out/findings.md
```

**Work in loops.** Explore by hand or with an agent until you find a problem. Add the steps that reproduce it, plus a `problem` step, to the scenario. Re-record, and keep going. The final scenario becomes the regression script for the fixes.

## 4. Severity

- **P0**: data loss, a wrong recipient, a security or privacy leak, or the core job impossible.
- **P1**: the core job is broken, misleading or very slow (more than 1 s for an action, more than 3 s for a view), or there is a cross-surface mismatch. An example of a mismatch is a header that says "Web" while the panel says "Chat".
- **P2**: friction, confusing wording, a missing affordance, or a cosmetic problem.

## 5. Write good findings

- **Steps** must reproduce the problem from a clean start.
- **Expected** is what a user would assume, not what the spec says.
- **Actual** is exactly what happened, with numbers and timings.
- **Suspected area** is the component, endpoint or query, if you can see the code; otherwise the UI region.
- **UX suggestion** is the smallest change that removes the confusion, in user words.
- **Perf suggestion** is concrete: prefetch on hover, stream the first screen, a server-side index or filter, cache immutable assets, debounce, or virtualise long lists.

## 6. Performance pass (same session)

- Use the `timings.json` the recorder writes for every `goto` and click.
- Add numbers for the main actions, measured from click to content. Use `performance` entries or a `MutationObserver` in the page.
- Use these targets unless the product sets its own: action ≤ 200 ms, view ≤ 1 s warm, LCP ≤ 2.5 s.
- Record misses as findings with the measured numbers.

## 7. Deliver

- Put `audit.mp4`, `findings.md` and `shots/` in one folder.
- Fix P0 first, then the P1s. Make one small change per finding.
- After each fix, re-run the same scenario and attach the new clip or screenshot as proof.
