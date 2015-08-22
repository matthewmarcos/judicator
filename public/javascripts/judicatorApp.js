var app = angular.module('judicatorApp', ['ngRoute']);

app.config(function($routeProvider){
  $routeProvider
    //the timeline display
    .when('/', {
      templateUrl: '/angularPartials/main.html',
      controller: 'mainController'
    })
    //the login display
    .when('/login', {
      templateUrl: '/angularPartials/login.html',
      controller: 'authController'
    })
    //the signup display
    .when('/register', {
      templateUrl: '/angularPartials/register.html',
      controller: 'authController'
    });
});

app.controller('authController', function($scope) {
    $scope.user = {
        'username': '',
        'password' : '',
        'password2' : '',
        'firstName': '',
        'lastName': '',
        'email': ''
    };
    $scope.errMsg = '';

    $scope.login = function() {
        // DB QUERY FOR CREDENTIALS
        $scope.errMsg = 'Logged in as' + $scope.user.username;
        // alert('USERNAME: ' + $scope.user.username + '\nPASSWORD: ' +  $scope.user.password);
    };

    $scope.register = function() {
        // DB QUERY FOR CREDENTIALS
        $scope.errMsg = 'Registered as' + $scope.user.username;
        // alert('USERNAME: ' + $scope.user.username + '\nPASSWORD: ' +  $scope.user.password);
    };
});

app.controller('mainController', function($scope) {
    $scope.posts = [];
    $scope.newPost = {
        'author': '',
        'content' : '',
        'timeStamp': ''
    };
    $scope.post = function() {
        $scope.newPost.timeStamp = Date.now();
        $scope.posts.push($scope.newPost);
        $scope.newPost = {
            'author': '',
            'content' : '',
            'timeStamp': ''
        };
    };
});
