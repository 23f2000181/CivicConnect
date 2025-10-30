import express from 'express';
import {
  getIssues,
  getIssue,
  createIssue,
  updateIssue,
  upvoteIssue,
  getIssueStats
} from '../controllers/issueController.js';
import { protect, authorize } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(getIssues)
  .post(protect, upload.array('images', 5), createIssue);

router.route('/stats/overview')
  .get(protect, authorize('admin', 'moderator'), getIssueStats);

router.route('/:id')
  .get(getIssue)
  .put(protect, updateIssue);

router.route('/:id/upvote')
  .post(protect, upvoteIssue);

export default router;