"use client";

import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const PostInput = ({ addPost }) => {
  const [post, setPost] = useState('');

  const handlePost = () => {
    addPost(post);
    setPost('');
  };

  return (
    <Box className="space-y-4">
      <TextField
        fullWidth
        multiline
        rows={4}
        placeholder="나누고 싶은 생각을 공유해 보세요!"
        value={post}
        onChange={(e) => setPost(e.target.value)}
      />
      <Button color="primary" variant="contained" onClick={handlePost}>
        게시
      </Button>
    </Box>
  );
};

export default PostInput;
