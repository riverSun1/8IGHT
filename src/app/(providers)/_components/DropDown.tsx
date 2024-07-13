"use client";

import Link from "next/link";
import { RefObject } from "react";

export type DropDownData = {
  isLink: boolean;
  onClickFunc?: () => void;
  href?: string;
  text: string;
};

type DropDownProps = {
  datas: DropDownData[];
  isOpen: boolean;
  DropDownref: RefObject<HTMLDivElement>;
};

function DropDown({ datas, isOpen, DropDownref }: DropDownProps) {
  return (
    <div
      ref={DropDownref}
      className={`${
        isOpen ? "" : "hidden"
      } right-[0px] absolute bg-white border border-gray-300 rounded-md shadow-lg mt-1 z-50 w-32 overflow-y-auto max-h-80`}
    >
      <ul className="flex flex-col p-2">
        {datas.map((data) => (
          <>
            {data.isLink ? (
              <Link
                key={data.text}
                className="text-left hover:bg-gray-100 cursor-pointer p-2 text-base"
                href={data.href || ""}
              >
                {data.text}
              </Link>
            ) : (
              <button
                key={data.text}
                className="text-left hover:bg-gray-100 cursor-pointer p-2 text-base"
                onClick={() => {
                  data.onClickFunc && data.onClickFunc();
                }}
              >
                {data.text}
              </button>
            )}
          </>
        ))}
      </ul>
    </div>
  );
}

export default DropDown;
