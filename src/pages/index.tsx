import { GetStaticProps } from 'next'

import HomeTemplate from 'components/templates/HomeTemplate/HomeTemplate'
import getClient from 'services/getClient'

export default HomeTemplate

export const getStaticProps: GetStaticProps = async ({ preview = false }) => {
  const CMS = getClient()
  const config = await CMS.getConfig()

  return {
    props: {
      preview,
      config,
    },
  }
}
