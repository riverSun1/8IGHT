import { TanstackQueryProvider } from "@/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

import { AuthProvider } from "@/contexts/auth.context";
import RootHeader from "./_components/Header";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <RootHeader />
        {children}
      </AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default RootLayout;
