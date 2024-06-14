const express = require("express");
const router = express.Router();

const {
  registerUser,
  createPost,
  addComment,
  addLike,
  removeLike,
  getAllPosts,
  getPostsAndComments,
  getAllUsers,
  pool,
  loginUser,
  sql,
} = require("../controller/connect.js");

// GET Functions for Projects
//router.get("/", getAllData);

// DELETE Functions for Projects
//router.delete("/:id", deleteProject);

// UPDATE/PATCH Functions for Projects
//router.patch("/:id", updateProject);

// Register user

// Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await getAllPosts();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get all users
router.get("/users", async (req, res) => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get posts and comments
router.get("/posts-comments", async (req, res) => {
  try {
    const postsAndComments = await getPostsAndComments();
    res.status(200).json(postsAndComments);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Create post
router.post("/posts", async (req, res) => {
  try {
    const { user_id, title, content } = req.body;
    await createPost(user_id, title, content);
    res.status(201).send("Post created successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add comment
router.post("/comments", async (req, res) => {
  try {
    const { post_id, user_id, content } = req.body;
    await addComment(post_id, user_id, content);
    res.status(201).send("Comment added successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Add or remove a like to a post
// Add or remove a like to a post
router.post("/likes", async (req, res) => {
  try {
    const { post_id, user_id } = req.body;

    // Überprüfen, ob der Benutzer den Post bereits geliked hat
    const likeCheck = await pool
      .request()
      .input("post_id", sql.Int, post_id)
      .input("user_id", sql.Int, user_id)
      .query(
        "SELECT * FROM likes WHERE post_id = @post_id AND user_id = @user_id"
      );

    if (likeCheck.recordset.length > 0) {
      // Benutzer hat den Post bereits geliked, also Like entfernen
      await removeLike(post_id, user_id);
      return res.status(200).json({ message: "Like removed successfully" });
    } else {
      // Benutzer hat den Post noch nicht geliked, also Like hinzufügen
      await addLike(post_id, user_id);
      return res.status(201).json({ message: "Like added successfully" });
    }
  } catch (err) {
    console.error("Error adding or removing like:", err);
    res.status(500).json({ message: "Error adding or removing like" });
  }
});

// Register user
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await registerUser(username, email, password);
    res.status(201).send("User registered successfully");
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginUser(email, password);
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
