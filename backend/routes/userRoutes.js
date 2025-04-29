import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import UserController from '../controllers/userController.js'
const router = express.Router();

// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', UserController.register)

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post('/login', UserController.login);


// @desc    Buy VIP contest pass
// @route   POST /api/users/buy-vip
// @access  Private
router.post('/buy-vip', protect, UserController.getVipPass)

// @desc    Get user contest history
// @route   GET /api/users/contest-history
// @access  Private
router.get('/contest-history', protect, UserController.getHistory);

export default router;