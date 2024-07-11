import React, { Children } from "react";
import RootHeader from "../_components/Header";
import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <RootHeader />
      {children}
    </>
  );
}

export default RootLayout;
