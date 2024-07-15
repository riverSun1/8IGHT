import { TanstackQueryProvider } from "@/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

import { AuthProvider } from "@/contexts/auth.context";
import { LoadingProvider } from "@/contexts/loading.context";
import { ModalProvider } from "@/contexts/modal.context";

function ProvidersLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      <AuthProvider>
        <LoadingProvider>
          <ModalProvider>{children}</ModalProvider>
        </LoadingProvider>
      </AuthProvider>
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default ProvidersLayout;
