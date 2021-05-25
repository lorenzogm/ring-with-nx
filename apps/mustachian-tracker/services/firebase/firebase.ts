import { init } from 'next-firebase-auth'

import firebase from 'firebase/app'
import 'firebase/analytics'
import 'firebase/auth'
import 'firebase/firestore'

const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY
const authDomain = process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN
const databaseURL = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL
const storageBucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET
const messagingSenderId = process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
const appId = process.env.NEXT_PUBLIC_FIREBASE_APP_ID
const measurementId = process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID

const clientEmail = process.env.FIREBASE_CLIENT_EMAIL
const privateKey = process.env.FIREBASE_PRIVATE_KEY

const cookieName = process.env.FIREBASE_COOKIE_NAME
const cookieSecretCurrent = process.env.FIREBASE_COOKIE_SECRET_CURRENT
const cookieSecretPrevious = process.env.FIREBASE_COOKIE_SECRET_PREVIOUS

if (!firebase.apps.length) {
  firebase.initializeApp({
    projectId,
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId,
    appId,
    measurementId,
  })

  if (process.browser) {
    firebase.analytics()
  }
}

export default firebase

export const db = firebase.firestore()

export function initialize() {
  init({
    authPageURL: '/auth',
    appPageURL: '/',
    loginAPIEndpoint: '/api/login', // required
    logoutAPIEndpoint: '/api/logout', // required
    // firebaseAuthEmulatorHost: 'localhost:9099',
    // Required in most cases.
    firebaseAdminInitConfig: {
      credential: {
        projectId,
        clientEmail,
        // The private key must not be accesssible on the client side.
        privateKey,
      },
      databaseURL,
    },
    firebaseClientInitConfig: {
      apiKey, // required
      authDomain,
      databaseURL,
      projectId,
      storageBucket,
      messagingSenderId,
      appId,
      measurementId,
    },
    cookies: {
      name: cookieName, // required
      // Keys are required unless you set `signed` to `false`.
      // The keys cannot be accessible on the client side.
      keys: [cookieSecretCurrent, cookieSecretPrevious],
      httpOnly: true,
      maxAge: 12 * 60 * 60 * 24 * 1000, // twelve days
      overwrite: true,
      path: '/',
      sameSite: 'strict',
      secure: false, // set this to false in local (non-HTTPS) development
      signed: true,
    },
  })
}
