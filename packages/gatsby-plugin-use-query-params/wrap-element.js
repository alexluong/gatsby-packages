import React from "react";
import { globalHistory } from "@reach/router";
import { QueryParamProvider } from "use-query-params";

// We get the location from the props.location
// https://www.gatsbyjs.com/docs/reference/config-files/gatsby-ssr#wrapPageElement
export const wrapPageElement = ({ element, props }) => (
  <QueryParamProvider location={props.location} reachHistory={globalHistory}>
    {element}
  </QueryParamProvider>
);
