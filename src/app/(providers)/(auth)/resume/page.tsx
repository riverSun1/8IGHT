"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AddBtn from "../_components/AddBtn";
import FileButton from "../_components/FileButton";
import WorkBox from "../_components/WorkBox";
import Modal from "../../_components/Modal";
import { createClient } from "@/supabase/client";
import { useAuth } from "@/contexts/auth.context"; // auth.context import

interface WorkBoxType {
  id: string;
  title: string;
  email: string;
  name: string;
  phone: string;
  created_at: string;
  career: string[];
  education: string[];
  skills: string[];
  awards: string[];
  introduction: string;
  links: string[];
}

const supabase = createClient();

const ResumePage = () => {
  const router = useRouter();
  const { isLoggedIn, me } = useAuth(); // auth context에서 로그인 상태와 사용자 정보 가져오기
  const [workBoxes, setWorkBoxes] = useState<WorkBoxType[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/log-in"); // 로그인하지 않은 경우 로그인 페이지로 이동
    } else {
      const fetchResumes = async () => {
        const { data, error } = await supabase
          .from("resumes")
          .select("*")
          .eq("user_id", me?.id); // 로그인한 사용자 데이터만 가져오기

        if (error) {
          console.error("Error fetching resumes:", error);
        } else {
          setWorkBoxes(data);
        }
      };

      fetchResumes();
    }
  }, [isLoggedIn, me, router]);

  const handleDelete = (id: string) => {
    setSelectedBoxId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (selectedBoxId) {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", selectedBoxId);

      if (error) {
        console.error("Error deleting resume:", error);
      } else {
        const newWorkBoxes = workBoxes.filter(
          (box) => box.id !== selectedBoxId
        );
        setWorkBoxes(newWorkBoxes);
        setIsDeleteModalOpen(false);
        setSelectedBoxId(null);
      }
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
        created_at: new Date().toISOString(),
        career: [""],
        education: [""],
        skills: [""],
        awards: [""],
        introduction: "",
        links: [""],
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
        const file = new Blob([JSON.stringify(workBox)], {
          type: "application/json",
        });
        element.href = URL.createObjectURL(file);
        element.download = `${workBox.title}.json`;
        document.body.appendChild(element);
        element.click();
        setIsDownloadModalOpen(false);
        setSelectedBoxId(null);
      }
    }
  };

  // isLoggedIn 상태를 확인하여 페이지 렌더링 여부 결정
  if (!isLoggedIn) return null;

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
            date={box.created_at.split("T")[0]}
            onDelete={() => handleDelete(box.id)}
            onEdit={() => handleEdit(box.id)}
            onTitleClick={() => handleDownload(box.id)}
            isFileUpload={false}
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
