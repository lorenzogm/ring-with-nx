import { NextApiHandler } from 'next'

import { db } from 'services/firebase-admin'
import type { Address } from 'types/address'

const createAddress: NextApiHandler = async (req, res) => {
  try {
    const { address }: { address: Address } = JSON.parse(req.body)

    await db.collection('address').add(address)

    res.status(200)
  } catch (error) {
    res.status(500).json({ message: error.raw.message })
  }
}

export default createAddress
