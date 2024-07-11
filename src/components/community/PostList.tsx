import React from "react";
import { Database } from "@/supabase/database.types";

interface PostListProps {
  posts: Database["public"]["Tables"]["community_post"]["Row"][];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  console.log("Rendering posts:", posts);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-4 mb-4 rounded shadow">
            <div className="flex items-center mb-2">
              <img src="/images/profile-placeholder.png" alt="프로필" className="w-10 h-10 rounded-full mr-2" />
              <span className="text-gray-500">{post.user_id}</span>
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
