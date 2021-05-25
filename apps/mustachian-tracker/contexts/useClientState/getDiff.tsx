export default function getDiff(array) {
  return array.slice(1).map(function (n, i) {
    return n - array[i]
  })
}
