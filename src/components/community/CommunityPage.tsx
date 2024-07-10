"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SideBar from "./SideBar";
import PostModal from "./PostModal";
import PostList from "./PostList";

const CommunityPage = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [postModalOpen, setPostModalOpen] = useState(false);

  const handlePostOpen = () => setPostModalOpen(true);
  const handlePostClose = () => setPostModalOpen(false);

  const addPost = (post: any) => {
    setPosts([post, ...posts]);
  };

  const fetchPosts = async () => {
    try {
      const response = await axios.get("/api/auth/post");
      if (response.status === 200) {
        setPosts(response.data);
      } else {
        console.error(
          "Error fetching posts:",
          response.status,
          response.statusText
        );
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="flex justify-center">
        <div className="flex w-full max-w-7xl border border-gray-300">
          <SideBar />
          <main className="w-3/4 p-4 bg-white h-screen overflow-auto border-l border-gray-300">
            <div className="mb-4 border-b border-gray-300 pb-4">
              <div
                className="flex items-center cursor-pointer bg-white p-4 rounded shadow"
                onClick={handlePostOpen}
              >
                <img
                  src="/images/profile-placeholder.png"
                  alt="프로필"
                  className="w-10 h-10 rounded-full mr-2"
                />
                <span className="text-gray-500">
                  나누고 싶은 생각을 공유해 보세요!
                </span>
              </div>
            </div>
            <div className="pt-4">
              <PostList posts={posts} />
            </div>
          </main>
        </div>
      </div>
      <PostModal
        open={postModalOpen}
        handleClose={handlePostClose}
        addPost={addPost}
      />
    </div>
  );
};

export default CommunityPage;
