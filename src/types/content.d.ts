export type Content = {
  id: string
  uid: string
  type: string
  data: {
    title: RichTextBlock
    body: any
  }
}

type Body = Slice[]
