"use client";

import Link from "next/link";
import React from "react";

const AddBtn = () => {
  return (
    <Link href="/new-resume">
      <div className="border border-gray-300 bg-white p-4 rounded flex flex-col items-center justify-center w-48 h-48 cursor-pointer">
        <div className="text-blue-500 text-4xl mb-2">📝</div>
        <div className="text-lg font-semibold">새 이력서 작성</div>
      </div>
    </Link>
  );
};

export default AddBtn;
