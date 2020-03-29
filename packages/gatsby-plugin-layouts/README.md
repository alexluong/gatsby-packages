# gatsby-plugin-layouts

Never write `wrapPageElement` or `wrapRootElement` again

## Notes

For theme/plugin authors, please don't use this plugin as the layout components may be shadowed by the users of your library.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
  - [1. Register plugin](#1-register-plugin)
  - [2. Shadow the layout components](#2-shadow-the-layout-components)
    - [a. To create PageLayout](#a-to-create-pagelayout)
    - [a. To create RootLayout](#a-to-create-rootlayout)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install gatsby-plugin-layouts
```

## Usage

### 1. Register plugin

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    "gatsby-plugin-layouts",
  ],
};
```

### 2. Shadow the layout components

#### a. To create PageLayout

Create `src/gatsby-plugin-layouts/page.layout.js`:

```jsx
import React from "react";
import Layout from "../components/Layout";

const PageLayout = ({ children }) => {
  return (
    <Layout>
      {children}
    </Layout>
  );
};

export const BrowserPageLayout = PageLayout;
export const SsrPageLayout = PageLayout;
```

#### a. To create RootLayout

Create `src/gatsby-plugin-layouts/root.layout.js`:

```jsx
import React from "react";
import { ThemeProvider } from "emotion-theming";

const RootLayout = ({ children }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export const BrowserRootLayout = RootLayout;
export const SsrRootLayout = RootLayout;
```

## License

MIT
