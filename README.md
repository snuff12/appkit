# AppKit retry condition rejection reproduction

This example uses the published `@reown/appkit-utils@1.8.24` public API. It needs Node.js 22 or newer and no wallet, project ID or blockchain access.

```sh
npm install --ignore-scripts --omit=optional --legacy-peer-deps
npm run repro
```

The pinned version prints a pending public promise and an escaped `temporary condition error`, then exits with code 1. The outer promise already has a rejection handler, but it never receives the condition error. The process-level listener only records the escaped rejection; without that listener Node exits because the inner rejection is unhandled.

Expected behavior: a condition error rejects the returned promise, so the caller can catch it. The example should then print `rejected: temporary condition error`, no escaped errors, and exit 0.

This is a reproduction for the exported retry helper. It does not exercise wallet connections or establish that all AppKit connection flows are affected.
