import { Meta } from '@storybook/react'
import { withDesign } from 'storybook-addon-designs'

import { StorybookBox } from '../StorybookBox'
import { Typography } from './Typography'

export default {
  component: Typography,
  title: 'Components/Typography',
  decorators: [withDesign],
} as Meta

export function Variants(): JSX.Element {
  return (
    <>
      <StorybookBox title="Bold">
        <StorybookBox row>
          <Typography variant="h1">
            <strong>H1 Corbel bold 75/110</strong>
          </Typography>
          <Typography variant="h2">
            <strong>
              H2 Custom solutions for all sorts of problems Ma quande lingues
            </strong>
          </Typography>
          <Typography variant="h3">
            <strong>H3 Custom solutions for all sorts of problems</strong>
          </Typography>
          <Typography variant="h4">
            <strong>H4 Custom solutions for all sorts of problems</strong>
          </Typography>
          <Typography variant="h5">
            <strong>H5 Custom solutions for all sorts of problems</strong>
          </Typography>
          <Typography variant="h6">
            <strong>H6 Custom solutions for all sorts of problems</strong>
          </Typography>
        </StorybookBox>
        <StorybookBox row>
          <Typography variant="body1">
            <strong>
              Body1 Epsum factorial non deposit quid pro quo hic escorol.
              Olypian quarrels et gorilla congolium sic ad nauseum. Souvlaki
              ignitus carborundum e pluribus unum. Defacto lingo est igpay
              atinlay. Marquee select us non provisio incongruous feline nolo
              contendre. Gratuitous octopus niacin, sodium glutimate. Quote meon
              an estimate et non interruptus stadium. Sic tempus fugit esperanto
              hiccup estrogen. Glorious baklava ex librus hup hey ad infinitum.
              18
            </strong>
          </Typography>
          <Typography variant="body2">
            <strong>
              Body2 Epsum factorial non deposit quid pro quo hic escorol.
              Olypian quarrels et gorilla congolium sic ad nauseum. Souvlaki
              ignitus carborundum e pluribus unum. 21
            </strong>
          </Typography>
          <Typography variant="caption">
            <strong>
              Caption Epsum factorial non deposit quid pro quo hic escorol.
              Olypian quarrels et gorilla congolium sic ad nauseum. Souvlaki
              ignitus carborundum 15
            </strong>
          </Typography>
        </StorybookBox>
      </StorybookBox>
      <StorybookBox title="Regular">
        <StorybookBox row>
          <Typography variant="h1">H1 Corbel regular 75/ 110</Typography>
          <Typography variant="h2">
            H2 Custom solutions for all sorts of problems Ma quande lingues
          </Typography>
          <Typography variant="h3">
            H3 Custom solutions for all sorts of problems
          </Typography>
          <Typography variant="h4">
            H4 Custom solutions for all sorts of problems
          </Typography>
          <Typography variant="h5">
            H5 Custom solutions for all sorts of problems
          </Typography>
          <Typography variant="h6">
            H6 Custom solutions for all sorts of problems
          </Typography>
        </StorybookBox>
        <StorybookBox row>
          <Typography variant="body1">
            Body1 Epsum factorial non deposit quid pro quo hic escorol. Olypian
            quarrels et gorilla congolium sic ad nauseum. Souvlaki ignitus
            carborundum e pluribus unum. Defacto lingo est igpay atinlay.
            Marquee select us non provisio incongruous feline nolo contendre.
            Gratuitous octopus niacin, sodium glutimate. Quote meon an estimate
            et non interruptus stadium. Sic tempus fugit esperanto hiccup
            estrogen. Glorious baklava ex librus hup hey ad infinitum. 18
          </Typography>
          <Typography variant="body2">
            Body2 Epsum factorial non deposit quid pro quo hic escorol. Olypian
            quarrels et gorilla congolium sic ad nauseum. Souvlaki ignitus
            carborundum e pluribus unum. 21
          </Typography>
          <Typography variant="caption">
            Caption Epsum factorial non deposit quid pro quo hic escorol.
            Olypian quarrels et gorilla congolium sic ad nauseum. Souvlaki
            ignitus carborundum 15
          </Typography>
        </StorybookBox>
      </StorybookBox>
    </>
  )
}

Variants.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/dsNSbWxOkuYf6jd5Id7Qio/Design-Concept?node-id=33%3A8',
  },
}
