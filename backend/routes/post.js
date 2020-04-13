const router = require('express').Router();

let Post = require('../models/post.model');

router.route('/').get((req, res) => {
 // console.log("here in the axios endpoint call")
  Post.find()
    .then(posts => res.json(posts))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route('/fetch').get((req, res) => {
  //console.log("here in the axios endpoint call")

  Post.find()
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
      message: message,
      author: author, 
      date: date,
      key: key,
      comments: comments,
  });

  newPost.save()
    .then(() => res.json("Post added!"))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/add/comment/:postKey").post((req, res) => {
  const comment = req.body.comment;
  const author = req.body.author;
  const postKey = req.params.postKey;

  const objectToPush = {
    "comment": comment,
    "author": author
  }
  
  Post.update({"key": postKey},  { $push: { comments: objectToPush }})
  .then(() => res.json("Adding post"))
  .catch((err) => res.status(500).json("Error" + err))
});

module.exports = router;