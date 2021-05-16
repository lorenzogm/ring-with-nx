// getAllContents
export type GetAllContents = ({
  ref,
  excludeByUID,
}: {
  ref?: string
  excludeByUID?: string[]
}) => Promise<Content[]>

// getContentByUID
export type GetContentByUID = ({
  uid,
  ref,
}: {
  uid: string
  ref?: string
}) => Promise<Content>
