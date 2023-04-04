/**
 * Creates an artificial delay
 * @returns Promise that resolves after a given duration in milliseconds
 */
export default (duration: number) => new Promise<void>(resolve => setTimeout(() => resolve(), duration));