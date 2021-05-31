export default function getDiff(array: Array<number>): Array<number> {
  return array.slice(1).map((n, i) => {
    return n - array[i]
  })
}
