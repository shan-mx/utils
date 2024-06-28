import { sleep } from "@/sleep";

describe("sleep", () => {
  it("should sleep for specified time", async () => {
    const start = Date.now();
    await sleep(50);
    const end = Date.now();
    expect(end - start).toBeGreaterThan(49);
  });
});
