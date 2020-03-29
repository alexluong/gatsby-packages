import React from "react";
import { BrowserPageLayout } from "./src/page.layout";
import { BrowserRootLayout } from "./src/root.layout";

export const wrapPageElement = ({ element, props }) => {
  return <BrowserPageLayout {...props}>{element}</BrowserPageLayout>;
};

export const wrapRootElement = ({ element, props }) => {
  return <BrowserRootLayout {...props}>{element}</BrowserRootLayout>;
};
