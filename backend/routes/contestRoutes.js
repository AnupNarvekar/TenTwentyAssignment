import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import ContestController from "../controllers/contestController.js";

const router = express.Router();

// @desc    Get all contests
// @route   GET /api/contests
// @access  Public
router.get('/', ContestController.getAllContests);

// @desc    Get contest by ID
// @route   GET /api/contests/:contestId
// @access  Public
router.get('/:contestId', ContestController.getContestById);

// @desc    Participate in a contest
// @route   POST /api/contests/:contestId/participate
// @access  Private
router.post('/:contestId/participate', protect, ContestController.participate);

// @desc    Submit answers for a contest
// @route   POST /api/contests/:contestId/submit
// @access  Private
router.post('/:contestId/submit', protect, ContestController.submitContest);

// @desc    Get leaderboard for a contest
// @route   GET /api/contests/:contestId/leaderboard
// @access  Public
router.get('/:contestId/leaderboard', ContestController.getLeaderboard);

export default router;