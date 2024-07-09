import React from 'react';

const PostList = ({ posts }) => {
  return (
    <div>
      {posts.length === 0 ? (
        <p>게시물이 없습니다.</p>
      ) : (
        posts.map((post, index) => (
          <div key={index} className="mb-4 p-4 border rounded">
            <p>{post.postContent}</p>
            {post.image && (
              <div className="flex justify-center mb-4">
                <img src={post.image} alt="Post" className="max-h-40 rounded-lg" />
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default PostList;
