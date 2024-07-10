"use client";

import React, { useRef } from "react";

const FileButton = ({
  onFileUpload,
}: {
  onFileUpload: (file: File) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onFileUpload(event.target.files[0]);
    }
  };

  return (
    <div
      className="border border-gray-300 bg-white p-4 rounded flex flex-col items-center justify-center w-48 h-48 cursor-pointer"
      onClick={handleClick}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".doc,.docx,.pdf,.txt"
      />
      <div className="text-gray-500 text-4xl mb-2">⬆️</div>
      <div className="text-lg font-semibold">파일 업로드</div>
    </div>
  );
};

export default FileButton;
