import { FC } from 'react'
import Divider from 'components/foundations/Divider/Divider'

const PageSectionHeader: FC = ({ children }) => {
  return (
    <>
      <h3 className="text-2xl font-medium text-gray-700">{children}</h3>
      <Divider />
    </>
  )
}

export default PageSectionHeader
