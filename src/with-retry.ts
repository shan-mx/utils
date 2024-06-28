import { isPromise } from "./is-promise";

/**
 * Executes a function with retry logic.
 *
 * @param times - The number of times to retry the function.
 * @param logic - The logic to execute with retry.
 * @returns A promise that resolves to the return value of the function.
 * @throws The error thrown by the function after all retries are exhausted.
 */
export const withRetry = <Return>(
  times: number,
  logic: (retries: number, lastError: Error | undefined) => Return,
): (() => Promise<Return>) => {
  return async (): Promise<Return> => {
    let lastError: Error | undefined;

    for (let i = 0; i <= times; i++) {
      try {
        const result = logic(i, lastError);

        return isPromise(result) ? await result : result;
      } catch (error) {
        if (error instanceof Error) {
          lastError = error;
          if (i === times) {
            throw error;
          }
        }
      }
    }

    return undefined as never;
  };
};
