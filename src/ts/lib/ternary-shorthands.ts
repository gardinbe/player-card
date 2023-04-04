/**
 * Quick shorthand for `condition ? value : ""`
 * @returns `value` if condition is true, else empty string
 */
export const printIf = (condition: boolean, value: string) => condition ? value : "";