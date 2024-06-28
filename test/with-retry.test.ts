import { sleep } from "@/sleep";
import { withRetry } from "@/with-retry";

describe("withRetry", () => {
  it("should retry function up to specified number of times if it fails", async () => {
    const retryTimes = 3;
    let retriedCount;
    const result = withRetry(retryTimes, (retries, lastError) => {
      retriedCount = retries;
      if (retries > 0) {
        expect(lastError?.message).toBe("Failed");
      } else expect(lastError).toBeUndefined();
      throw new Error("Failed");
    })();

    await expect(result).rejects.toThrow("Failed");
    expect(retriedCount).toBe(retryTimes);
  });

  it("should return result if function finally succeeds", async () => {
    const retryTimes = 3;
    let retriedCount;
    const result = await withRetry(retryTimes, async (retries, lastError) => {
      retriedCount = retries;
      if (retries > 0) {
        expect(lastError?.message).toBe("Failed");
      } else expect(lastError).toBeUndefined();

      if (retries < retryTimes) {
        await sleep(100);

        throw new Error("Failed");
      } else return "Success";
    })();

    expect(retriedCount).toBe(retryTimes);
    expect(result).toBe("Success");
  });
});
