export type Content = {
  id: string
  uid: string
  type: 'content'
  data: {
    title: RichTextBlock
    body: Slice[]
  }
}
