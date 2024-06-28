import { sleep } from "@/sleep";
import { withRetry } from "@/with-retry";

describe("withRetry", () => {
  it("should retry function up to specified number of times if it fails", async () => {
    const retryTimes = 3;
    let retriesCount;
    const result = withRetry(retryTimes, (retries, lastError) => {
      retriesCount = retries;
      if (retries > 0) {
        expect(lastError?.message).toBe("Failed");
      } else expect(lastError).toBeUndefined();
      throw new Error("Failed");
    })();

    await expect(result).rejects.toThrow("Failed");
    expect(retriesCount).toBe(retryTimes - 1);
  });

  it("should return result if function finally succeeds", async () => {
    const retryTimes = 3;
    const result = await withRetry(retryTimes, async (retries, lastError) => {
      if (retries > 0) {
        expect(lastError?.message).toBe("Failed");
      } else expect(lastError).toBeUndefined();

      if (retries < retryTimes - 1) {
        await sleep(100);

        throw new Error("Failed");
      } else return "Success";
    })();

    expect(result).toBe("Success");
  });
});
