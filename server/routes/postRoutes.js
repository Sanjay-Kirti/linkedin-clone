import express from 'express';
import { body } from 'express-validator';
import { createPost, getPosts } from '../controllers/postController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const postValidation = [
  body('content', 'Content is required').not().isEmpty().trim().isLength({ max: 1000 }),
];

router.post('/', protect, postValidation, createPost);
router.get('/', getPosts);

export default router;
