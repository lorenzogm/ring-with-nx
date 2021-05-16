import GridMui from '@material-ui/core/Grid'
import Box from '@material-ui/core/Box'
import { GridProps } from './index.d'

import contentParser from './contentParser'
import styled from 'styled-components'
import { ImageData } from '@ring/components/Image'
import useMediaQueryGetCurrent from '@ring/hooks/useMediaQueryGetCurrent'

export default Grid
export function Grid({
  backgroundImage,
  backgroundColor,
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
    <BoxStyled
      backgroundImage={backgroundImage && backgroundImage[mediaQuery]}
      bgcolor={backgroundColor}
      mt={marginTop}
      mr={marginRight}
      mb={marginBottom}
      ml={marginLeft}
      pt={paddingTop}
      pr={paddingRight}
      pb={paddingBottom}
      pl={paddingLeft}
    >
      <GridMui container spacing={spacing}>
        {items.map((item, index) => (
          <GridMui
            key={index.toString()}
            item
            xs={item.xs}
            sm={item.sm}
            md={item.md}
            lg={item.lg}
            xl={item.xl}
          >
            <Box
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
            </Box>
          </GridMui>
        ))}
      </GridMui>
    </BoxStyled>
  )
}

const BoxStyled = styled(Box)<{ backgroundImage: ImageData }>`
  ${({ backgroundImage }) =>
    backgroundImage && `background-image: url(${backgroundImage.src})`}
`
