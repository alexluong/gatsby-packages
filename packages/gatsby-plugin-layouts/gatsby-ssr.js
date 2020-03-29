import React from "react";
import { SsrPageLayout } from "./src/page.layout";
import { SsrRootLayout } from "./src/root.layout";

export const wrapPageElement = ({ element, props }) => {
  return <SsrPageLayout {...props}>{element}</SsrPageLayout>;
};

export const wrapRootElement = ({ element, props }) => {
  return <SsrRootLayout {...props}>{element}</SsrRootLayout>;
};
