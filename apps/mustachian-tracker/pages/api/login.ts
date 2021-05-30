import 'services/firebase'

import { setAuthCookies } from 'next-firebase-auth'

export default async function login(req, res) {
  try {
    await setAuthCookies(req, res)
  } catch (e) {
    return res.status(500).json({ error: 'Unexpected error.' })
  }
  return res.status(200).json({ success: true })
}
