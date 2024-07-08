/**
 * Represents an error that occurs when a timeout is reached.
 */
class TimeoutError extends Error {
  constructor({ message, cause }: { message: string; cause: string }) {
    super(message);
    this.name = "TimeoutError";
    this.cause = cause;
  }
}

/**
 * Wraps a function with a timeout, returning a promise that resolves with the function's return value or rejects with a timeout error.
 *
 * @param timeout - The timeout duration in milliseconds.
 * @param func - The function to be executed.
 * @param name - The name of the function for error messages.
 * @returns A promise that resolves with the function's return value or rejects with a timeout error.
 * @throws If the function throws an error before the timeout.
 */
export const withTimeout = <Args extends any[], Return>(
  timeout: number,
  name: string,
  func: (...args: Args) => Return,
): ((...args: Args) => Promise<Return>) => {
  return (...args: Args): Promise<Return> => {
    const result = Promise.resolve(func(...args));
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => {
        return reject(
          new TimeoutError({
            message: `Operation '${name}' timed out after ${timeout}ms`,
            cause: name,
          }),
        );
      }, timeout),
    );

    return Promise.race([result, timeoutPromise]) as Promise<Return>;
  };
};
