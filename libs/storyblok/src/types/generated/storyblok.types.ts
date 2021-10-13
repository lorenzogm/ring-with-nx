export interface CarouselStoryblok {
  items: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }[]
  mobileMarginBottom?: number
  tabletMarginBottom?: number
  laptopMarginBottom?: number
  _uid: string
  component: 'Carousel'
  [k: string]: any
}

export interface ContactInlineStoryblok {
  title?: string
  icon?: 'Phone' | 'Email'
  text: string
  link: string
  _uid: string
  component: 'ContactInline'
  [k: string]: any
}

export interface ContainerStoryblok {
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | LinkExternalStoryblok
    | TitleStoryblok
  )[]
  backgroundColor?: string
  fullWidth?: boolean
  justifyContent: 'flex-start' | 'center' | 'space-between'
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
  mobileFlexDirection: 'row' | 'column'
  tabletFlexDirection: 'row' | 'column'
  laptopFlexDirection: 'row' | 'column'
  _uid: string
  component: 'Container'
  [k: string]: any
}

export interface ContentTemplateStoryblok {
  body?: any[]
  metaTitle?: string
  metaDescription?: string
  metaOpenGraphImage?: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'ContentTemplate'
  [k: string]: any
}

export interface FaviconsStoryblok {
  favicon: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  favicon16: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  favicon32: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  androidChrome192: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  androidChrome512: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  appleTouchIcon: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  mstile150: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  safariPinnedTab: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'Favicons'
  [k: string]: any
}

export interface GlobalStoryblok {
  global?: (
    | FaviconsStoryblok
    | GlobalStoryblok
    | GlobalReferenceStoryblok
    | HeaderStoryblok
  )[]
  _uid: string
  component: 'Global'
  [k: string]: any
}

export interface GlobalConfigStoryblok {
  storeCurrency?: 'EUR'
  favicons: FaviconsStoryblok[]
  metaTitle: string
  metaDescription: string
  metaOpenGraphImage: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  header?: HeaderStoryblok[]
  footer?: any[]
  storeShippingFreeAmount?: number
  storeShippingCosts?: number
  storePaymentMethods?: 'WIRE_TRANSFER'[]
  storeCompanyName?: string
  storeCompanyEmail?: string
  storeCompanyAddress?: string
  storeCompanyPostcode?: string
  storeCompanyCity?: string
  storeCompanyCountry?: string
  storeCompanyIBAN?: string
  storeCompanyIBANAccountHolder?: string
  storeOrderConfirmationEmailTemplateId?: number
  _uid: string
  component: 'GlobalConfig'
  [k: string]: any
}

export interface GlobalReferenceStoryblok {
  reference: string
  _uid: string
  component: 'GlobalReference'
  [k: string]: any
}

export interface GridContainerStoryblok {
  items: GridItemStoryblok[]
  mobileMarginBottom?: number
  tabletMarginBottom?: number
  laptopMarginBottom?: number
  _uid: string
  component: 'GridContainer'
  [k: string]: any
}

export interface GridItemStoryblok {
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | LinkExternalStoryblok
    | TitleStoryblok
  )[]
  mobileColumns?: number
  tabletColumns?: number
  laptopColumns?: number
  _uid: string
  component: 'GridItem'
  [k: string]: any
}

export interface HeaderStoryblok {
  body: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | LinkExternalStoryblok
    | TitleStoryblok
  )[]
  _uid: string
  component: 'Header'
  [k: string]: any
}

export interface ImageStoryblok {
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  layout: 'fill' | 'responsive'
  objectFit?: 'contain' | 'cover'
  width?: number
  height?: number
  _uid: string
  component: 'Image'
  [k: string]: any
}

export interface LinkExternalStoryblok {
  href: string
  target?: '_blank'
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | LinkExternalStoryblok
    | TitleStoryblok
  )[]
  mobileMarginBottom: number
  tabletMarginBottom: number
  laptopMarginBottom: number
  _uid: string
  component: 'LinkExternal'
  [k: string]: any
}

export interface NavigationItemStoryblok {
  title: string
  slug?: string
  items?: NavigationItemStoryblok[]
  _uid: string
  component: 'NavigationItem'
  [k: string]: any
}

export interface StoreProductStoryblok {
  name: string
  imageDefault: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  colorDefault: 'WHITE' | 'BLACK'
  colors?: StoreProductColorsStoryblok[]
  brand?: string
  type?: 'CLOTHES_BABIES' | 'CLOTHES_KIDS' | 'CLOTHES_BIGS'
  _uid: string
  component: 'StoreProduct'
  [k: string]: any
}

export interface StoreProductColorsStoryblok {
  color: 'BLACK' | 'WHITE'
  image: {
    alt?: string
    copyright?: string
    id: number
    filename: string
    name: string
    title?: string
  }
  _uid: string
  component: 'StoreProductColors'
  [k: string]: any
}

export interface TitleStoryblok {
  title: string
  mobileMarginBottom: number
  variant:
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'body1'
    | 'body2'
    | 'subtitle1'
    | 'subtitle2'
    | 'caption'
  align: 'left' | 'right' | 'center' | 'justify'
  verticalAlign?: 'flex-start' | 'center' | 'flex-end'
  tabletMarginBottom: number
  laptopMarginBottom: number
  _uid: string
  component: 'Title'
  [k: string]: any
}
