import { AuthUser } from 'next-firebase-auth'
import { db } from 'services/firebase'
import { AssetsDoc } from 'types/index.d'

type GetAssets = {
  user: AuthUser
}
export default async function getAssets({
  user,
}: GetAssets): Promise<AssetsDoc> {
  const assetsFromLocalStorage = localStorage.getItem('assets')
  if (user && user.id) {
    const assetsDoc = await db.collection('assets').doc(user.id).get()

    if (assetsDoc.data()) {
      return assetsDoc.data() as AssetsDoc
    }

    if (assetsFromLocalStorage) {
      const assets: AssetsDoc = JSON.parse(assetsFromLocalStorage)
      await db
        .collection('assets')
        .doc(user.id)
        .set({ userId: user.id, ...assets })

      return assets
    }

    return getInitialData()
  }

  return (assetsFromLocalStorage
    ? JSON.parse(assetsFromLocalStorage)
    : getInitialData()) as AssetsDoc
}

function getInitialData(): AssetsDoc {
  const now = new Date()

  return {
    assets: {
      [now.getFullYear()]: [],
    },
  }
}
