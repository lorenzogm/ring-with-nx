import { timeParse, timeFormat } from 'd3-time-format'

const parseDate = timeParse('%Y-%m-%d')
const format = timeFormat('%b %y')
export default function formatDate(date: string) {
  return format(parseDate(date) as Date)
}
