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
  fetchLinks,
}: {
  uid: string
  ref?: string
  fetchLinks?: string[]
}) => Promise<Content>
