"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: string;
  comment: string;
  imageUrl: string | null;
  created_at: string;
  user_id: string;
}

const PostList = ({ posts }: { posts: Post[] }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>게시된 글이 없습니다.</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="mb-4 p-4 border rounded shadow">
            <div className="flex items-center mb-2">
              <img src={post.profileImage || '/images/profile-placeholder.png'} alt="프로필" className="w-10 h-10 rounded-full mr-2" />
              <div className="text-gray-500">{post.user_id}</div>
            </div>
            <p>{post.comment}</p>
            {post.imageUrl && <img src={post.imageUrl} alt="포스트 이미지" className="mt-2 max-h-40 rounded-lg" />}
            <p className="text-gray-400 text-sm">{new Date(post.created_at).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
