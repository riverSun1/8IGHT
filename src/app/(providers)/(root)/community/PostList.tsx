import React, { useEffect, useState } from "react";
import { Database } from "@/supabase/types";
import { createClient } from "@/supabase/client";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import CommentIcon from "@mui/icons-material/Comment";
import CommentModal from "./CommentModal";

interface PostListProps {
  posts: Database["public"]["Tables"]["community_post"]["Row"][];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const supabase = createClient();
  const [postUserData, setPostUserData] = useState<{
    [key: string]: {
      nickname: string | null;
      email: string | null;
      imageUrl: string | null;
    };
  }>({});
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [commentModalOpen, setCommentModalOpen] = useState<string | null>(null);

  const fetchUserData = async (userId: string) => {
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
      const userData: {
        [key: string]: {
          nickname: string | null;
          email: string | null;
          imageUrl: string | null;
        };
      } = {};
      const likesData: { [key: string]: number } = {};
      for (const post of posts) {
        if (!post.user_id) continue;
        if (!userData[post.user_id]) {
          userData[post.user_id] = await fetchUserData(post.user_id);
        }
        likesData[post.id] = post.like || 0;
      }
      setPostUserData(userData);
      setLikes(likesData);
    };

    fetchAllUserData();
  }, [posts]);

  const handleLike = async (postId: string) => {
    try {
      const { data, error } = await supabase.rpc("increment_like", {
        post_id: postId,
      });
      if (error) {
        throw error;
      }

      const newLikeCount = data?.new_like_count || 0;
      setLikes((prevLikes) => ({
        ...prevLikes,
        [postId]: newLikeCount,
      }));
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleComment = (postId: string) => {
    setCommentModalOpen(postId);
  };

  const handleCommentModalClose = () => {
    setCommentModalOpen(null);
  };

  console.log("Rendering posts:", posts);

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="border p-6 mb-6 rounded-lg shadow-lg bg-white">
            <div className="flex items-center mb-4">
              <img
                src={postUserData[post.user_id]?.imageUrl || "/assets/images/profile-placeholder.png"}
                alt="프로필"
                className="w-12 h-12 rounded-full mr-4"
              />
              <span className="text-lg font-semibold text-gray-800">
                {postUserData[post.user_id]?.nickname || postUserData[post.user_id]?.email || "Unknown"}
              </span>
            </div>
            <div className="mb-4">
              <p className="text-gray-800">{post.comment}</p>
              {post.imageUrl && (
                <img
                  src={post.imageUrl}
                  alt="게시글 이미지"
                  className="mt-4 rounded-lg"
                />
              )}
            </div>
            <div className="text-gray-500 text-sm mb-4">
              {new Date(post.created_at).toLocaleString()}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="flex items-center text-gray-500 hover:text-blue-500 transition"
                onClick={() => handleLike(post.id)}
              >
                <ThumbUpIcon className="mr-1" /> 좋아요 {likes[post.id] || 0}
              </button>
              <button
                className="flex items-center text-gray-500 hover:text-blue-500 transition"
                onClick={() => handleComment(post.id)}
              >
                <CommentIcon className="mr-1" /> 댓글
              </button>
            </div>
          </div>
        ))
      )}
      {commentModalOpen && (
        <CommentModal
          open={!!commentModalOpen}
          handleClose={handleCommentModalClose}
          postId={commentModalOpen}
        />
      )}
    </div>
  );
};

export default PostList;
