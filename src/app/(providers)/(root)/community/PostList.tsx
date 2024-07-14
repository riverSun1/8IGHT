import React, { useEffect, useState } from "react";
import { Database } from "@/supabase/types";
import { createClient } from "@/supabase/client";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import LikeModal from "./LikeModal";
import EditPostModal from "./EditPostModal";
import { useAuth } from "@/contexts/auth.context";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

interface PostListProps {
  posts: Database["public"]["Tables"]["community_post"]["Row"][];
  setPosts: React.Dispatch<
    React.SetStateAction<
      Database["public"]["Tables"]["community_post"]["Row"][]
    >
  >;
}

const PostList: React.FC<PostListProps> = ({ posts, setPosts }) => {
  const supabase = createClient();
  const { isLoggedIn, me } = useAuth();
  const [postUserData, setPostUserData] = useState<{
    [key: string]: {
      nickname: string | null;
      email: string | null;
      imageUrl: string | null;
    };
  }>({});
  const [likes, setLikes] = useState<{ [key: string]: number }>({});
  const [likedPosts, setLikedPosts] = useState<{ [key: string]: boolean }>({});
  const [likeModalOpen, setLikeModalOpen] = useState<string | null>(null);
  const [likeUsers, setLikeUsers] = useState<
    { nickname: string | null; email: string | null; imageUrl: string | null }[]
  >([]);
  const [expandedPosts, setExpandedPosts] = useState<{
    [key: string]: boolean;
  }>({});
  const [editPost, setEditPost] = useState<string | null>(null);

  useEffect(() => {
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

    const fetchAllUserData = async () => {
      const userData: {
        [key: string]: {
          nickname: string | null;
          email: string | null;
          imageUrl: string | null;
        };
      } = {};
      const likesData: { [key: string]: number } = {};
      const likedPostsData: { [key: string]: boolean } = {};

      for (const post of posts) {
        if (!post.user_id) continue;
        if (!userData[post.user_id]) {
          const user = await fetchUserData(post.user_id);
          userData[post.user_id] = user;
        }
        const { count, error: countError } = await supabase
          .from("post_likes")
          .select("*", { count: "exact" })
          .eq("post_id", post.id);
        if (countError) {
          console.error("Error fetching like count:", countError);
        }
        likesData[post.id] = count || 0;

        if (isLoggedIn && me) {
          const { data: likeData, error: likeError } = await supabase
            .from("post_likes")
            .select("*")
            .eq("post_id", post.id)
            .eq("user_id", me.id)
            .single();
          if (likeError && likeError.code !== "PGRST116") {
            console.error("Error checking like status:", likeError);
          }
          likedPostsData[post.id] = !!likeData;
        }
      }
      setPostUserData(userData);
      setLikes(likesData);
      setLikedPosts(likedPostsData);
    };

    fetchAllUserData();
  }, [posts, isLoggedIn, me]);

  const handleLike = async (postId: string) => {
    if (!isLoggedIn) {
      window.location.href = "/log-in";
      return;
    }

    try {
      const isLiked = likedPosts[postId];

      if (isLiked) {
        const { error: deleteError } = await supabase
          .from("post_likes")
          .delete()
          .eq("post_id", postId)
          .eq("user_id", me?.id);

        if (deleteError) {
          throw deleteError;
        }

        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) - 1,
        }));
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [postId]: false,
        }));
      } else {
        const { error: insertError } = await supabase
          .from("post_likes")
          .insert({
            post_id: postId,
            user_id: me?.id,
          });

        if (insertError) {
          throw insertError;
        }

        setLikes((prevLikes) => ({
          ...prevLikes,
          [postId]: (prevLikes[postId] || 0) + 1,
        }));
        setLikedPosts((prevLikedPosts) => ({
          ...prevLikedPosts,
          [postId]: true,
        }));
      }
    } catch (error) {
      console.error("Error updating like count:", error);
    }
  };

  const handleLikeTextClick = async (postId: string) => {
    setLikeModalOpen(postId);
    const { data, error } = await supabase
      .from("post_likes")
      .select("user_id")
      .eq("post_id", postId);

    if (error) {
      console.error("Error fetching like users:", error);
      return;
    }

    const userLikes = await Promise.all(
      data.map(async (like) => {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("nickname, email, imageUrl")
          .eq("id", like.user_id)
          .single();
        if (userError) {
          console.error("Error fetching user data:", userError);
        }
        return userData;
      })
    );

    setLikeUsers(
      userLikes.filter((user) => user !== null) as {
        nickname: string | null;
        email: string | null;
        imageUrl: string | null;
      }[]
    );
  };

  const handleDelete = async (postId: string) => {
    const confirmed = window.confirm("게시물을 삭제 하시겠습니까?");
    if (confirmed) {
      try {
        const { error } = await supabase
          .from("community_post")
          .delete()
          .eq("id", postId);

        if (error) {
          console.error("Error deleting post:", error);
        } else {
          setPosts((prevPosts) =>
            prevPosts.filter((post) => post.id !== postId)
          );
          alert("해당 게시글이 삭제 되었습니다");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleEdit = (postId: string) => {
    setEditPost(postId);
  };

  const handlePostUpdated = (
    updatedPost: Database["public"]["Tables"]["community_post"]["Row"]
  ) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditPost(null);
  };

  const toggleExpand = (postId: string) => {
    setExpandedPosts((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const truncateText = (text: string, length: number) => {
    if (!text) return "";
    return text.length > length ? text.substring(0, length) + "..." : text;
  };

  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-center text-gray-500">No posts available</p>
      ) : (
        posts.map((post) => {
          const isExpanded = expandedPosts[post.id];
          const content = isExpanded
            ? post.comment
            : truncateText(post.comment || "", 100);
          const isAuthor = isLoggedIn && me?.id === post.user_id;
          return (
            <div
              key={post.id}
              className="border p-6 mb-6 rounded-lg shadow-lg bg-white max-w-2xl mx-auto"
            >
              <div className="flex items-center mb-4">
                <img
                  src={
                    postUserData[post.user_id]?.imageUrl ||
                    "/assets/images/profile-placeholder.png"
                  }
                  alt="프로필"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <span className="text-lg font-semibold text-gray-800">
                  {postUserData[post.user_id]?.nickname ||
                    postUserData[post.user_id]?.email ||
                    ""}
                </span>
                {isAuthor && (
                  <div className="ml-auto flex space-x-2">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleEdit(post.id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleDelete(post.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                )}
              </div>
              <div className="mb-4">
                <p className="text-gray-800">{content}</p>
                {post.comment && post.comment.length > 100 && (
                  <button
                    className="text-blue-500"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {isExpanded ? "간략히" : "더 보기"}
                  </button>
                )}
                {post.imageUrl && (
                  <img
                    src={post.imageUrl}
                    alt="게시글 이미지"
                    className="mt-4 rounded-lg"
                    style={{ maxWidth: "600px", maxHeight: "600px" }}
                  />
                )}
              </div>
              <div className="text-gray-500 text-sm mb-4">
                {new Date(post.created_at).toLocaleString()}
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <button
                    className="text-2xl text-gray-500 hover:text-red-500 transition"
                    onClick={() => handleLike(post.id)}
                  >
                    {likedPosts[post.id] ? (
                      <FaHeart className="text-red-500" />
                    ) : (
                      <FaRegHeart className="text-gray-500" />
                    )}
                  </button>
                </div>
                <div className="flex space-x-4">
                  <button
                    className="text-gray-500 hover:text-blue-500 transition"
                    onClick={() => handleLikeTextClick(post.id)}
                  >
                    좋아요 {likes[post.id] || 0}
                  </button>
                </div>
              </div>
            </div>
          );
        })
      )}
      {editPost && (
        <EditPostModal
          open={!!editPost}
          handleClose={() => setEditPost(null)}
          postId={editPost}
          onPostUpdated={handlePostUpdated}
        />
      )}
      {likeModalOpen && (
        <LikeModal
          open={!!likeModalOpen}
          handleClose={() => setLikeModalOpen(null)}
          post={posts.find((post) => post.id === likeModalOpen)!}
          likeUsers={likeUsers}
          postUserData={
            postUserData[
              posts.find((post) => post.id === likeModalOpen)!.user_id
            ]
          }
        />
      )} 
    </div>
  );
};

export default PostList;
