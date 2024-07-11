"use client";

import React, { useRef, useState } from "react";
import { useAuth } from "@/contexts/auth.context";
import { v4 as uuidv4 } from "uuid";
import Modal from "../../_components/Modal";
import { useRouter } from "next/navigation";
import { createClient } from "@/supabase/client";

const supabase = createClient();

const FileButton = ({ onFileUpload }: { onFileUpload: () => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const { me } = useAuth();
  const router = useRouter();

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setIsUploadModalOpen(true);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile || !me) return;

    const fileName = `${uuidv4()}_${selectedFile.name}`;
    const { data, error } = await supabase.storage
      .from("uploads")
      .upload(`public/${fileName}`, selectedFile);

    if (error) {
      console.error("Error uploading file:", error);
      return;
    }

    const fileURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;

    const { error: insertError } = await supabase.from("file_uploads").insert([
      {
        fileURL,
        file_name: selectedFile.name,
        email: me.email,
      },
    ]);

    if (insertError) {
      console.error("Error saving file URL to database:", insertError);
    } else {
      setIsUploadModalOpen(false);
      setSelectedFile(null);
      onFileUpload(); // 파일 업로드 후 상태 업데이트 호출
    }
  };

  return (
    <div>
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
      <Modal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={handleFileUpload}
        title="파일을 업로드하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        confirmButtonColor="bg-blue-500"
      />
    </div>
  );
};

export default FileButton;
