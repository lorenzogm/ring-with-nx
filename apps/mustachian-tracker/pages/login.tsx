import React, { useEffect } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import { withAuthUser, AuthAction } from 'next-firebase-auth'
import firebase, { db } from 'services/firebase'
import { AssetsDoc } from 'contexts/useServerState'

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // We will display Google and Facebook as auth providers.
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
}

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(LoginPage)

function LoginPage() {
  useEffect(() => {
    const unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => {
        if (user) {
          const assetsDoc = localStorage.getItem('assets')
          if (assetsDoc) {
            const assetsDocParsed: AssetsDoc = JSON.parse(assetsDoc)
            db.collection('assets')
              .doc(user.uid)
              .set({
                userId: user.uid,
                ...assetsDocParsed,
              })
          }
        }
      })
    return () => unregisterAuthObserver()
  }, [])

  if (!window) {
    return null
  }

  return (
    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
  )
}
