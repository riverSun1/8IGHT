"use client";

import React, { useState, useEffect } from 'react';
import { Modal, Box, TextField, Button, Avatar, IconButton } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import PhotoCamera from '@mui/icons-material/PhotoCamera';

const validationSchema = yup.object({
  teamName: yup.string().required('팀 이름은 필수입니다'),
  teamDescription: yup.string().required('한 줄 소개는 필수입니다').max(150, '한 줄 소개는 150자 이하로 작성해주세요'),
});

const TeamModal = ({ open, handleClose, addTeam }) => {
  const [profileImage, setProfileImage] = useState('/images/profile-placeholder.png');
  const [charCount, setCharCount] = useState(0);

  const formik = useFormik({
    initialValues: {
      teamName: '',
      teamDescription: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      addTeam({ ...values, profileImage });
      handleClose();
    },
  });

  useEffect(() => {
    formik.resetForm();
    setProfileImage('/images/profile-placeholder.png');
    setCharCount(0);
  }, [open]);

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setProfileImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    if (value.length <= 150) {
      formik.handleChange(event);
      setCharCount(value.length);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-96" style={{ minHeight: '700px' }}>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="text-center text-xl font-semibold">팀 생성</div>
          <div className="flex justify-center relative">
            <Avatar src={profileImage} alt="프로필" className="w-20 h-20" />
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="profile-image-upload"
              type="file"
              onChange={handleImageChange}
            />
            <label htmlFor="profile-image-upload">
              <IconButton component="span" className="absolute bottom-0 right-0">
                <PhotoCamera />
              </IconButton>
            </label>
          </div>
          <TextField
            fullWidth
            id="teamName"
            name="teamName"
            label="팀 이름(필수)"
            placeholder="한글 / 영어 / 숫자만 가능"
            value={formik.values.teamName}
            onChange={formik.handleChange}
            error={formik.touched.teamName && Boolean(formik.errors.teamName)}
            helperText={formik.touched.teamName && formik.errors.teamName}
          />
          <TextField
            fullWidth
            id="teamDescription"
            name="teamDescription"
            label="한 줄 소개(필수)"
            placeholder="팀 프로필 소개를 입력해 주세요"
            multiline
            rows={4}
            value={formik.values.teamDescription}
            onChange={handleDescriptionChange}
            error={formik.touched.teamDescription && Boolean(formik.errors.teamDescription)}
            helperText={formik.touched.teamDescription && formik.errors.teamDescription}
          />
          <div className="text-right text-gray-500">{charCount}/150</div>
          <Button
            className={`w-full py-2 px-4 rounded-lg ${!formik.isValid || formik.values.teamName === '' || formik.values.teamDescription === '' ? 'text-gray-400 bg-white border border-gray-400' : 'text-blue-500 bg-white border border-blue-500 hover:bg-gray-100'}`}
            type="submit"
            disabled={!formik.isValid || formik.values.teamName === '' || formik.values.teamDescription === ''}
          >
            팀 만들기
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default TeamModal;
