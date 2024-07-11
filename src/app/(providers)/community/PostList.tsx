import React, { useEffect, useState } from "react";
import { Database } from "@/supabase/database.types";
import { createClient } from "@/supabase/client";

interface PostListProps {
  posts: Database["public"]["Tables"]["community_post"]["Row"][];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [postUserData, setPostUserData] = useState<{ [key: string]: { nickname: string | null, email: string | null, imageUrl: string | null } }>({});

  const fetchUserData = async (userId: string) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("users")
      .select("nickname, email, imageUrl")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("Error fetching user data:", error);
      return { nickname: null, email: null, imageUrl: null };
    }
    return data;
  };

  useEffect(() => {
    const fetchAllUserData = async () => {
      const userData: { [key: string]: { nickname: string | null, email: string | null, imageUrl: string | null } } = {};
      for (const post of posts) {
        if (!post.user_id) continue;
        if (!userData[post.user_id]) {
          userData[post.user_id] = await fetchUserData(post.user_id);
        }
      }
      setPostUserData(userData);
    };

    fetchAllUserData();
  }, [posts]);

  console.log("Rendering posts:", posts);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow">
            <div className="flex items-center mb-2">
              <img
                src={postUserData[post.user_id]?.imageUrl || "/images/profile-placeholder.png"}
                alt="프로필"
                className="w-10 h-10 rounded-full mr-2"
              />
              <span className="text-gray-500">
                {postUserData[post.user_id]?.nickname || postUserData[post.user_id]?.email || "Unknown"}
              </span>
            </div>
            <div>
              <p className="text-gray-800">{post.comment}</p>
              {post.imageUrl && <img src={post.imageUrl} alt="게시글 이미지" className="mt-2 rounded" />}
            </div>
            <div className="text-gray-500 text-sm mt-2">
              {new Date(post.created_at).toLocaleString()}
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
