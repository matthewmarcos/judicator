var express = require('express');
var router = express.Router();

router.route('/posts')
    // Return all posts
    .get(function(req, res, next) {
        res.send({
            message: 'get posts'
        });
    })
    // Create a new post
    .post(function(req, res, next) {
        res.send({
            message: 'create new post'
        });
    });


module.exports = router;
