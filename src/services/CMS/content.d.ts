// getAllContents
export type GetAllContents = () => Promise<Content[]>

// getContentByUID
export type GetContentByUID = ({ uid }: { uid: string }) => Promise<Content>
