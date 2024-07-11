import { PropsWithChildren } from "react";

function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="relative w-full h-full overflow-y-auto flex justify-center px-[10px]">
      <div className="mt-20 min-w-[300px] max-w-[400px] w-full">{children}</div>
    </div>
  );
}

export default AuthLayout;
