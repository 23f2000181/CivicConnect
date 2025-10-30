import mongoose from 'mongoose';

const issueSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    enum: [
      'pothole',
      'garbage',
      'streetlight',
      'water_leakage',
      'illegal_dumping',
      'drainage',
      'parks',
      'traffic',
      'other'
    ]
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'resolved', 'closed'],
    default: 'pending'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  location: {
    address: String,
    coordinates: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true }
    },
    ward: String,
    zone: String
  },
  images: [{
    url: String,
    public_id: String
  }],
  reportedBy: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  assignedTo: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  department: {
    type: String,
    enum: ['public_works', 'sanitation', 'water_department', 'electricity', 'traffic', 'parks', 'other']
  },
  upvotes: [{
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  }],
  upvoteCount: {
    type: Number,
    default: 0
  },
  commentsCount: {
    type: Number,
    default: 0
  },
  resolvedAt: Date
}, {
  timestamps: true
});

// Index for geospatial queries
issueSchema.index({ 'location.coordinates': '2dsphere' });
issueSchema.index({ status: 1, priority: -1 });
issueSchema.index({ category: 1 });

export default mongoose.model('Issue', issueSchema);