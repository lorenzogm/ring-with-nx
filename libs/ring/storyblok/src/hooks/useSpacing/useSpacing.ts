export function useSpacing(spacing?: string): number {
  if (typeof spacing === 'undefined' || spacing === '') {
    return 0
  }

  return Number(spacing)
}
