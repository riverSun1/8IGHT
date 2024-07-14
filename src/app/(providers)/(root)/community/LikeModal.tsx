"use client";

import React, { useState } from "react";
import { Modal, Box, Avatar, Typography, Button } from "@mui/material";
import { Database } from "@/supabase/types";

interface LikeModalProps {
  open: boolean;
  handleClose: () => void;
  post: Database["public"]["Tables"]["community_post"]["Row"];
  likeUsers: {
    nickname: string | null;
    email: string | null;
    imageUrl: string | null;
  }[];
  postUserData:
    | { nickname: string | null; email: string | null; imageUrl: string | null }
    | undefined;
}

const LikeModal: React.FC<LikeModalProps> = ({
  open,
  handleClose,
  post,
  likeUsers,
  postUserData,
}) => {
  const postUserNickname =
    postUserData?.nickname || postUserData?.email || "Unknown";
  const postUserImageUrl =
    postUserData?.imageUrl || "/assets/images/profile-placeholder.png";

  const [showFullComment, setShowFullComment] = useState(false);

  const handleToggleComment = () => {
    setShowFullComment(!showFullComment);
  };

  const truncatedComment =
    post.comment.length > 100 && !showFullComment
      ? post.comment.substring(0, 100) + "..."
      : post.comment;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[600px]">
        <div className="mb-4">
          <div className="flex items-center mb-4">
            <Avatar
              src={postUserImageUrl}
              alt="프로필"
              className="w-10 h-10 rounded-full mr-4"
            />
            <Typography variant="h6" className="font-bold">
              {postUserNickname}
            </Typography>
          </div>
          <Typography variant="h6" className="font-bold">
            {truncatedComment}
          </Typography>
          {post.comment.length > 50 && (
            <Button onClick={handleToggleComment} className="text-blue-500">
              {showFullComment ? "간략히" : "더 보기"}
            </Button>
          )}
          {post.imageUrl && (
            <img
              src={post.imageUrl}
              alt="게시글 이미지"
              className="mt-4 rounded-lg"
            />
          )}
        </div>
        <div className="mb-4">
          <Typography variant="subtitle1" className="font-semibold">
            좋아요 {likeUsers.length}개
          </Typography>
        </div>
        <div className="space-y-4">
          {likeUsers.map((user, index) => (
            <div key={index} className="flex items-center">
              <Avatar
                src={user.imageUrl || "/assets/images/profile-placeholder.png"}
                alt="프로필"
                className="w-10 h-10 rounded-full mr-4"
              />
              <Typography>{user.nickname || user.email}</Typography>
            </div>
          ))}
        </div>
        <div className="flex justify-end mt-6">
          <Button onClick={handleClose} className="text-blue-500">
            닫기
          </Button>
        </div>
      </Box>
    </Modal>
  );
};

export default LikeModal;
