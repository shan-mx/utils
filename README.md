# Utils

Useful utility functions for Typescript projects.

## Installation

```bash
npx jsr add @mxkit/utils
```

```bash
pnpm dlx jsr add @mxkit/utils
```

```bash
bunx jsr add @mxkit/utils
```

## Usage

```typescript
import {
  sleep,
  withCatch,
  withRetry,
  withTime,
  withTimeout,
} from "@mxkit/utils";

const [err, res] = await withCatch(
  withTimeout(150, "test", async () => {
    await sleep(200);

    return "Hello, world!";
  }),
)();

if (err) console.log("Error:", err.message);
else console.log("Result:", res);

await withRetry(3, async (retries, lastErr) => {
  const [time, result] = await withTime(async () => {
    await sleep(50);

    return "Hello, world!";
  })();

  console.log(`Time: ${time}ms, Result: ${result}`);
  console.log(`Retries: ${retries}`);
  if (lastErr) console.log(`Last Error: ${lastErr.message}`);

  if (retries >= 2) return;
  throw new Error("Something went wrong!");
})();
```
