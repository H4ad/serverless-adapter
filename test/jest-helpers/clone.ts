export function clone<T>(json: T): T {
  return JSON.parse(JSON.stringify(json));
}
