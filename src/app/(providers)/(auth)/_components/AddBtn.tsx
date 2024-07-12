"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AddBtn = () => {
  const router = useRouter();

  return (
    <div
      className="border border-gray-300 bg-white p-4 rounded flex flex-col items-center justify-center w-60 h-48 cursor-pointer"
      onClick={() => router.push("/new-resume")}
    >
      <Image
        src="/new-resume.png"
        alt="new resume"
        width={48}
        height={48}
        className="mb-6"
      />
      <div className="text-lg font-semibold">새 이력서 작성</div>
    </div>
  );
};

export default AddBtn;
