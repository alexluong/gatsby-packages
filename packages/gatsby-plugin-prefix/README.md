# gatsby-plugin-prefix

Use prefix today, save time tomorrow

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [Usage](#usage)
- [API](#api)
  - [usePrefix](#useprefix)
  - [Use Gatsby Node](#use-gatsby-node)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install gatsby-plugin-prefix
```

## Usage

1. Register plugin

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    {
      resolve: "gatsby-plugin-prefix",
      options: {
        tag: "tags",
        category: "categories",
        blog: "articles",
      },
    },
  ],
};
```

## API

### usePrefix

> `function() -> obj`

This is a React hook that gives you access to the prefix objects that you declared when registering the plugin.

```js
function MyComponent() {
  const { tag, category, blog } = usePrefix();

  console.log(tag); // --> tags
  console.log(category); // --> categories
  console.log(blog); // --> articles

  return <>{...}</>
}
```

### Use Gatsby Node

This plugin creates a `Prefix` Gatsby node type. When working inside Gatsby lifecycle (`createPages`, `sourceNodes`, etc), you can run a Gatsby GraphQL to get the prefix data:

```graphql
query {
  allPrefix {
    nodes {
      name
      value
    }
  }
}
```

## License

MIT
