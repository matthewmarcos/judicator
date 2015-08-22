/*
    Copy pasted this shizz.
*/
var LocalStrategy = require('passport-local').Strategy;
var bCrypt = require('bcrypt-nodejs');
//temporary data store
var users = {};
module.exports = function(passport){

    // Passport needs to be able to serialize and deserialize users to support persistent login sessions
    passport.serializeUser(function(user, done) {
        // Tell passport which id to use for user
        console.log('serializing user:' + user.username);
        return done(null, user.username);
    });

    passport.deserializeUser(function(username, done) {
        //return user object
        return done(null, users[username]);

    });

    passport.use('login', new LocalStrategy({
            passReqToCallback : true
        },
        function(req, username, password, done) {
            // Check if username exists
            if(!users[username]) {
                return done('Wrong username!', false);
            }
            // Check if password exists
            if(!isValidPassword(users[username], password)) {
                return done('Wrong password', false);
            }
            // Success na ang pagsign in
            console.log(users.username + 'is signing in!');
            return done(null, users[username]);
        }
    ));

    passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {
            //Check db if user exists
            if(users[username]) {
                console.log('FALSE');
                return done('Username already exists!', false);
            }
            //else add to users object
            users[username] = {
                username: username,
                password: createHash(password)
                // firstname: firstname,
                // lastname: lastname,
                // email: email
            };
            console.log('TRUE');
            return done(null, users[username]);

        })
    );

    var isValidPassword = function(user, password){
        return bCrypt.compareSync(password, user.password);
    };
    // Hashes password using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };

};
