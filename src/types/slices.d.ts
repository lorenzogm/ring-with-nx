type Slice = {
  sliceType: string
  items: Carousel['items'][]
}

type Carousel = {
  sliceType: 'carousel'
  items: {
    image: Image
    text: string
    buttonText: string
    buttonLink: string
  }
}
