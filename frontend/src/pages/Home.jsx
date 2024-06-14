import React, { useState, useEffect } from "react";
import { useAppContext } from "../hooks/useAppContext";
import Modal from "../components/Modal";
import "./Home.css"; // Import the CSS file

const Home = () => {
  const { posts, fetchPosts, authUser } = useAppContext();
  const [visibleComments, setVisibleComments] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [currentPostId, setCurrentPostId] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const toggleComments = (postId) => {
    setVisibleComments((prevState) => ({
      ...prevState,
      [postId]: !prevState[postId],
    }));
  };

  const openModal = (postId) => {
    setCurrentPostId(postId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCommentContent("");
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3003/api/blog/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: currentPostId,
          user_id: authUser.id,
          content: commentContent,
        }),
      });
      if (response.ok) {
        fetchPosts(); // Refresh posts
        closeModal();
      } else {
        alert("Failed to add comment");
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("Error adding comment");
    }
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch("http://localhost:3003/api/blog/likes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: postId,
          user_id: authUser.id,
        }),
      });
      if (response.ok) {
        fetchPosts(); // Refresh posts
      } else {
        const data = await response.json();
        alert(data.message);
      }
    } catch (error) {
      console.error("Error liking post:", error);
      alert("Error liking post");
    }
  };

  return (
    <div className="container">
      {posts.map((post) => (
        <div key={post.post_id} className="post">
          <div className="post-header">
            <div className="post-user-circle">
              {post.post_user ? post.post_user.charAt(0) : "U"}
            </div>
            <div>
              <h2>{post.title}</h2>
              <p>{new Date(post.post_created_at).toLocaleDateString()}</p>
              <p className="post-username">{post.post_user}</p>
            </div>
          </div>
          <p>{post.post_content}</p>
          <div className="post-footer">
            <div className="likes">
              <button onClick={() => handleLike(post.post_id)}>
                <span role="img" aria-label="likes">
                  ❤️
                </span>{" "}
                {post.like_count}
              </button>
            </div>
            <div className="comments">
              <button onClick={() => toggleComments(post.post_id)}>
                💬 {post.comments.length} Kommentare
              </button>
            </div>
            <div className="add-comment">
              <button onClick={() => openModal(post.post_id)}>
                ➕ Add Comment
              </button>
            </div>
          </div>
          {visibleComments[post.post_id] && (
            <div>
              {post.comments.map((comment) => (
                <div key={comment.comment_id} className="comment">
                  <p>
                    <strong>{comment.comment_user}:</strong>{" "}
                    {comment.comment_content}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <h2>Add Comment</h2>
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit Comment</button>
        </form>
      </Modal>
    </div>
  );
};

export default Home;
