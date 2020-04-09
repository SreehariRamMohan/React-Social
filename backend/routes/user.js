const router = require('express').Router();

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    console.log("here in the user axios endpoint call")
    res.json({ "response": "hello from user endpoint" });

});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({
        username: username,
        password: password
    });

    newUser.save()
        .then(() => res.json({ "status": "User added!" }))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/profile").post((req, res) => {
    const username = req.body.username;
    const pictureName = req.body.pictureName;

    console.log("here in axios update picture endpoint");

    var userExists = false;

    User.findOne({username: username}, function(err, user) {
       if(user) {
            user.pictureName = pictureName;
            user.save();
            userExists = true;
       }
    })
    .then( () => {
        if(userExists) {
            res.json({"status": "profile image updated"})
        } else {
            res.json({"status": "profile image failed to update"})
        }
    })
    .catch(err => {
        console.log("Error in update profile endpoint", err);
        res.status(400).json("Error: " + err)
    });
})

router.route('/login').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    console.log("here in axios login endpoint")

    // fetch user and test password verification
    User.findOne({ username: username }, function (err, user) {
        //if (err) throw err;

        console.log("Does a user exist??", user);

        if (!user) {
            res.json(
                {
                    "success": false,
                });
        } else {
            // test a matching password
            user.comparePassword(password, function (err, isMatch) {
                //if (err) throw err;
                console.log('is password a match?', isMatch); // -> Password123: true
                res.json({ "success": isMatch })
            })
        }


    }).catch(error => {
        console.log("** error finding the user");
        res.json({ "success": false });
    })
});


module.exports = router;