import get from 'lodash.get'

export default function getValues({ key, acc, asset }) {
  const accValues = get(acc, `${asset.category}.${key}`, [])

  const values = asset.values.map((v, i) => {
    const previousValue = accValues.find((v) => v.label === i) || {
      label: i,
      value: 0,
    }
    const value = v + previousValue.value
    return {
      label: i,
      value: value,
    }
  })

  return values
}
