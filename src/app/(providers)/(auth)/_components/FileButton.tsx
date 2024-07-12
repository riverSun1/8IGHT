import React from "react";

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
      <div className="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-4">
        <span className="text-gray-500">파일 업로드</span>
      </div>
    </label>
  );
};

export default FileButton;
