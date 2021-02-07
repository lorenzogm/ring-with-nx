import Container from 'components/foundations/PageContainer/PageContainer'
import Navigation from 'components/elements/Navigation/Navigation'
import { FC } from 'react'
import { Config } from 'services/CMS/config'

type FooterProps = {
  config: Config
}

const Footer: FC<FooterProps> = ({ config }) => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 mt-10">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center justify-between">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            {config.siteName}
          </h3>
          <Navigation navigation={config.navigation} />
        </div>
      </Container>
    </footer>
  )
}

export default Footer
