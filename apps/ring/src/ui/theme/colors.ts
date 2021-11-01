const COLORS = {
  black: '#000000',
  blue: '#3A1AFC',
  'blue-3': '#B5BEEE',
  'blue-4': '#D9DEF6',
  green: '#32A77D',
  'green-1': '#76C4A8',
  'green-2': '#BBE2D4',
  grey: '#454142',
  'grey-1': '#646161',
  'grey-2': '#A2A0A0',
  'grey-3': '#C1C0C0',
  'grey-4': '#DAD9D9',
  'grey-5': '#ECECEC',
  'grey-6': '#F4F4F4',
  marron: '#D66B6B',
  'marron-1': '#EF9B9B',
  'marron-3': '#EFC4C4',
  purple: '#AD52FF',
  'purple-2': '#D6A8FF',
  'purple-4': '#EFDCFF',
  teal: '#2A6672',
  'teal-2': '#95B3B9',
  'teal-4': '#D4E0E3',
  'teal-5': '#E1E9EB',
  white: '#FFFFFF',
  yellow: '#FFB547',
  'yellow-2': '#FEE5C1',
}

type Keys = keyof typeof COLORS

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function colors(key: Keys) {
  return COLORS[key]
}
