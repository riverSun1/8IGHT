import React, { useEffect, useState } from "react";
import { Database } from "@/supabase/types";
import { createClient } from "@/supabase/client";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';
import CommentModal from "./CommentModal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PostListProps {
  posts: Database["public"]["Tables"]["community_post"]["Row"][];
}

const PostList: React.FC<PostListProps> = ({ posts }) => {
  const [postUserData, setPostUserData] = useState<{ [key: string]: { nickname: string | null, email: string | null, imageUrl: string | null } }>({});
  const [commentModalOpen, setCommentModalOpen] = useState<string | null>(null);
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: async (postId: string) => {
      const supabase = createClient();

      // Get current like count
      const { data: postData, error: fetchError } = await supabase
        .from("community_post")
        .select("like")
        .eq("id", postId)
        .single();

      if (fetchError || !postData) {
        throw fetchError;
      }

      // Increment like count
      const newLikeCount = (postData.like || 0) + 1;

      const { error: updateError } = await supabase
        .from("community_post")
        .update({ like: newLikeCount })
        .eq("id", postId);

      if (updateError) {
        throw updateError;
      }

      return newLikeCount;
    },
    onSuccess: (newLikeCount, postId) => {
      queryClient.setQueryData(["posts"], (oldData: any) =>
        oldData.map((post: any) =>
          post.id === postId ? { ...post, like: newLikeCount } : post
        )
      );
    },
  });

  const handleLike = (postId: string) => {
    mutation.mutate(postId);
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
            <div className="flex justify-end mt-4 space-x-4">
              <button
                className="flex items-center text-gray-500 hover:text-blue-500 transition"
                onClick={() => handleLike(post.id)}
              >
                <ThumbUpIcon className="mr-1" /> 좋아요 {post.like || 0}
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
