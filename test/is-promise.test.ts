import { isPromise } from "@/is-promise";

describe("isPromise", () => {
  it("should return true for a promise", () => {
    const promise = new Promise<void>((resolve) => {
      resolve();
    });

    expect(isPromise(promise)).toBe(true);
  });

  it("should return false for a non-promise object", () => {
    const obj = { key: "value" };
    expect(isPromise(obj)).toBe(false);
  });

  it("should return false for a non-object", () => {
    const value = "string";
    expect(isPromise(value)).toBe(false);
  });

  it("should return false for a function", () => {
    const func = () => {
      return "value";
    };

    expect(isPromise(func)).toBe(false);
  });
});
