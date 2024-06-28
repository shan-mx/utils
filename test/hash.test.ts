import { hash } from "@/hash";

describe("hash", () => {
  it("should return the same hash value for the same string", () => {
    const str = "hello";
    const expectedHash = 99_162_322;
    const result1 = hash(str);
    const result2 = hash(str);
    expect(result1).toBe(expectedHash);
    expect(result2).toBe(expectedHash);
  });

  it("should return a different hash value for different strings", () => {
    const str1 = "hello";
    const str2 = "world";
    const hash1 = hash(str1);
    const hash2 = hash(str2);
    expect(hash1).not.toBe(hash2);
  });
});
