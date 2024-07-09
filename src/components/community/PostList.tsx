"use client";

import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const PostList = ({ posts }) => {
  if (!posts.length) {
    return <p className="text-center text-gray-500">게시글이 없습니다.</p>;
  }

  return (
    <List>
      {posts.map((post, index) => (
        <ListItem key={index}>
          <ListItemText primary={post} />
        </ListItem>
      ))}
    </List>
  );
};

export default PostList;
