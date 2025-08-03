import asyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Post from '../models/Post.js';

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
export const createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { content } = req.body;
  const post = await Post.create({ content, author: req.user._id });
  const populatedPost = await Post.findById(post._id).populate('author', 'name profilePicture');
  res.status(201).json(populatedPost);
});

// @desc    Get all posts with pagination (public feed)
// @route   GET /api/posts?page=1&limit=10
// @access  Public
export const getPosts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await Post.countDocuments();
  const posts = await Post.find()
    .populate('author', 'name profilePicture')
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({
    page,
    pages: Math.ceil(total / limit),
    total,
    posts,
  });
});

// @desc    Get posts of a specific user
// @route   GET /api/users/:id/posts
// @access  Public
export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({ author: req.params.id })
    .populate('author', 'name profilePicture')
    .sort({ createdAt: -1 });
  res.json(posts);
});
