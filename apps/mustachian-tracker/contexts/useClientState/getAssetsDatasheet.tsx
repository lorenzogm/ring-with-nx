import type { AssetsDoc } from 'contexts/useServerState'
import { eachMonthOfInterval, format } from 'date-fns/fp'

import { AssetsDatasheet } from './index.d'

export default function getAssetsDatasheet(doc: AssetsDoc): AssetsDatasheet {
  return Object.keys(doc.assets).reduce((yearAcc, year) => {
    const now = new Date()

    return {
      ...yearAcc,
      [year]: [
        // prepend the header
        [
          { readOnly: true, value: 'Asset' },
          {
            readOnly: true,
            value: 'Category',
          },
          { readOnly: true, value: 'Currency' },
          ...eachMonthOfInterval({
            start: new Date(now.getFullYear(), 0),
            end: new Date(now.getFullYear(), 11),
          }).map((m) => ({ readOnly: true, value: format('MMM yy', m) })),
        ],
        // iterate over the assets from this year
        ...(doc.assets[year].length === 0
          ? [Array.from({ length: 15 }, () => ({ value: '' }))]
          : doc.assets[year].map((asset) => {
              return [
                // fields before the values
                { value: asset.name },
                { value: asset.category },
                { value: asset.currency },
                // values
                ...asset.values.map((value) => ({
                  value,
                })),
              ]
            })),
      ],
    }
  }, {})
}
