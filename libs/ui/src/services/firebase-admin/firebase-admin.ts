import * as firebaseAdmin from 'firebase-admin'

if (!firebaseAdmin.apps.length) {
  if (!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID) {
    throw new Error('Undefined "NEXT_PUBLIC_FIREBASE_PROJECT_ID"')
  }
  if (!process.env.FIREBASE_PRIVATE_KEY) {
    throw new Error('Undefined "FIREBASE_PRIVATE_KEY"')
  }
  if (!process.env.FIREBASE_CLIENT_EMAIL) {
    throw new Error('Undefined "FIREBASE_CLIENT_EMAIL"')
  }

  firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
  })
}

export const firestore = firebaseAdmin.firestore()
