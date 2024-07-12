import React from "react";
import Image from "next/image";

interface FileButtonProps {
  onFileUpload: (file: File) => void;
}

const FileButton: React.FC<FileButtonProps> = ({ onFileUpload }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files[0]);
    }
  };

  return (
    <label className="cursor-pointer">
      <input type="file" onChange={handleFileChange} className="hidden" />
      <div className="border border-gray-300 bg-white p-4 rounded flex flex-col items-center justify-center w-60 h-48 cursor-pointer">
        <Image
          src="/file-upload.png"
          alt="File Upload Icon"
          width={60}
          height={60}
          className="mb-4"
        />
        <div className="text-lg font-semibold ">파일 업로드</div>
      </div>
    </label>
  );
};

export default FileButton;
