import GridMui from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { GridProps } from './index.d'

import contentParser from './contentParser'
import styled from 'styled-components'
import { ImageData } from '@ring/components/Image'
import useMediaQueryGetCurrent from '@ring/hooks/useMediaQueryGetCurrent'
import Container from '@material-ui/core/Container'

export default Grid
export function Grid({
  backgroundImage,
  backgroundColor,
  fullWidth,
  marginTop,
  marginRight,
  marginBottom,
  marginLeft,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  spacing,
  items,
  Image,
}: GridProps) {
  const mediaQuery = useMediaQueryGetCurrent()

  return (
    <ContainerStyled maxWidth={fullWidth ? false : 'lg'} fullWidth={fullWidth}>
      <BoxContainer
        backgroundImage={backgroundImage && backgroundImage[mediaQuery]}
        bgcolor={backgroundColor}
        fullWidth={fullWidth}
        mt={marginTop}
        mr={marginRight}
        mb={marginBottom}
        ml={marginLeft}
        pt={paddingTop}
        pr={paddingRight}
        pb={paddingBottom}
        pl={paddingLeft}
      >
        <ContainerStyled fullWidth={!fullWidth}>
          <GridMui container spacing={spacing}>
            {items.map((item, index) => (
              <GridMui
                key={index.toString()}
                item
                xs={item.xs || undefined}
                sm={item.sm || undefined}
                md={item.md || undefined}
                lg={item.lg || undefined}
                xl={item.xl || undefined}
              >
                <BoxItem
                  mt={item.marginTop}
                  mr={item.marginRight}
                  mb={item.marginBottom}
                  ml={item.marginLeft}
                  pt={item.paddingTop}
                  pr={item.paddingRight}
                  pb={item.paddingBottom}
                  pl={item.paddingLeft}
                >
                  {contentParser(
                    // @ts-expect-error don't know how to fix it
                    item.content,
                    index,
                    Image,
                  )}
                </BoxItem>
              </GridMui>
            ))}
          </GridMui>
        </ContainerStyled>
      </BoxContainer>
    </ContainerStyled>
  )
}

const ContainerStyled = styled(Container)<{ fullWidth: boolean }>`
  ${({ fullWidth }) => fullWidth && `padding-left: 0;`}
  ${({ fullWidth }) => fullWidth && `padding-right: 0;`}
`

const BoxContainer = styled(Box)<{
  backgroundImage: ImageData
  fullWidth: boolean
}>`
  ${({ backgroundImage, fullWidth }) => `
  ${backgroundImage && `background-image: url(${backgroundImage.src});`}
  ${fullWidth && `padding-left: 0;`}
    `}
`

const BoxItem = styled(Box)`
  height: 100%;
`
