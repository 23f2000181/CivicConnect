import Issue from '../models/Issue.js';
import Comment from '../models/Comment.js';
import { sendStatusUpdateEmail } from '../utils/emailService.js';

// @desc    Get all issues
// @route   GET /api/issues
export const getIssues = async (req, res) => {
  try {
    const {
      category,
      status,
      priority,
      page = 1,
      limit = 10,
      sort = '-createdAt',
      near,
      radius = 10 // in kilometers
    } = req.query;

    // Build query
    let query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (priority) query.priority = priority;

    // Geo-spatial query for nearby issues
    if (near) {
      const [lat, lng] = near.split(',').map(coord => parseFloat(coord.trim()));
      query['location.coordinates'] = {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [lng, lat]
          },
          $maxDistance: radius * 1000 // Convert to meters
        }
      };
    }

    // Execute query with pagination
    const issues = await Issue.find(query)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Issue.countDocuments(query);

    res.json({
      success: true,
      count: issues.length,
      pagination: {
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      },
      data: issues
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single issue
// @route   GET /api/issues/:id
export const getIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id)
      .populate('reportedBy', 'name email')
      .populate('assignedTo', 'name email')
      .populate('upvotes', 'name');

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    res.json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create new issue
// @route   POST /api/issues
export const createIssue = async (req, res) => {
  try {
    // Add logged in user to req.body
    req.body.reportedBy = req.user.id;

    // Handle file uploads
    if (req.files && req.files.length > 0) {
      req.body.images = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }));
    }

    const issue = await Issue.create(req.body);

    // Populate user data
    await issue.populate('reportedBy', 'name email');

    res.status(201).json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update issue
// @route   PUT /api/issues/:id
export const updateIssue = async (req, res) => {
  try {
    let issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check ownership or admin role
    if (issue.reportedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this issue'
      });
    }

    // Track status change for notifications
    const oldStatus = issue.status;
    
    issue = await Issue.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('reportedBy', 'name email');

    // Send notification if status changed by admin/moderator
    if (req.body.status && req.body.status !== oldStatus && 
        (req.user.role === 'admin' || req.user.role === 'moderator')) {
      // This would be enhanced with actual notification system
      console.log(`Status changed from ${oldStatus} to ${req.body.status}`);
    }

    res.json({
      success: true,
      data: issue
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Upvote issue
// @route   POST /api/issues/:id/upvote
export const upvoteIssue = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found'
      });
    }

    // Check if user already upvoted
    const alreadyUpvoted = issue.upvotes.includes(req.user.id);
    
    if (alreadyUpvoted) {
      // Remove upvote
      issue.upvotes.pull(req.user.id);
      issue.upvoteCount -= 1;
    } else {
      // Add upvote
      issue.upvotes.push(req.user.id);
      issue.upvoteCount += 1;
    }

    await issue.save();

    res.json({
      success: true,
      data: {
        upvoted: !alreadyUpvoted,
        upvoteCount: issue.upvoteCount
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get issue statistics
// @route   GET /api/issues/stats/overview
export const getIssueStats = async (req, res) => {
  try {
    const stats = await Issue.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const categoryStats = await Issue.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      { $sort: { count: -1 } }
    ]);

    const priorityStats = await Issue.aggregate([
      {
        $group: {
          _id: '$priority',
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        status: stats,
        categories: categoryStats,
        priorities: priorityStats
      }
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};