import { TanstackQueryProvider } from "@/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

import { AuthProvider } from "@/contexts/auth.context";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
