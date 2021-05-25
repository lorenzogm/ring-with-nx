import firebase, { db } from 'services/firebase'
import type { AssetsDoc } from 'contexts/useServerState/index.d'

export default async function getAssets(): Promise<AssetsDoc> {
  const { currentUser } = firebase.auth()

  let doc: AssetsDoc
  if (currentUser) {
    const assets = await db.collection('assets').doc(currentUser.uid).get()

    doc = assets ? (assets.data() as AssetsDoc) : getInitialData()
  } else {
    const assets = localStorage.getItem('assets')
    doc = assets ? JSON.parse(assets) : getInitialData()
  }

  return doc
}

function getInitialData(): AssetsDoc {
  const now = new Date()

  return {
    assets: {
      [now.getFullYear()]: [],
    },
  }
}
