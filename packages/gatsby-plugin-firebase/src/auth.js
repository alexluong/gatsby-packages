import React from "react";
import firebase from "./firebase";

const LS_ITEM = "isLoggedIn";

function useAuth() {
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(data => {
      if (data) {
        localStorage.setItem(LS_ITEM, JSON.stringify(true));
        setUser(data);
      } else {
        setUser(null);
        localStorage.removeItem(LS_ITEM);
      }

      if (!isInitialized) {
        setIsInitialized(true);
      }
    });

    return () => unsubscribe();
  }, [setUser, setIsInitialized, isInitialized]);

  return {
    isInitialized,
    isLoggedIn: isInitialized
      ? !!user
      : typeof window !== "undefined"
      ? localStorage.getItem(LS_ITEM) === "true"
      : false,
    user
  };
}

export default useAuth;
