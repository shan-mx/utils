import { sleep } from "@/sleep";
import { withCatch } from "@/with-catch";
import { withTimeout } from "@/with-timeout";

describe("withTimeout", () => {
  it("should throw error if timeout is exceeded", async () => {
    const fn = async () => {
      await sleep(20);
    };

    await expect(withTimeout(10, "fn", fn)()).rejects.toThrow(
      "Operation 'fn' timed out after 10ms",
    );
  });

  it("should return result if operation completes within timeout", async () => {
    const fn = async () => {
      await sleep(50);

      return "result";
    };

    const result = withTimeout(200, "fn", fn)();
    await expect(result).resolves.toBe("result");
  });

  it("should work with sync function", async () => {
    const fn = () => "result";
    const result = withTimeout(1, "fn", fn)();
    await expect(result).resolves.toBe("result");
  });

  it("should throw timeout error", async () => {
    const fn = async () => {
      await sleep(2000);
    };

    const [err, _] = await withCatch(withTimeout(20, "fn", fn))();

    expect(err?.name).toBe("TimeoutError");
  });
});
