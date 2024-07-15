import React, { useState, useEffect, ChangeEvent } from "react";
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Avatar,
  Typography,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createClient } from "@/supabase/client";
import { useAuth } from "@/contexts/auth.context";

interface FormValues {
  postContent: string;
}

const validationSchema = yup.object({
  postContent: yup.string().required("내용을 입력해 주세요"),
});

interface PostModalProps {
  open: boolean;
  handleClose: () => void;
  addPost: (post: any) => void;
  refreshPosts: () => void;
}

const PostModal: React.FC<PostModalProps> = ({
  open,
  handleClose,
  addPost,
  refreshPosts,
}) => {
  const supabase = createClient();
  const { isLoggedIn, me, userData } = useAuth();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const formik = useFormik<FormValues>({
    initialValues: {
      postContent: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
      if (isLoggedIn) {
        try {
          let imageUrl = null;

          if (selectedImage) {
            const { data: uploadData, error: uploadError } = await supabase.storage
              .from("community-post-image")
              .upload(`${Date.now()}-${selectedImage.name}`, selectedImage);

            if (uploadError) {
              console.error("Error uploading image:", uploadError);
            } else {
              const { data: urlData } = supabase.storage
                .from("community-post-image")
                .getPublicUrl(uploadData.path);
              imageUrl = urlData.publicUrl;
            }
          }

          const { data, error } = await supabase
            .from("community_post")
            .insert({
              comment: values.postContent,
              imageUrl,
              user_id: me?.id,
            })
            .select("*");

          if (error) {
            console.error("Error creating post:", error);
          } else {
            if (data && data.length > 0) {
              addPost(data[0]);
            }
            setSuccessModalOpen(true);
          }
        } catch (error) {
          console.error("Error submitting the form", error);
        }
      } else {
        console.warn("로그인이 필요합니다.");
      }
      setSubmitting(false);
    },
  });

  useEffect(() => {
    formik.resetForm();
    setSelectedImage(null);
  }, [open]);

  const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(event);
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  const handleCancel = () => {
    setConfirmCancel(true);
  };

  const confirmCancelClose = () => {
    setConfirmCancel(false);
  };

  const confirmCancelExit = () => {
    setConfirmCancel(false);
    handleClose();
  };

  const handleSuccessClose = () => {
    setSuccessModalOpen(false);
    refreshPosts();
    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleCancel}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[600px]"
          style={{ minHeight: "600px" }}
        >
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            <div className="flex justify-between items-center">
              <Button onClick={handleCancel} className="text-gray-500">
                취소
              </Button>
              <Button
                type="submit"
                className={`py-1 px-4 rounded ${
                  formik.values.postContent && isLoggedIn
                    ? "text-blue-500"
                    : "text-gray-400"
                }`}
                disabled={!formik.values.postContent || !isLoggedIn}
              >
                게시
              </Button>
            </div>
            <div className="flex items-center">
              <Avatar
                src={
                  userData?.imageUrl || "/assets/images/profile-placeholder.png"
                }
                alt="프로필"
                className="w-12 h-12 rounded-full mr-4"
              />
              {isLoggedIn ? (
                <Typography className="text-gray-500">
                  {userData?.nickname || me?.email}
                </Typography>
              ) : (
                <Typography className="text-red-500">
                  로그인이 필요합니다.
                </Typography>
              )}
            </div>
            <div className="border border-gray-300 rounded-lg p-4 space-y-4">
              <div className="flex items-center">
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  id="file-upload"
                  type="file"
                  onChange={handleImageChange}
                />
                <label htmlFor="file-upload">
                  <IconButton component="span">
                    <PhotoCamera />
                  </IconButton>
                  <span className="ml-2 text-gray-500">이미지 추가</span>
                </label>
              </div>
              {selectedImage && (
                <div className="flex justify-center mb-4">
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected"
                    className="max-h-40 rounded-lg"
                  />
                </div>
              )}
              <TextField
                fullWidth
                id="postContent"
                name="postContent"
                placeholder="나누고 싶은 생각을 공유해 보세요!"
                multiline
                rows={6}
                value={formik.values.postContent}
                onChange={handleDescriptionChange}
                InputProps={{
                  disableUnderline: true,
                }}
              />
            </div>
          </form>
        </Box>
      </Modal>

      <Modal open={confirmCancel} onClose={confirmCancelClose}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg"
          style={{ minHeight: "150px", minWidth: "300px" }}
        >
          <div className="text-center">
            <Typography className="text-xl font-bold mb-4">
              글 작성을 중단하시겠습니까?
            </Typography>
            <div className="flex justify-center space-x-4 mt-7">
              <Button
                onClick={confirmCancelClose}
                className="text-gray-500 border border-gray-300 rounded px-4 py-2"
              >
                취소
              </Button>
              <Button
                onClick={confirmCancelExit}
                className="text-white bg-blue-500 rounded px-4 py-2"
              >
                나가기
              </Button>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={successModalOpen} onClose={handleSuccessClose}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg"
          style={{ minHeight: "150px", minWidth: "300px" }}
        >
          <div className="text-center">
            <Typography className="text-lg mb-4">
              글이 작성되었습니다!
            </Typography>
            <div className="flex justify-center space-x-4 mt-7">
              <Button
                onClick={handleSuccessClose}
                className="text-white bg-blue-500 rounded px-4 py-2"
              >
                확인
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default PostModal;
