export default function getDeltaPercentage({ deltaArray, totalValuesArray }) {
  return deltaArray.map((delta, index) => {
    return {
      label: index,
      value: `${(delta * 100) / totalValuesArray[index]}%`,
    }
  })
}
