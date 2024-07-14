"use client";

import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";
import { createClient } from "@/supabase/client";

interface DeletePostModalProps {
  open: boolean;
  handleClose: () => void;
  postId: string;
}

const DeletePostModal: React.FC<DeletePostModalProps> = ({
  open,
  handleClose,
  postId,
}) => {
  const supabase = createClient();

  const handleDelete = async () => {
    const { error: deleteError } = await supabase
      .from("community_post")
      .delete()
      .eq("id", postId);

    if (deleteError) {
      console.error("Error deleting post:", deleteError);
    } else {
      alert("해당 게시글이 삭제 되었습니다.");
      handleClose();
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg"
        style={{ minHeight: "150px", minWidth: "300px" }}
      >
        <div className="text-center">
          <Typography className="text-xl font-bold mb-4">
            게시물을 삭제 하시겠습니까?
          </Typography>
          <div className="flex justify-center space-x-4 mt-7">
            <Button
              onClick={handleClose}
              className="text-gray-500 border border-gray-300 rounded px-4 py-2"
            >
              취소
            </Button>
            <Button
              onClick={handleDelete}
              className="text-white bg-red-500 rounded px-4 py-2"
            >
              삭제
            </Button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default DeletePostModal;
