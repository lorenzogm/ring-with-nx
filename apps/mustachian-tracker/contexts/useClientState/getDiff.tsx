export default function getDiff(array) {
  return array.slice(1).map((n, i) => {
    return n - array[i]
  })
}
