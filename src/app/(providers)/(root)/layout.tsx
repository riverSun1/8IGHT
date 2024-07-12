import { PropsWithChildren } from "react";

import Header from "@/components/Header/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default RootLayout;
