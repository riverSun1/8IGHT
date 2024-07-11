"use client";

import { PropsWithChildren, useEffect, useState } from "react";

export type AuthButton = {
  isAllOk: boolean;
  onClick: () => void;
};

function AuthButton({
  children,
  isAllOk,
  onClick,
}: PropsWithChildren<AuthButton>) {
  const [disabled, setDisabled] = useState<boolean>(true);

  useEffect(() => {
    setDisabled(!isAllOk);
  }, [isAllOk]);

  return (
    <button
      onClick={() => onClick}
      disabled={disabled}
      className={`${
        disabled ? "bg-[#f4f4fe] text-[#d9d9d9]" : "bg-blue-600 text-white"
      } h-[50px] rounded-[10px]`}
    >
      {children}
    </button>
  );
}

export default AuthButton;
