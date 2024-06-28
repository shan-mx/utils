import { sleep } from "@/sleep";
import { withTime } from "@/with-time";

describe("withTime", () => {
  it("should count time correctly for async function", async () => {
    const square = async (n: number) => {
      await sleep(50);

      return n * n;
    };

    const [time, result] = await withTime(square)(2);
    expect(time).toBeGreaterThan(49);
    expect(result).toBe(4);
  });

  it("should count time correctly for sync function", () => {
    const square = (n: number) => {
      return n * n;
    };

    const [time, result] = withTime(square)(2);
    expect(time).toBeLessThan(10);
    expect(result).toBe(4);
  });
});
