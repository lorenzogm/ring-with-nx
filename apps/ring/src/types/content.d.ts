export type Content = {
  id: string
  uid: string
  type: 'content'
  data: {
    title: string
    body: Slice[]
    imageBackground: Image | null
  }
}
