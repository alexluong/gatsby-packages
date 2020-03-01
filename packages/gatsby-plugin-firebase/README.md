# gatsby-plugin-firebase

Provides drop-in support for Firebase

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [1. Register Gatsby plugin](#1-register-gatsby-plugin)
  - [3. Import Firebase feature packages](#3-import-firebase-feature-packages)
  - [4. Use Firebase](#4-use-firebase)
- [Migrating from v0.1](#migrating-from-v01)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install firebase gatsby-plugin-firebase
```

## Usage

### 1. Register Gatsby plugin

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "<YOUR_FIREBASE_API_KEY>",
          authDomain: "<YOUR_FIREBASE_AUTH_DOMAIN>",
          databaseURL: "<YOUR_FIREBASE_DATABASE_URL>",
          projectId: "<YOUR_FIREBASE_PROJECT_ID>",
          storageBucket: "<YOUR_FIREBASE_STORAGE_BUCKET>",
          messagingSenderId: "<YOUR_FIREBASE_MESSAGING_SENDER_ID>",
          appId: "<YOUR_FIREBASE_APP_ID>"
        }
      }
    }
  ],
}
```

### 3. Import Firebase feature packages

In `gatsby-browser.js` and `gatsby-ssr.js`, import Firebase packages that you would like to use. Please check the official [`firebase`](https://www.npmjs.com/package/firebase) package or [Firebase Documentation](https://firebase.google.com/docs/reference/js) for all available options. Here is an example setup for an application that uses Firebase Authentication, Firestore, and Functions:

```js
// gatsby-browser.js and gatsby-ssr.js

import "firebase/auth"
import "firebase/firestore"
import "firebase/functions"
```

### 4. Use Firebase

Use Firebase like how you would use in a React project.

```jsx
import React from "react"
import firebase from "gatsby-plugin-firebase"

function Component() {
  const [data, setData] = React.useState(null)

  React.useEffect(() => {
    firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        setData(snapshot.val())
      })
  }, [])

  return <div>{data ? data : "Loading..."}</div>
}

export default Component
```

You can also use this package together with [`react-firebase-hooks`](https://github.com/CSFrequency/react-firebase-hooks).

```jsx
import React from "react"
import firebase from "gatsby-plugin-firebase"
import { useObjectVal } from "react-firebase-hooks/database"

function Component() {
  const [data, setData] = React.useState(null)
  const [data, isLoading] = useObjectVal(firebase.database().ref("data"))

  return <div>{isLoading ? "Loading..." : data}</div>
}

export default Component
```

## Migrating from v0.1

First of all, thank you for using my package. This is my first meaningful contribution to the OS community, and I appreciate everyone of you who trusts and uses this package from the beginning.

I believe `gatsby-plugin-firebase` v0.2 is a significant improvement over v0.1 because it's much more intuitive and similar to how React developers would use Firebase.

With v0.2, you can import `firebase` from `gatsby-plugin-firebase` and use it like you would import from `firebase`. Therefore, I removed `useFirebase` and `FirebaseContext` and hopefully made it much more intuitive to use.

Here is a sample code from v0.1:

```jsx
import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"

function Component() {
  const [user, setUser] = React.useState()

  useFirebase(firebase => {
    firebase
      .database()
      .ref("/user")
      .once("value")
      .then(snapshot => {
        setUser(snapshot.val())
      })
  }, [])

  return <p>Hello {user ? user.name : "there"}</p>
}

export default Component
```

and the equivalent code from v0.2:

```jsx
import React from "react"
// import { useFirebase } from "gatsby-plugin-firebase"
import firebase from "gatsby-plugin-firebase"

function Component() {
  const [user, setUser] = React.useState()

  // instead of useFirebase, you can use React.useEffect
  // useFirebase(firebase => {
  React.useEffect(() => {
    firebase
      .database()
      .ref("/user")
      .once("value")
      .then(snapshot => {
        setUser(snapshot.val())
      })
  }, [])

  return <p>Hello {user ? user.name : "there"}</p>
}

export default Component
```

Please let me know if you need backward-compatible support to help ease the transition.

## License

MIT
