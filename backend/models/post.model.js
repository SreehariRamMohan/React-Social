const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  post: String,
  author: String,
  time: String,
  comments: [String],
  key: Number,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;