"use client";

import React from "react";
import { useRouter } from "next/navigation";

const AddBtn = () => {
  const router = useRouter();

  return (
    <div
      className="border border-gray-300 bg-white p-4 rounded flex flex-col items-center justify-center w-60 h-48 cursor-pointer"
      onClick={() => router.push("/new-resume")}
    >
      <div className="text-gray-500 text-4xl mb-2">📝</div>
      <div className="text-lg font-semibold">새 이력서 작성</div>
    </div>
  );
};

export default AddBtn;
