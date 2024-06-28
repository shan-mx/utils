import { isPromise } from "./is-promise";

type WithTime<Return> =
  Return extends Promise<any>
    ? Promise<[number, Awaited<Return>]>
    : [number, Return];

/**
 * Measures the execution time of a function and returns the result along with the elapsed time.
 *
 * @param func - The function to be timed.
 * @returns If the return type of the function is a Promise, it returns a Promise that resolves to an array containing the elapsed time and the result. Otherwise, it returns an array containing the elapsed time and the result.
 */
export const withTime = <Args extends any[], Return>(
  func: (...args: Args) => Return,
): ((...args: Args) => WithTime<Return>) => {
  return (...args: Args): WithTime<Return> => {
    const start = performance.now();
    const result = func(...args);
    if (isPromise(result)) {
      return result.then((value) => [
        performance.now() - start,
        value,
      ]) as WithTime<Return>;
    }

    return [performance.now() - start, result] as WithTime<Return>;
  };
};
