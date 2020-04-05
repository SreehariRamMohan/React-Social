const router = require('express').Router();

let Post = require('../models/post.model');

router.route('/').get((req, res) => {
  User.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/add').post((req, res) => {
  const message = req.body.message;
  const author = req.body.author;
  const date = req.body.date;
  const key = req.body.key;
  const comments = req.body.comments;

  const newPost = new Post({
      post: message,
      author: author, 
      time: date,
      key: key,
      comments: comments,
  });

  newPost.save()
    .then(() => res.json("Post added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/ad/comment/:postKey").post((req, res) => {
  const comment = req.body.comment;
  const postKey = req.params.postKey;
  Post.update({"key": postKey},  { $push: { comments: comment }})
  .then(() => res.json("Adding post"))
  .catch((err) => res.status(500).json("Error" + err))


});

module.exports = router;