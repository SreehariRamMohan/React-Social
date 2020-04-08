const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  message: String,
  author: String,
  date: String,
  comments: [{
    comment: String,
    author: String
  }],
  key: Number,
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;