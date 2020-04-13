const mongoose = require('mongoose');

var bcrypt = require('bcryptjs');
const saltRounds = 10;

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {type: String, unique: true},
    password: String,
    pictureName: String,
    isPremiumUser: Boolean,
    
    email: String,
    gender: String,
    bio: String
});


userSchema.pre('save', function (next) {

    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    //salt and hash the new password before saving
    bcrypt.hash(user.password, saltRounds, function (err, hash) {
       console.log("Hashing and Salting User Password Before Save");

        console.log(user.password, "=>", hash);

        user.password = hash;
        next();
    });
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

const User = mongoose.model('User', userSchema);

module.exports = User;