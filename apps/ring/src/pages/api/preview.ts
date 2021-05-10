/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { NextApiHandler } from 'next'
import { Document } from 'prismic-javascript/types/documents'
import Client from 'services/prismic/client'

function linkResolver(doc: Document) {
  // Pretty URLs for known types
  if (doc.type === 'product') {
    return `/${doc.data.category.uid}/${doc.uid}`
  }

  // Fallback for other types, in case new custom types get created
  return `/${doc.uid}`
}

const preview: NextApiHandler = async (req, res) => {
  const { token: ref, documentId } = req.query
  const redirectUrl = await Client(req)
    .getPreviewResolver(ref as string, documentId as string)
    .resolve(linkResolver, '/')

  if (redirectUrl) {
    res.setPreviewData({ ref })
    res.writeHead(302, { Location: `${redirectUrl}` })
    res.end()
  } else {
    res.status(401).json({ message: 'Invalid token' })
  }
}

export default preview
