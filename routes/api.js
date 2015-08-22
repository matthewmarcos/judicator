var express = require('express');
var router = express.Router();

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
        res.send({
            message: 'get all posts'
        });
    })
    // Create a new post
    .post(function(req, res, next) {
        res.send({
            message: 'create new post'
        });
    });

router.route('/posts/:id')
    // Return post
    .get(function(req, res, next) {
        res.send({
            message: 'Get request to ' + req.params.id
        });
    })
    // Create a new post
    .put(function(req, res, next) {
        res.send({
            message: 'Update existing post' + req.params.id
        });
    })
    .delete(function(req, res, next) {
        res.send({
            message: 'delete existing post' + req.params.id
        });
    });



module.exports = router;
