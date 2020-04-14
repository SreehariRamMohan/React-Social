const router = require('express').Router();

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    //console.log("here in the user axios endpoint call")
    res.json({ "response": "hello from user endpoint" });

});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const pictureName = req.body.pictureName;

    const newUser = new User({
        username: username,
        password: password,
        pictureName: pictureName,
        isPremiumUser: false,
        email: "",
        bio: "",
        gender: ""
    });

    newUser.save()
        .then(() => res.json({ "status": "User added!" }))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/personal").post((req, res) => {
    const usernameReference = req.body.usernameReference;
    const type = req.body.type;
    const information = req.body.information;

    console.log("Here trying to update personal information", usernameReference, type, information);

    User.findOne({username: usernameReference}, function(err, user) {
        if(!user) {
            throw err
        }

        switch(type) {
            case "UPDATE_USERNAME":
                user.username = information;
                break;
            case "UPDATE_EMAIL":
                user.email = information;
                break;
            case "UPDATE_BIO":
                user.bio = information;
                break;
            case "UPDATE_GENDER": 
                user.gender = information;
                break;
            default:
                console.log(type, information);
        }

        user.save();
    })
    .then(result => {
        res.json({
            "status": "updated"
        })
    })
    .catch(error => {
        console.log(error);
        res.json({
            "status": "error"
        })
    })
})

router.route("/update/premium").post((req, res) => {
    const username = req.body.username;
    const isPremium = req.body.isPremiumUser;

    console.log("here in axios update premium status endpoint for", username, "isPremium", isPremium);

    User.findOne({username: username}, function(err, user) {
        if(!user) {
            throw err
        }

        user.isPremiumUser = isPremium;
        user.save();
    })
    .then(result => {
        res.json({
            "status": "updated"
        })
    })
    .catch(error => {
        console.log(error);
        res.json({
            "status": "error"
        })
    })

})

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

router.route("/profile/").post((req, res) => {
    const username = req.body.username;

    console.log("here in axios get profile of username", username, "endpoint");

    var query = User.findOne({username: username}, function(err, person) {
        
        //console.log(person);
        
        var pictureName = person.pictureName;
        
        //console.log(pictureName)
        
        let result = {
            "pictureName": pictureName
        }
        
        if(pictureName) {
            res.json(result)
        } else {
            res.json(result)
        }
    })
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
                res.json({ 
                    "success": isMatch,
                    "profilePicture": user.pictureName,
                    "bio": user.bio,
                    "email": user.email,
                    "gender": user.gender,
                    "isPremiumUser": user.isPremiumUser
                })
            })
        }


    }).catch(error => {
        console.log("** error finding the user");
        res.json({ "success": false });
    })
});


module.exports = router;