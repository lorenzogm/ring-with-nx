import Container from 'components/foundations/PageContainer/PageContainer'
import { FC } from 'react'

const Footer: FC = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2 mt-10">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center justify-between">
          Footer
        </div>
      </Container>
    </footer>
  )
}

export default Footer
