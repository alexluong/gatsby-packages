# gatsby-plugin-use-query-params

Drop in support for [`use-query-params`](https://www.npmjs.com/package/use-query-params)

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Installation](#installation)
- [Usage](#usage)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

```
npm install use-query-params gatsby-plugin-use-query-params
```

## Usage

### 1. Register plugin

In `gatsby-config.js`:

```js
module.exports = {
  plugins: [
    ...otherPlugins,

    "gatsby-plugin-use-query-params",
  ],
};
```

### 2. Use `use-query-params` package as usual. Here is [its documentation](https://github.com/pbeshai/use-query-params).

```jsx
import React from "react";
import { useQueryParam, NumberParam, StringParam } from "use-query-params";

const UseQueryParamExample = () => {
  // something like: ?x=123&foo=bar in the URL
  const [num, setNum] = useQueryParam("x", NumberParam);
  const [foo, setFoo] = useQueryParam("foo", StringParam);

  return (
    <div>
      <h1>num is {num}</h1>
      <button onClick={() => setNum(Math.random())}>Change</button>
      <h1>foo is {foo}</h1>
      <button onClick={() => setFoo(`str${Math.random()}`)}>Change</button>
    </div>
  );
};

export default UseQueryParamExample;
```

## License

MIT
