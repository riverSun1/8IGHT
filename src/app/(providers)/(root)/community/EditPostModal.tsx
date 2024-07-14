import React, { useState, useEffect, ChangeEvent } from "react";
import { Modal, Box, TextField, Button, IconButton } from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as yup from "yup";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { createClient } from "@/supabase/client";
import { Database } from "@/supabase/types";

interface FormValues {
  postContent: string;
}

const validationSchema = yup.object({
  postContent: yup.string().required("내용을 입력해 주세요"),
});

interface EditPostModalProps {
  open: boolean;
  handleClose: () => void;
  postId: string;
  onPostUpdated: (
    updatedPost: Database["public"]["Tables"]["community_post"]["Row"]
  ) => void;
}

const EditPostModal: React.FC<EditPostModalProps> = ({
  open,
  handleClose,
  postId,
  onPostUpdated,
}) => {
  const supabase = createClient();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [initialContent, setInitialContent] = useState<string>("");
  const [initialImage, setInitialImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("community_post")
        .select("*")
        .eq("id", postId)
        .single();

      if (error) {
        console.error("Error fetching post:", error);
      } else {
        setInitialContent(data.comment);
        setInitialImage(data.imageUrl);
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId, supabase]);

  const formik = useFormik<FormValues>({
    initialValues: {
      postContent: initialContent,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }: FormikHelpers<FormValues>) => {
      let imageUrl = initialImage;
      if (selectedImage) {
        const fileName = `${Date.now()}-${selectedImage.name}`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("community-post-image")
          .upload(fileName, selectedImage, {
            upsert: true,
          });

        if (uploadError) {
          console.error("Error uploading image:", uploadError);
        } else {
          const { data: urlData } = supabase.storage
            .from("community-post-image")
            .getPublicUrl(fileName);
          imageUrl = urlData.publicUrl;
        }
      }

      const { data: updatedPost, error: updateError } = await supabase
        .from("community_post")
        .update({
          comment: values.postContent,
          imageUrl,
        })
        .eq("id", postId)
        .select("*")
        .single();

      if (updateError) {
        console.error("Error updating post:", updateError);
      } else {
        const formattedPost = {
          ...updatedPost,
          user_id: updatedPost.user_id || "", // user_id가 null인 경우 빈 문자열로 처리
          created_at: updatedPost.created_at || "", // created_at이 null인 경우 빈 문자열로 처리
        };
        onPostUpdated(formattedPost as Database["public"]["Tables"]["community_post"]["Row"]);
        alert("수정 되었습니다!");
        handleClose();
      }
      setSubmitting(false);
    },
  });

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0]);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-lg shadow-xl w-[600px]"
        style={{ minHeight: "600px" }}
      >
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <Button onClick={handleClose} className="text-gray-500">
              취소
            </Button>
            <Button
              type="submit"
              className={`py-1 px-4 rounded ${
                formik.values.postContent ? "text-blue-500" : "text-gray-400"
              }`}
              disabled={!formik.values.postContent}
            >
              수정
            </Button>
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
                <span className="ml-2 text-gray-500">이미지 변경</span>
              </label>
            </div>
            {selectedImage ? (
              <div className="flex justify-center mb-4">
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  className="max-h-40 rounded-lg"
                />
              </div>
            ) : (
              initialImage && (
                <div className="flex justify-center mb-4">
                  <img
                    src={initialImage}
                    alt="Current"
                    className="max-h-40 rounded-lg"
                  />
                </div>
              )
            )}
            <TextField
              fullWidth
              id="postContent"
              name="postContent"
              placeholder="내용을 입력해 주세요."
              multiline
              rows={6}
              value={formik.values.postContent}
              onChange={formik.handleChange}
              InputProps={{
                disableUnderline: true,
              }}
            />
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default EditPostModal;
