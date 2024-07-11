import { TanstackQueryProvider } from "@/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

import { AuthProvider } from "@/contexts/auth.context";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default RootLayout;
