import { CarouselParsed } from '@ring/components/Carousel'
import imageParser from 'services/prismic/fields/imageParser'
import { TeaserParsed } from '@ring/components/Teaser'
import { ShopLocationParsed } from '@ring/components/ShopLocation'
import titleParser from 'services/prismic/fields/titleParser'
import { CallToActionParsed } from '@ring/components/CallToAction'
import { LinkParsed } from '@ring/components/Link'
import linkParser from '../fields/linkParser'

export default function gridParser(slice) {
  return {
    sliceType: slice.slice_type,
    backgroundColor: slice.primary.background_color,
    backgroundImage: imageParser(slice.primary.background_image),
    fullWidth: slice.primary.full_width,
    spacing: slice.primary.spacing || 0,
    marginTop: slice.primary.margin_top || 0,
    marginRight: slice.primary.margin_right || 0,
    marginBottom: slice.primary.margin_bottom || 0,
    marginLeft: slice.primary.margin_left || 0,
    paddingTop: slice.primary.padding_top || 0,
    paddingRight: slice.primary.padding_right || 0,
    paddingBottom: slice.primary.padding_bottom || 0,
    paddingLeft: slice.primary.padding_left || 0,
    items: slice.items.map((item) => ({
      content: componentParser(item.content),
      xs: item.xs || null,
      sm: item.sm || null,
      md: item.md || null,
      lg: item.lg || null,
      xl: item.xl || null,
      marginRight: item.margin_right || 0,
      marginBottom: item.margin_bottom || 0,
      marginLeft: item.margin_left || 0,
      paddingTop: item.padding_top || 0,
      paddingRight: item.padding_right || 0,
      paddingBottom: item.padding_bottom || 0,
      paddingLeft: item.padding_left || 0,
    })),
  }
}

function componentParser(
  content: any,
):
  | CallToActionParsed
  | CarouselParsed
  | LinkParsed
  | ShopLocationParsed
  | TeaserParsed {
  if (!content) {
    return null
  }

  switch (content.type) {
    case 'call_to_action':
      return {
        type: 'callToAction',
        image: imageParser(content.data.image),
        title: titleParser(content.data.title),
        link: linkParser(content.data.link),
      }

    case 'carousel':
      return {
        type: 'carousel',
        items: content.data.content.map((item: any) => ({
          image: imageParser(item.image),
        })),
      }

    case 'link':
      return {
        type: 'link',
        text: content.data.text,
        href: linkParser(content.data.link),
        startIcon: content.data.start_icon || null,
        endIcon: content.data.end_icon || null,
        variant: content.data.variant,
      }

    case 'shop_location':
      return {
        type: 'shopLocation',
        image: imageParser(content.data.image),
        logo: imageParser(content.data.logo),
        address: titleParser(content.data.address),
        email: titleParser(content.data.email),
        phoneNumber: titleParser(content.data.phone_number),
        link: linkParser(content.data.link),
      }

    case 'teaser':
      return {
        type: 'teaser',
        variant: content.data.variant,
        title: titleParser(content.data.title),
        subtitle: titleParser(content.data.subtitle),
        image: imageParser(content.data.image),
        justify: content.data.justify || 'flex-start',
      }

    default:
      console.error(
        `Unexpected "slice.slice_type" = "${content.slice_type as string}"`,
      )
  }
}
