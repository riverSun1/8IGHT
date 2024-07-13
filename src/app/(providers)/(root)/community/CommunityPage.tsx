"use client";

import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import PostModal from "./PostModal";
import PostList from "./PostList";
import { createClient } from "@/supabase/client";
import { Database } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";

const CommunityPage: React.FC = () => {
  const supabase = createClient();

  const {
    data: posts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    //API 파일에 route.ts로 만들어야 됩니다.
    queryKey: ["posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("community_post")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) {
        console.error("Error fetching posts:", error);
      }
      return data || [];
    },
  });

  const [postModalOpen, setPostModalOpen] = useState(false);

  const handlePostOpen = () => setPostModalOpen(true);
  const handlePostClose = () => setPostModalOpen(false);

  const addPost = (
    post: Database["public"]["Tables"]["community_post"]["Row"]
  ) => {
    refetch();
  };

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
              {isLoading ? <p>Loading...</p> : <PostList posts={posts} />}
            </div>
          </main>
        </div>
      </div>
      <PostModal
        open={postModalOpen}
        handleClose={handlePostClose}
        addPost={addPost}
        refreshPosts={refetch}
      />
    </div>
  );
};

export default CommunityPage;
