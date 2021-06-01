import 'services/firebase'

import { NextApiRequest, NextApiResponse } from 'next'
import { unsetAuthCookies } from 'next-firebase-auth'

export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> {
  try {
    await unsetAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}
