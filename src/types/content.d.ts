export type Content = {
  id: string
  uid: string
  type: string
  data: {
    title: RichTextBlock
    body: unknown
  }
}

type Body = Slice[]
