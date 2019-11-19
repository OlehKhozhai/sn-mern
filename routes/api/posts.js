const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../../middleware/auth");
const User = require("../../models/User");
const Post = require("../../models/Post");

/**
 * @route   POST /api/posts
 * @desc    Create post
 * @access  Private
 */
router.post(
  "/",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await User.findById(req.user.id).select("-password");
      const post = new Post({
        text: req.body.text,
        user: req.user.id,
        name: user.name,
      });
      await post.save();

      res.json(post);
    } catch (err) {
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   GET /api/posts
 * @desc    Get all posts
 * @access  Private
 */
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   GET /api/posts/:id
 * @desc    Get post by ID
 * @access  Private
 */
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.json({ msg: "Post not found" });

    res.json(post);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   DELETE /api/posts/:id
 * @desc    Delete post by ID
 * @access  Private
 */
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.json({ msg: "Post not found" });

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User No authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   PUT /api/posts/unlike/:id
 * @desc    Unlike post
 * @access  Private
 */
router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ msg: "Post not found" });

    const userLike = post.likes.filter(
      ({ user }) => user.toString() === req.user.id
    );
    if (userLike.length === 0) {
      return res.json({ msg: "Post has not yet been liked" });
    }

    const removeIndex = post.likes
      .map(({ user }) => user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex);
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   PUT /api/posts/like/:id
 * @desc    Like post
 * @access  Private
 */
router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.json({ msg: "Post not found" });

    const userLike = post.likes.filter(
      ({ user }) => user.toString() === req.user.id
    );
    if (userLike.length > 0) {
      return res.json({ msg: "User already liked this post" });
    }
    post.likes.unshift({ user: req.user.id });
    await post.save();
    res.json(post.likes);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});

/**
 * @route   POST /api/posts/comment/:id
 * @desc    Create post comment
 * @access  Private
 */
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("text", "Text is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const post = await Post.findById(req.params.id);
      const user = await User.findById(req.user.id);
      if (!post || !user) return res.json({ msg: "Post or user not found" });

      const newComment = {
        user: req.user.id,
        name: user.name,
        text: req.body.text
      };
      post.comments.unshift(newComment);
      await post.save();
      res.json(post.comments);
    } catch (err) {
      if (err.kind === "ObjectId") {
        return res.json({ msg: "Post not found" });
      }
      res.status(500).json({ msg: "Server Error" });
    }
  }
);

/**
 * @route   DELETE /api/posts/comment/:post_id/:comment_id
 * @desc    Delete post comment
 * @access  Private
 */
router.delete("/comment/:post_id/:comment_id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.post_id);
    if (!post) return res.json({ msg: "Post not found" });

    const comment = post.comments.find(
      ({ id }) => id === req.params.comment_id
    );

    if (!comment) return res.json({ msg: "Comment not found" });

    if (comment.user.toString() !== req.user.id)
      return res.status(401).json({ msg: "User not authorized" });

    const commentIndex = post.comments
      .map(comment => comment.id)
      .indexOf(req.params.comment_id);

    post.comments.splice(commentIndex, 1);
    await post.save();
    res.json(post.comments);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.json({ msg: "Post not found" });
    }
    res.status(500).json({ msg: "Server Error" });
  }
});
module.exports = router;
