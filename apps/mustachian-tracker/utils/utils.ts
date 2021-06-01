type IsFutureDate = {
  year: string
  month: number
}
// eslint-disable-next-line import/prefer-default-export
export function isFutureDate({ year, month }: IsFutureDate): boolean {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  return (
    parseInt(year, 10) > currentYear ||
    (parseInt(year, 10) === currentYear && month > currentMonth)
  )
}
