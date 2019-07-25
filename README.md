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
    - [withFirebase](#withfirebase)
    - [FirebaseContext](#firebasecontext)
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
require("dotenv").require()

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

There are 3 ways to access `firebase` in your application:

1. [`useFirebase` hook](#usefirebase)
2. [`withFirebase` higher-order component](#withfirebase)
3. [`FirebaseContext` context](#firebasecontext)

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

This plugin exports a React hook `useFirebase`. Here is a sample component:

```jsx
import React from "react"
import { useFirebase } from "gatsby-plugin-firebase"
import MyData from "./MyData"

function MyComponent() {
  const firebase = useFirebase()
  const [data, setData] = React.useState()

  React.useEffect(() => {
    firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        setData(snapshot.val())
      })
  }, [firebase])

  if (!data) {
    return null
  }

  return <MyData data={data} />
}

export default MyComponent
```

#### withFirebase

> `function(Component: ReactComponent) -> ReactComponent with props firebase`

This plugin also exports a React HOC `withFirebase`. Here is the same sample component but uses HOC instead of hook:

```jsx
import React from "react"
import { withFirebase } from "gatsby-plugin-firebase"
import MyData from "./MyData"

class MyComponent extends React.Component {
  state = { data: null }

  componentDidMount() {
    this.props.firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        this.setState({ data: snapshot.val() })
      })
  }

  render() {
    const { data } = this.state

    if (!data) {
      return null
    }

    return <MyData data={data} />
  }
}

export default withFirebase(MyComponent)
```

#### FirebaseContext

> `ReactContext`

`useFirebase` and `withFirebase` are syntactic sugar to access `firebase` instance inside `FirebaseContext`. You can use it directly like so:

```jsx
import React from "react"
import { FirebaseContext } from "gatsby-plugin-firebase"
import MyData from "./MyData"

function MyComponent({ firebase }) {
  const [data, setData] = React.useState()

  React.useEffect(() => {
    firebase
      .database()
      .ref("/data")
      .once("value")
      .then(snapshot => {
        setData(snapshot.val())
      })
  }, [firebase])

  if (!data) {
    return null
  }

  return <MyData data={data} />
}

export default props => (
  <FirebaseContext.Consumer>
    {firebase => <MyComponent {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
)
```

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
