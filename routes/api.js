var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Post = mongoose.model('Post');

router.use(function(req, res, next) {
    if(req.method === "GET") {
        // DO not lock out the get requests
        return next();
    }
    if(!req.isAuthenticated()) {
        // If you are not authenticated, authenticate first
        return res.redirect('/#login');
    }
    // User is authenticated. Proceed to next callback
    return next();
});

router.route('/posts')
    // Return all posts
    .get(function(req, res, next) {
        Post.find(function(err, posts) {
            if(err) {
                return res.send(500, err);
            }
            return res.send(posts);
        });
    })
    // Create a new post
    .post(function(req, res, next) {
        console.log('Here at posts!');
        var post = new Post();
        post.content = req.body.content;
        post.author = req.body.author;
        post.save(function(err, post) {
            if (err){
                console.log('Error in Saving post: '+err);
                return res.send(500, err);
            }
            console.log(post.author + ' Post succesful');
            return res.json(post);
        });
    });

router.route('/posts/:id')
    // Return post
    .get(function(req, res, next) {
        console.log('gett request at ' + req.body.params);
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);
            res.json(post);
        });
    })
    // Edit post with whatever is in the parameters
    .put(function(req, res, next) {
        Post.findById(req.params.id, function(err, post){
            if(err)
                res.send(err);

            post.author = req.body.author;
            post.content = req.body.content;

            post.save(function(err, post){
                if(err)
                   res.send(err);
                res.json(post);
            });
       });
    })
    .delete(function(req, res, next) {
        Post.remove({
            _id: req.params.id
        }, function(err) {
            if (err)
                res.send(err);
            res.json("deleted :(");
        });
    });

module.exports = router;
