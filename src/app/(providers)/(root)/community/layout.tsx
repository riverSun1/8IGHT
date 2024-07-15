import { PropsWithChildren } from "react";
import SideBar from "./SideBar";

function CommunityLayout({ children }: PropsWithChildren) {
  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center">
        <div className="flex w-full max-w-7xl border border-gray-300">
          <SideBar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default CommunityLayout;
