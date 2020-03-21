import React from "react";
import { Location, globalHistory } from "@reach/router";
import { QueryParamProvider } from "use-query-params";

export default ({ children }) => (
  <Location>
    {({ location }) => (
      <QueryParamProvider location={location} reachHistory={globalHistory}>
        {children}
      </QueryParamProvider>
    )}
  </Location>
);
