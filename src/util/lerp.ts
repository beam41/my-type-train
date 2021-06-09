export function lerp(a: number, b: number, t: number) {
  t = Math.max(0, Math.min(1, t))
  return a + t * (b - a)
}
