var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new mongoose.Schema({
    content: String,
    author: String, //hash created from password
    timeStamp: {
        type: Date,
        default: Date.now
    }
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String, //hash created from password
    firstname: String,
    lastname: String,
    email: String,
    timeStamp: {
        type: Date,
        default: Date.now
    }
});
// Create User and post model
mongoose.model('Post', postSchema);
mongoose.model('User', userSchema);
