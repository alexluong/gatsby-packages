import React from "react"

const FirebaseContext = React.createContext(null)

export function useFirebase(fn, dep = []) {
  const firebase = React.useContext(FirebaseContext)
  React.useEffect(() => {
    if (!firebase) {
      return
    }
    return fn(firebase)
  }, [firebase, ...dep])
}

export default FirebaseContext
