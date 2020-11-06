/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Config } from 'services/CMS/config'

import client from '../../client'
import configParser from './configParser'

export default async function getConfig(): Promise<Config> {
  const config = await client.getSingle('config', {})

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const navigationItemIds = config.data.navigation.map(
    ({ navigation_item }: { navigation_item: { id: string } }) =>
      navigation_item.id,
  )

  const navigationItems = await client.getByIDs(navigationItemIds, {})

  return configParser({ config, navigationItems: navigationItems.results })
}
