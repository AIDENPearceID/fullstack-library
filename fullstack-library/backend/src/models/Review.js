const mongoose = require('mongoose');
const { Schema } = mongoose;

const EpisodeSchema = new Schema({
  number: Number,
  title: String,
  rating: Number
},{ _id:false });

const ReviewSchema = new Schema({
  author: { username: String, userId: Schema.Types.ObjectId },
  type: String,
  subtype: String,
  title: String,
  summary: String,
  rating: Number,
  image: String,
  episodes: [EpisodeSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', ReviewSchema);
