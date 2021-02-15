// getAllContents
export type GetAllContents = ({ ref }: { ref?: string }) => Promise<Content[]>

// getContentByUID
export type GetContentByUID = ({
  uid,
  ref,
}: {
  uid: string
  ref?: string
}) => Promise<Content>
