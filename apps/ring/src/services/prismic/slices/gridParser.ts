import { CarouselParsed } from '@ring/components/Carousel'
import imageParser from 'services/prismic/fields/imageParser'
import { TeaserParsed } from '@ring/components/Teaser'
import { ShopLocationParsed } from '@ring/components/ShopLocation'
import titleParser from 'services/prismic/fields/titleParser'
import { CallToActionParsed } from '@ring/components/CallToAction'

export default function gridParser(slice) {
  console.log(slice)
  return {
    sliceType: slice.slice_type,
    backgroundColor: slice.primary.background_color,
    backgroundImage: imageParser(slice.primary.background_image),
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
      xs: item.xs || 12,
      sm: item.sm || item.xs || 12,
      md: item.md || item.sm || item.xs || 12,
      lg: item.lg || item.md || item.sm || item.xs || 12,
      xl: item.xl || item.lg || item.md || item.sm || item.xs || 12,
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
): CallToActionParsed | CarouselParsed | ShopLocationParsed | TeaserParsed {
  switch (content.type) {
    case 'call_to_action':
      return {
        type: 'callToAction',
        image: imageParser(content.data.image),
        title: titleParser(content.data.title),
      }

    case 'carousel':
      return {
        type: 'carousel',
        items: content.data.content.map((item: any) => ({
          image: imageParser(item.image),
        })),
      }

    case 'shop_location':
      return {
        type: 'shopLocation',
        image: imageParser(content.data.image),
        logo: imageParser(content.data.logo),
        address: titleParser(content.data.address),
        email: titleParser(content.data.email),
        phoneNumber: titleParser(content.data.phone_number),
      }

    case 'teaser':
      return {
        type: 'teaser',
        variant: content.data.variant,
        title: titleParser(content.data.title),
        subtitle: titleParser(content.data.subtitle),
        image: imageParser(content.data.image),
      }

    default:
      console.error(
        `Unexpected "slice.slice_type" = "${content.slice_type as string}"`,
      )
  }
}
