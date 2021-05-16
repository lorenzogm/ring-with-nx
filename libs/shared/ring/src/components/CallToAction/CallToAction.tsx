import { ReactElement } from 'react'
import { CallToActionProps } from './index.d'
import Grid from '@material-ui/core/Grid'
import Title from '@ring/components/Title'
import ImageRing from '@ring/components/Image'

export default function CallToAction({
  image,
  title,
  Image,
}: CallToActionProps): ReactElement | null {
  return (
    <Grid container direction="column" alignItems="center">
      {title ? (
        <Title variant={title.variant} text={title.text} align={'center'} />
      ) : null}
      {image ? <ImageRing image={image} as={Image} /> : null}
    </Grid>
  )
}
