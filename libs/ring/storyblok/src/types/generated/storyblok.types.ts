export interface CarouselStoryblok {
  items: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  }[];
  mobileMarginBottom?: number;
  tabletMarginBottom?: number;
  laptopMarginBottom?: number;
  _uid: string;
  component: "Carousel";
  [k: string]: any;
}

export interface ContactInlineStoryblok {
  title?: string;
  icon?: "Phone" | "Email";
  text: string;
  link: string;
  _uid: string;
  component: "ContactInline";
  [k: string]: any;
}

export interface ContainerStoryblok {
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | TitleStoryblok
  )[];
  backgroundColor?: string;
  fullWidth?: boolean;
  justifyContent: "flex-start" | "center" | "space-between";
  mobileMarginBottom: number;
  tabletMarginBottom: number;
  laptopMarginBottom: number;
  mobileFlexDirection: "row" | "column";
  tabletFlexDirection: "row" | "column";
  laptopFlexDirection: "row" | "column";
  _uid: string;
  component: "Container";
  [k: string]: any;
}

export interface ContentTemplateStoryblok {
  header?: GlobalReferenceStoryblok[];
  body?: any[];
  _uid: string;
  component: "ContentTemplate";
  [k: string]: any;
}

export interface GlobalStoryblok {
  global?: (GlobalStoryblok | GlobalReferenceStoryblok | HeaderStoryblok)[];
  _uid: string;
  component: "Global";
  [k: string]: any;
}

export interface GlobalReferenceStoryblok {
  reference: string;
  _uid: string;
  component: "GlobalReference";
  [k: string]: any;
}

export interface GridContainerStoryblok {
  items: GridItemStoryblok[];
  mobileMarginBottom?: number;
  tabletMarginBottom?: number;
  laptopMarginBottom?: number;
  _uid: string;
  component: "GridContainer";
  [k: string]: any;
}

export interface GridItemStoryblok {
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | TitleStoryblok
  )[];
  mobileColumns?: number;
  tabletColumns?: number;
  laptopColumns?: number;
  _uid: string;
  component: "GridItem";
  [k: string]: any;
}

export interface HeaderStoryblok {
  body: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
    | TitleStoryblok
  )[];
  _uid: string;
  component: "Header";
  [k: string]: any;
}

export interface ImageStoryblok {
  image: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  };
  layout: "fill" | "responsive";
  objectFit?: "contain" | "cover";
  width?: number;
  height?: number;
  _uid: string;
  component: "Image";
  [k: string]: any;
}

export interface NavigationItemStoryblok {
  title: string;
  slug?: string;
  items?: NavigationItemStoryblok[];
  _uid: string;
  component: "NavigationItem";
  [k: string]: any;
}

export interface TitleStoryblok {
  title: string;
  mobileMarginBottom: number;
  variant: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body1" | "body2" | "subtitle1" | "subtitle2" | "caption";
  align: "left" | "right" | "center" | "justify";
  verticalAlign?: "flex-start" | "center" | "flex-end";
  tabletMarginBottom: number;
  laptopMarginBottom: number;
  _uid: string;
  component: "Title";
  [k: string]: any;
}
