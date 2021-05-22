export function isFutureDate({ year, month }) {
  const now = new Date()
  const currentMonth = now.getMonth() + 1
  const currentYear = now.getFullYear()

  return (
    parseInt(year) > currentYear ||
    (parseInt(year) === currentYear && month > currentMonth)
  )
}
