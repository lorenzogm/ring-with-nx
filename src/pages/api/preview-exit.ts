import { NextApiRequest, NextApiResponse } from 'next'

export default function previewExit(
  req: NextApiRequest,
  res: NextApiResponse,
): void {
  res.clearPreviewData()

  res.writeHead(307, { Location: '/' })
  res.end()
}
