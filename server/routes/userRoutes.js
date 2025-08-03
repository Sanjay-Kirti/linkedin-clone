import express from 'express';
import { body } from 'express-validator';
import { updateUserProfile, getUserById } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

const profileValidation = [
  body('name', 'Name is required').optional().not().isEmpty(),
  body('bio', 'Bio must be less than 300 characters').optional().isLength({ max: 300 }),
  body('profilePicture', 'Profile picture must be a URL').optional().isURL(),
];

router.put('/profile', protect, profileValidation, updateUserProfile);
router.get('/:id', getUserById);
import { getUserPosts } from '../controllers/postController.js';

router.get('/:id/posts', getUserPosts);

export default router;
