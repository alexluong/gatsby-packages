import React from "react"
import Layout from "./src"

export const wrapRootElement = ({ element, props }, pluginOptions) => (
  <Layout {...props} features={pluginOptions.features}>
    {element}
  </Layout>
)
