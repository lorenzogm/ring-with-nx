export interface CarouselStoryblok {
  items: {
    alt?: string;
    copyright?: string;
    id: number;
    filename: string;
    name: string;
    title?: string;
  }[];
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
  justifyContent: "flex-start" | "space-between";
  backgroundColor?: string;
  fullWidth?: boolean;
  items: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
  )[];
  marginTop?: number;
  marginRight?: number;
  marginBottom?: number;
  marginLeft?: number;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
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
  _uid: string;
  component: "GridContainer";
  [k: string]: any;
}

export interface GridItemStoryblok {
  item: (
    | CarouselStoryblok
    | ContactInlineStoryblok
    | ContainerStoryblok
    | GridContainerStoryblok
    | GridItemStoryblok
    | ImageStoryblok
  )[];
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
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
