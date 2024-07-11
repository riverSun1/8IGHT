import React from "react";

const PostList = ({ posts }: { posts: any[] }) => {
  console.log("Rendering posts:", posts);
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="mb-4 p-4 border rounded">
          <div className="flex items-center mb-2">
            <img
              src="/images/profile-placeholder.png"
              alt="프로필"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="text-gray-600">{post.user_id}</div>
          </div>
          <div className="text-gray-800 mb-2">{post.comment}</div>
          {post.imageUrl && (
            <div className="flex justify-center mb-4">
              <img
                src={post.imageUrl}
                alt="게시물 이미지"
                className="max-h-60 rounded-lg"
              />
            </div>
          )}
          <div className="text-gray-400 text-sm">
            {new Date(post.created_at).toLocaleString()}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostList;
