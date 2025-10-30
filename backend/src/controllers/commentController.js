import Comment from '../models/Comment.js';
import Issue from '../models/Issue.js';

// @desc    Get comments for issue
// @route   GET /api/issues/:issueId/comments
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ issue: req.params.issueId })
      .populate('user', 'name role')
      .sort('-createdAt');

    res.json({
      success: true,
      count: comments.length,
      data: comments
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add comment to issue
// @route   POST /api/issues/:issueId/comments
export const addComment = async (req, res) => {
  try {
    req.body.issue = req.params.issueId;
    req.body.user = req.user.id;

    // Check if it's a status update comment from admin/moderator
    if (req.body.statusFrom && req.body.statusTo) {
      req.body.isStatusUpdate = true;
      req.body.isOfficial = ['admin', 'moderator'].includes(req.user.role);
    }

    const comment = await Comment.create(req.body);

    // Update comments count in issue
    await Issue.findByIdAndUpdate(req.params.issueId, {
      $inc: { commentsCount: 1 }
    });

    await comment.populate('user', 'name role');

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};