/**
 * Calculates the hash value of a given string.
 * @param str - The string to calculate the hash for.
 * @returns An Uint32 hash value.
 */
export function hash(str: string): number {
  return [...str].reduce(
    (s, c) => (Math.imul(31, s) + c.charCodeAt(0)) >>> 0,
    0,
  );
}
