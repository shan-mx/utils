import { sleep } from "@/sleep";
import { withCatch } from "@/with-catch";

describe("withCatch", () => {
  const syncFn = (s: number) => {
    if (s < 0) throw new Error("Failed");

    return s * s;
  };

  const asyncFn = async (s: number) => {
    await sleep(50);
    if (s < 0) throw new Error("Failed");

    return s * s;
  };

  it("should catch error of sync function and return undefined", () => {
    const [err, result] = withCatch(syncFn)(-2);
    expect(err?.message).toBe("Failed");
    expect(result).toBeUndefined();
  });

  it("should return result of sync function if no error occurs", () => {
    const [err, result] = withCatch(syncFn)(2);
    expect(err).toBeUndefined();
    expect(result).toBe(4);
  });

  it("should catch error of async function and return undefined", async () => {
    const [err, result] = await withCatch(asyncFn)(-2);
    expect(err?.message).toBe("Failed");
    expect(result).toBeUndefined();
  });

  it("should return result of async function if no error occurs", async () => {
    const [err, result] = await withCatch(asyncFn)(2);
    expect(err).toBeUndefined();
    expect(result).toBe(4);
  });
});
