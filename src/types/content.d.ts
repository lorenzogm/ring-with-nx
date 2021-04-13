export type Content = {
  id: string
  uid: string
  type: 'content'
  data: {
    name: string
    body: Slice[]
  }
}
