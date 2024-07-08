import { TanstackQueryProvider } from "@/query/queryClient";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PropsWithChildren } from "react";

function RootLayout({ children }: PropsWithChildren) {
  return (
    <TanstackQueryProvider>
      {children}
      <ReactQueryDevtools />
    </TanstackQueryProvider>
  );
}

export default RootLayout;
