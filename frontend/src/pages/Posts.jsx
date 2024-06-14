import React from "react";

const Posts = ({ data }) => {
  return (
    <div>
      <h1>Posts</h1>
      {data.map((post) => (
        <div key={post.post_id}>
          <h2>{post.title}</h2>
          <p>{post.post_content}</p>
          <p>Likes: {post.like_count}</p>
          <h3>Comments</h3>
          <ul>
            {post.comments.map((comment) => (
              <li key={comment.comment_id}>
                <p>
                  {comment.comment_content} - {comment.comment_user}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Posts;
