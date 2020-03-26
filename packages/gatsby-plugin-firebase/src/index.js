import React from "react"
import FirebaseContext from "./components/FirebaseContext"

function Index({ features, credentials = {}, children }) {
  const [firebase, setFirebase] = React.useState(null)

  React.useEffect(() => {
    if (!firebase && typeof window !== "undefined") {
      const app = import("firebase/app")
      const auth = features.auth ? import("firebase/auth") : null
      const database = features.database ? import("firebase/database") : null
      const firestore = features.firestore ? import("firebase/firestore") : null
      const storage = features.storage ? import("firebase/storage") : null
      const messaging = features.messaging ? import("firebase/messaging") : null
      const functions = features.functions ? import("firebase/functions") : null
      const performance = features.performance ? import("firebase/performance") : null
      const analytics = features.analytics ? import("firebase/analytics") : null
      const remoteConfig = features.remoteConfig ? import("firebase/remote-config") : null

      Promise.all([
        app,
        auth,
        database,
        firestore,
        storage,
        messaging,
        functions,
        performance,
        analytics,
        remoteConfig,
      ]).then(values => {
        const firebaseInstance = values[0]
        firebaseInstance.initializeApp({
          apiKey: credentials.apiKey || process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: credentials.authDomain || process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: credentials.databaseURL || process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: credentials.projectId || process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: credentials.storageBucket || process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: credentials.messagingSenderId || process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: credentials.appId || process.env.GATSBY_FIREBASE_APP_ID,
          measurementId: credentials.measurementId || process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
        })
        setFirebase(firebaseInstance)
      })
    }
  }, [])

  return (
    <FirebaseContext.Provider value={firebase}>
      {children}
    </FirebaseContext.Provider>
  )
}

export default Index
