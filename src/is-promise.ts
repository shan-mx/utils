/**
 * Checks if an object is a Promise.
 * @param obj - The object to check.
 * @returns True if the object is a Promise, false otherwise.
 */
export function isPromise(obj: any): obj is Promise<any> {
  return (
    !!obj &&
    (typeof obj === "object" || typeof obj === "function") &&
    typeof obj.then === "function"
  );
}
