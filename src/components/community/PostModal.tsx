"use client";

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const validationSchema = yup.object({
  postContent: yup.string().required('내용을 입력해 주세요'),
});

const PostModal = ({ open, handleClose, addPost }) => {
  const [profileImage, setProfileImage] = useState('/images/profile-placeholder.png');
  const [selectedImage, setSelectedImage] = useState(null);

  const formik = useFormik({
    initialValues: {
      postContent: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addPost({ ...values, profileImage, image: selectedImage });
      handleClose();
    },
  });

  useEffect(() => {
    formik.resetForm();
    setSelectedImage(null); // Reset selected image when modal opens
  }, [open]);

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    formik.handleChange(event);
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-[600px]" style={{ minHeight: '600px' }}>
        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="flex justify-between items-center">
            <Button onClick={handleClose} className="text-gray-500">취소</Button>
            <Button
              type="submit"
              className={`py-1 px-4 rounded ${formik.values.postContent ? 'text-blue-500' : 'text-gray-400'}`}
              disabled={!formik.values.postContent}
            >
              게시
            </Button>
          </div>
          <div className="flex items-center">
            <Avatar src={profileImage} alt="프로필" className="w-10 h-10 mr-2" />
            <div className="text-gray-500">로그인이 필요합니다.</div>
          </div>
          <div className="border border-gray-300 rounded-lg p-4 space-y-4">
            <div className="flex items-center">
              <input
                accept="image/*"
                style={{ display: 'none' }}
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
                <img src={selectedImage} alt="Selected" className="max-h-40 rounded-lg" />
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
  );
};

export default PostModal;
