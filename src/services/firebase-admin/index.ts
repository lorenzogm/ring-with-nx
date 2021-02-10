import firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  const {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
  } = process.env

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY,
      clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export default firebaseAdmin
export const db = firebaseAdmin.firestore()
