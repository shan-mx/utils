import { isPromise } from "./is-promise";

type WithCatch<Return> =
  Return extends Promise<any>
    ? Promise<[Error, undefined] | [undefined, Awaited<Return>]>
    : [Error, undefined] | [undefined, Return];

/**
 * Wraps a function with error handling and returns a new function.
 * The new function handles both synchronous and asynchronous errors.
 *
 * @param func - The function to be wrapped.
 * @returns An array containing the error and the result of the function. The error is undefined if the function executed successfully.
 */
export function withCatch<Args extends any[], Return>(
  func: (...args: Args) => Return,
): (...args: Args) => WithCatch<Return> {
  return (...args: Args): WithCatch<Return> => {
    try {
      const result = func(...args);
      if (isPromise(result)) {
        return result
          .then((value) => [undefined, value])
          .catch((error) => {
            return [error, undefined];
          }) as WithCatch<Return>;
      }

      return [undefined, result] as WithCatch<Return>;
    } catch (error) {
      return [error as any, undefined] as WithCatch<Return>;
    }
  };
}
