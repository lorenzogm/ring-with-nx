import styled from 'styled-components'

import { useCurrentMediaQuery } from '../../hooks'

export function MediaQueryInfo(): JSX.Element | null {
  const mediaQuery = useCurrentMediaQuery()
  return <Wrapper data-testid="mq-info">{mediaQuery}</Wrapper>
}

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 20px;
  border-top: 1px solid lime;
  border-left: 1px solid lime;
  background-color: firebrick;
  opacity: 0.1;
  color: white;
  z-index: 9;
  pointer-events: none;
`
