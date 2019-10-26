# gatsby-plugin-firebase

Provides drop-in support for Firebase

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [1. Set up environment variables](#1-set-up-environment-variables)
  - [2. Register Gatsby plugin](#2-register-gatsby-plugin)
  - [3. Use Firebase](#3-use-firebase)
- [API](#api)
  - [Gatsby options](#gatsby-options)
    - [features](#features)
  - [Exports](#exports)
    - [useFirebase](#usefirebase)
    - [FirebaseContext](#firebasecontext)
  - [Notes](#notes)
- [Limitations](#limitations)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install firebase gatsby-plugin-firebase
```

## Usage

### 1. Set up environment variables

This plugin depends on environment variables. One way to do that is using `dotenv` library:

```
npm install -D dotenv
```

In `gatsby-config.js`:

```
require("dotenv").config()

module.exports = {
  ...
}
```

Then, create the `.env` file in your root directory:

```
GATSBY_FIREBASE_API_KEY=<YOUR_FIREBASE_API_KEY>
GATSBY_FIREBASE_AUTH_DOMAIN=<YOUR_FIREBASE_AUTH_DOMAIN>
GATSBY_FIREBASE_DATABASE_URL=<YOUR_FIREBASE_DATABASE_URL>
GATSBY_FIREBASE_PROJECT_ID=<YOUR_FIREBASE_PROJECT_ID>
GATSBY_FIREBASE_STORAGE_BUCKET=<YOUR_FIREBASE_STORAGE_BUCKET>
GATSBY_FIREBASE_MESSAGING_SENDER_ID=<YOUR_FIREBASE_MESSAGING_SENDER_ID>
GATSBY_FIREBASE_APP_ID=<YOUR_FIREBASE_APP_ID>
```

### 2. Register Gatsby plugin

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    {
      resolve: "gatsby-plugin-firebase",
      options: {
        features: {
          auth: true,
          database: true,
          firestore: false,
          storage: false,
          messaging: false,
          functions: true,
        },
      },
    },
  ],
}
```

### 3. Use Firebase

There are 2 ways to access `firebase` in your application:

1. [`useFirebase` hook](#usefirebase)
2. [`FirebaseContext` context](#firebasecontext)

## API

### Gatsby options

#### features

`features` is a `required` option. It specifies which features of Firebase you intend to use.

| property    | type      | required | default | description                         |
| ----------- | --------- | -------- | ------- | ----------------------------------- |
| `auth`      | `boolean` | `false`  | `false` | import `firebase/auth` package      |
| `database`  | `boolean` | `false`  | `false` | import `firebase/database` package  |
| `firestore` | `boolean` | `false`  | `false` | import `firebase/firestore` package |
| `storage`   | `boolean` | `false`  | `false` | import `firebase/storage` package   |
| `messaging` | `boolean` | `false`  | `false` | import `firebase/messaging` package |
| `functions` | `boolean` | `false`  | `false` | import `firebase/functions` package |

Although none of the properties is required and everything is defaulted to `false`, you must specify at least 1 feature and set its value to `true`.

### Exports

#### useFirebase

> `function() -> firebase`

This plugin exports a React hook `useFirebase`. It uses the same API as `React.useEffect`, except for that in the first argument, the function has `firebase` as its parameter.

If you're interested in the reasoning behind this API design, you can read about it in the [Notes section](#notes).

Here is a sample component using `useFirebase`:

```jsx
import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"

function MyComponent() {
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

export default MyComponent
```

#### FirebaseContext

> `ReactContext`

`firebase` is saved inside `FirebaseContext`. You can use it like every other React Context. However, be aware that on first render, `firebase` is null, so you'll have to handle that case yourself.

```jsx
import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"

function MyComponent({ firebase }) {
  const firebase = React.useContext(FirebaseContext)
  const [user, setUser] = React.useState()

  React.useEffect(() => {
    if (!firebase) {
      return
    }
    
    firebase
      .database()
      .ref("/user")
      .once("value")
      .then(snapshot => {
        setData(snapshot.val())
      })
  }, [firebase])

  return <p>Hello {user ? user.name : "there"}</p>
}

export default MyComponent
```

On the other hand, when you need to perform actions based on user events, this would be a great way for you to access `firebase`. At that point, `firebase` should already be initialized, so you don't have to worry about it anymore:

```jsx
import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"

function MyComponent({ firebase }) {
  const firebase = React.useContext(FirebaseContext)

  function setUser() {
    firebase
      .database()
      .ref("/user")
      .set("Alex")
  }

  return <button onClick={setUser}>Set User Name to Alex</button>
}

export default MyComponent
```

### Notes

It is **highly** recommended that you use `useFirebase` to access your `firebase` instance. Please consider reading [this blog post](https://alexluong.com) to understand the reasoning behind the API.

The idea is that to get Firebase to work in both client-side environment and SSR without any UX compromises, you have to take special care of the Firebase initialization. Thanks to React Hook, you can use `useFirebase` in a kinda-nice way. Without it, you'd have to constantly check whether `firebase` is initialized or not (if not, it's `null`).

Here is a sample higher-order component `withFirebase` that you can write. `gatsby-plugin-firebase` does not export this helper component.

```jsx
export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)
```

Then, let's assume that you're on an older version of React and have to use the old API and not React Hooks, here is one way you can use it:

```jsx
import React from "react"
import { withFirebase } from "./withFirebase"

class MyComponent extends React.Component {
  state = { user: null }

  componentDidUpdate(prevProps) {
    if (!prevProps.firebase && this.props.firebase) {
      this.props.firebase
        .database()
        .ref("/data")
        .once("value")
        .then(snapshot => {
          this.setState({ data: snapshot.val() })
        })
    }
  }

  render() {
    const { user } = this.state
    
    return <p>Hello {user ? user.name : "there"}</p>
  }
}

export default withFirebase(MyComponent)
```

Because you have to constantly be aware of your `firebase` instance, this API is not a part of the library.


## Limitations

One limitation of this approach is that you can only access `firebase` inside your React components. One way to go around it is to pass `firebase` as an argument to the functions that need it.

```js
export function fetchData(firebase) {
  return new Promise(resolve => {
    firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        resolve(snapshot.val())
      })
  })
}
```

## License

MIT
