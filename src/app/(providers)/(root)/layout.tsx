import { PropsWithChildren } from "react";

import Header from "@/components/Header/Header";
import RootHeader from "../_components/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      <RootHeader />
      {children}
    </>
  );
}

export default RootLayout;
