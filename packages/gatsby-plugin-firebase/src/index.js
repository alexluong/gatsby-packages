import React from "react"
import FirebaseContext from "./components/FirebaseContext"

function Index({ features, env = {}, children }) {
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
      ]).then(values => {
        const firebaseInstance = values[0]
        firebaseInstance.initializeApp({
          apiKey: env.GATSBY_FIREBASE_API_KEY || process.env.GATSBY_FIREBASE_API_KEY,
          authDomain: env.GATSBY_FIREBASE_AUTH_DOMAIN || process.env.GATSBY_FIREBASE_AUTH_DOMAIN,
          databaseURL: env.GATSBY_FIREBASE_DATABASE_URL || process.env.GATSBY_FIREBASE_DATABASE_URL,
          projectId: env.GATSBY_FIREBASE_PROJECT_ID || process.env.GATSBY_FIREBASE_PROJECT_ID,
          storageBucket: env.GATSBY_FIREBASE_STORAGE_BUCKET || process.env.GATSBY_FIREBASE_STORAGE_BUCKET,
          messagingSenderId: env.GATSBY_FIREBASE_MESSAGING_SENDER_ID || process.env.GATSBY_FIREBASE_MESSAGING_SENDER_ID,
          appId: env.GATSBY_FIREBASE_APP_ID || process.env.GATSBY_FIREBASE_APP_ID,
          measurementId: env.GATSBY_FIREBASE_MEASUREMENT_ID || process.env.GATSBY_FIREBASE_MEASUREMENT_ID,
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
