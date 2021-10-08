import Paper from '@material-ui/core/Paper'
import { styled } from '@ring/core/theme'
import { Meta } from '@storybook/react'
import React from 'react'
import { withDesign } from 'storybook-addon-designs'

import { Container } from '../Container'
import { Grid } from './Grid'

export default {
  component: Grid,
  title: 'Components/Grid',
  decorators: [withDesign],
} as Meta

export function Default(): JSX.Element {
  return (
    <Container disableGutters>
      <Grid container>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid item key={index.toString()} xs={3} sm={2} md={1}>
            <PaperStyled />
          </Grid>
        ))}
      </Grid>
    </Container>
  )
}

const parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/dsNSbWxOkuYf6jd5Id7Qio/Design-Concept?node-id=33%3A11',
  },
  layout: 'fullscreen',
}

Default.parameters = parameters

const PaperStyled = styled(Paper)`
  background-color: salmon;
  height: 80vh;
`
