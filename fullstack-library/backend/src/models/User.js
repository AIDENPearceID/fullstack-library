const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProgressSchema = new Schema({
  contentId: Schema.Types.ObjectId,
  type: String,
  total: Number,
  completed: Number,
  updatedAt: Date
},{ _id:false });

const UserSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  avatar: String,
  gallery: [String],
  links: [String],
  followers: [String],
  following: [String],
  savedReviews: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
  progress: [ProgressSchema],
  isReserved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);
