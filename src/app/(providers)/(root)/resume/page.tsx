"use client";

import { useAuth } from "@/contexts/auth.context";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AddBtn from "../../(auth)/_components/AddBtn";
import FileButton from "../../(auth)/_components/FileButton";
import WorkBox from "../../(auth)/_components/WorkBox";
import { Tables } from "../../../../../types/supabase";
import Modal from "../../_components/Modal";

type ResumesType = Partial<Tables<"resumes">>;
type FileUploadsType = Partial<Tables<"file_uploads">>;
type WorkBoxType = ResumesType & FileUploadsType;

const supabase = createClient();

const ResumePage = () => {
  const { isLoggedIn, me } = useAuth();
  const router = useRouter();
  const [workBoxes, setWorkBoxes] = useState<any[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedBoxId, setSelectedBoxId] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/log-in");
    } else {
      fetchResumes();
      fetchFileUploads();
    }
  }, [isLoggedIn, me]);

  const fetchResumes = async () => {
    if (!me?.email) return;
    const { data, error } = await supabase
      .from("resumes")
      .select("*")
      .eq("email", me.email);

    if (error) {
      console.error("Error fetching resumes:", error);
    } else {
      setWorkBoxes(data);
    }
  };

  const fetchFileUploads = async () => {
    if (!me?.email) return;
    const { data, error } = await supabase
      .from("file_uploads")
      .select("*")
      .eq("email", me.email);

    if (error) {
      console.error("Error fetching file uploads:", error);
    } else {
      setWorkBoxes((prevBoxes) => [...prevBoxes, ...data]);
    }
  };

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
    setSelectedFile(file);
    setIsUploadModalOpen(true);
  };

  const confirmUpload = async () => {
    if (!selectedFile) return;

    const fileName = `${Date.now()}_${selectedFile.name}`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(`public/${fileName}`, selectedFile);

    if (uploadError) {
      console.error("Error uploading file:", uploadError);
    } else {
      const fileURL = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${fileName}`;
      const { data: insertData, error: insertError } = await supabase
        .from("file_uploads")
        .insert([
          {
            fileURL,
            file_name: selectedFile.name,
            email: me?.email ?? "",
          },
        ])
        .select();

      if (insertError) {
        console.error("Error saving file URL to database:", insertError);
      } else if (insertData && insertData.length > 0) {
        setWorkBoxes((prevBoxes) => [
          ...prevBoxes,
          {
            id: insertData[0].id,
            title: selectedFile.name,
            email: me?.email ?? "",
            fileURL,
            created_at: insertData[0].created_at,
          },
        ]);
        setIsUploadModalOpen(false);
        setSelectedFile(null);
      }
    }
  };

  const handleEdit = (id: string) => {
    router.push(`/new-resume?id=${id}`);
  };

  const handleDownload = (id: string) => {
    const workBox = workBoxes.find((box) => box.id === id);
    if (workBox && workBox.fileURL) {
      window.open(workBox.fileURL, "_blank");
    }
  };

  return (
    <div className="p-6 container mx-auto max-w-[1400px]">
      <h1 className="text-start text-2xl font-bold mb-5">이력서</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 p-2">
        <div className="m-0.5">
          <AddBtn />
        </div>
        <div className="m-0.5">
          <FileButton onFileUpload={handleFileUpload} />
        </div>
        {workBoxes.map((box) => (
          <div key={box.id} className="m-0.5">
            <WorkBox
              id={box.id}
              title={box.title || box.file_name || ""}
              date={box.created_at?.split("T")[0] || ""}
              onDelete={() => handleDelete(box.id)}
              onEdit={() => handleEdit(box.id)}
              onTitleClick={() => handleDownload(box.id)}
              isFileUpload={!!box.fileURL}
            />
          </div>
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
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onConfirm={confirmUpload}
        title="파일을 업로드하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        confirmButtonColor="bg-blue-500"
      />
    </div>
  );
};

export default ResumePage;
