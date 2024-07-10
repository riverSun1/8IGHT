"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddBtn from "../_components/AddBtn";
import FileButton from "../_components/FileButton";
import WorkBox from "../_components/WorkBox";
import Modal from "../../_components/Modal";

interface WorkBoxType {
  id: string;
  name: string;
  email: string;
  phone: string;
  experience: string;
  isFileUpload: boolean;
  title: string;
}

const ResumePage = () => {
  const router = useRouter();
  const [workBoxes, setWorkBoxes] = useState<WorkBoxType[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  useEffect(() => {
    const storedWorkBoxes = JSON.parse(localStorage.getItem("resumes") || "[]");
    setWorkBoxes(storedWorkBoxes);
  }, []);

  const handleDelete = (id: string) => {
    setSelectedBoxId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedBoxId) {
      const newWorkBoxes = workBoxes.filter((box) => box.id !== selectedBoxId);
      setWorkBoxes(newWorkBoxes);
      localStorage.setItem("resumes", JSON.stringify(newWorkBoxes));
      setIsDeleteModalOpen(false);
      setSelectedBoxId(null);
    }
  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const newWorkBox = {
        id: new Date().toISOString(),
        name: file.name,
        email: "",
        phone: "",
        experience: "",
        isFileUpload: true,
        title: file.name,
      };
      setWorkBoxes((prev) => {
        const updatedWorkBoxes = [...prev, newWorkBox];
        localStorage.setItem("resumes", JSON.stringify(updatedWorkBoxes));
        return updatedWorkBoxes;
      });
    };
    reader.readAsText(file);
  };

  const handleEdit = (id: string) => {
    router.push(`/new-resume?id=${id}`);
  };

  const handleDownload = (id: string) => {
    setSelectedBoxId(id);
    setIsDownloadModalOpen(true);
  };

  const confirmDownload = () => {
    if (selectedBoxId) {
      const workBox = workBoxes.find((box) => box.id === selectedBoxId);
      if (workBox) {
        const element = document.createElement("a");
        const file = new Blob([workBox.experience], { type: "text/plain" });
        element.href = URL.createObjectURL(file);
        element.download = workBox.name;
        document.body.appendChild(element);
        element.click();
        setIsDownloadModalOpen(false);
        setSelectedBoxId(null);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex flex-wrap gap-1.5">
        <AddBtn />
        <FileButton onFileUpload={handleFileUpload} />
        {workBoxes.map((box) => (
          <WorkBox
            key={box.id}
            id={box.id}
            title={box.title}
            date={new Date().toISOString().split("T")[0]}
            onDelete={() => handleDelete(box.id)}
            onEdit={() => handleEdit(box.id)}
            onTitleClick={
              box.isFileUpload ? () => handleDownload(box.id) : undefined
            }
            isFileUpload={box.isFileUpload}
          />
        ))}
      </div>
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="정말 삭제하시겠습니까?"
        confirmText="삭제"
        cancelText="취소"
        confirmButtonColor="bg-red-500"
      />
      <Modal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        onConfirm={confirmDownload}
        title="파일을 다운로드 하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        confirmButtonColor="bg-blue-500"
      />
    </div>
  );
};

export default ResumePage;
