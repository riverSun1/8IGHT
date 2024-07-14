"use client";

import React, { useState, useEffect } from "react";
import { createClient } from "@/supabase/client";
import { Database } from "@/supabase/types";
import { useQuery } from "@tanstack/react-query";
import PostList from "./PostList";
import PostModal from "./PostModal";
import SideBar from "./SideBar";

const CommunityPage: React.FC = () => {
  const supabase = createClient();
  const { data, isLoading, error, refetch } = useQuery({
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

  const [posts, setPosts] = useState<
    (Database["public"]["Tables"]["community_post"]["Row"] & { like: number | null })[]
  >([]);

  useEffect(() => {
    if (data) {
      const formattedData = data.map((post) => ({
        ...post,
        user_id: post.user_id || "", 
        created_at: post.created_at || "", 
      }));
      setPosts(formattedData);
    }
  }, [data]);

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
        <div className="flex w-full max-w-5xl">
          <SideBar />
          <main className="flex-1 p-4 bg-white h-screen overflow-hidden border-l border-gray-300">
            <div className="sticky top-0 z-10 bg-white">
              <div className="mb-4 border-b border-gray-300 pb-4">
                <div
                  className="flex items-center cursor-pointer bg-white p-4 rounded shadow"
                  onClick={handlePostOpen}
                >
                  <img
                    src="/assets/images/profile-placeholder.png"
                    alt="프로필"
                    className="w-10 h-10 rounded-full mr-2"
                  />
                  <span className="text-gray-500">
                    나누고 싶은 생각을 공유해 보세요!
                  </span>
                </div>
              </div>
            </div>
            <div className="pt-4 h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <PostList posts={posts} setPosts={setPosts} />
              )}
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
