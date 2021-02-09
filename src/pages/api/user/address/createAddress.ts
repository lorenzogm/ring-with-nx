/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { NextApiHandler } from 'next'
import { Address } from 'services/api/user/address/address'
import { db } from 'services/firebase-admin'

const createAddress: NextApiHandler = async (req, res) => {
  try {
    const { address }: { address: Address } = JSON.parse(req.body)

    await db.collection('address').doc().set(address)

    res.status(200)
  } catch (error) {
    res.status(500).json({ message: error.raw.message })
  }
}

export default createAddress
