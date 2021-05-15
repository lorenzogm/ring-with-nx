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
  graphQuery,
}: {
  uid: string
  ref?: string
  fetchLinks?: string[]
  graphQuery?: string
}) => Promise<Content>
