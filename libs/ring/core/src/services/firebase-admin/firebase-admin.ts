import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  const {
    NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    FIREBASE_PRIVATE_KEY,
    FIREBASE_CLIENT_EMAIL,
  } = process.env

  if (!FIREBASE_PRIVATE_KEY) {
    throw new Error('Undefined "FIREBASE_PRIVATE_KEY"')
  }

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export const firestore = firebaseAdmin.firestore()
