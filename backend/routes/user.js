const router = require('express').Router();

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    console.log("here in the user axios endpoint call")
    res.json({"response": "hello from user endpoint"});

});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
       username: username,
       password: password
    });

    newUser.save()
    .then(() => res.json({"status": "User added!"}))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;