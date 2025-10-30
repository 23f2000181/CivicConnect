import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: [true, 'Please add comment content'],
    maxlength: [300, 'Comment cannot be more than 300 characters']
  },
  issue: {
    type: mongoose.Schema.ObjectId,
    ref: 'Issue',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  isStatusUpdate: {
    type: Boolean,
    default: false
  },
  statusFrom: String,
  statusTo: String,
  isOfficial: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export default mongoose.model('Comment', commentSchema);