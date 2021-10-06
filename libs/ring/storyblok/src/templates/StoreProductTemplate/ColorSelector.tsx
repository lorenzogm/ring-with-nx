import Paper from '@material-ui/core/Paper'
import { ButtonUnstyled, Grid, Image } from '@ring/core/index'
import { StoreProductColorsStoryblok } from '@ring/storyblok/types'
import { ReactElement } from 'react'

type ColorSelectorProps = {
  colors: Array<StoreProductColorsStoryblok>
  colorSelected: StoreProductColorsStoryblok['color']
  onSelectColor: ({
    imageSelected,
    colorSelected,
  }: {
    imageSelected: StoreProductColorsStoryblok['image']
    colorSelected: StoreProductColorsStoryblok['color']
  }) => void
}

export function ColorSelector({
  colors,
  colorSelected,
  onSelectColor,
}: ColorSelectorProps): ReactElement | null {
  return (
    <div>
      <div>Color: {colorSelected}</div>
      <Grid container>
        {colors.map(({ image, color }) => (
          <Grid item key={color} xs={4} sm={2}>
            <ButtonUnstyled
              onClick={() =>
                onSelectColor({ imageSelected: image, colorSelected: color })
              }
            >
              <Paper elevation={colorSelected === color ? 4 : 0}>
                <Image
                  src={image.filename}
                  alt={image.alt || color}
                  layout="responsive"
                  width={1}
                  height={1}
                />
              </Paper>
            </ButtonUnstyled>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}
