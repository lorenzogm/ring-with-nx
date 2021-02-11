type Slice = {
  slice_type: string
  items: any
}

type Carousel = {
  sliceType: 'carousel'
  items: {
    image: string
    text: string
    buttonText: string
    buttonLink: string
  }
}
