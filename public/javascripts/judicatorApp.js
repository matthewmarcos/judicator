var app = angular.module('judicatorApp', ['ngRoute']).run(function($rootScope, $http) {
    //ui router
    //rootScope is global
    $rootScope.authenticated = false;
    $rootScope.currentUser = '';
    $rootScope.signout = function() {
        $http.get('/auth/signout'); //sana nalang gumana. No callback
        $rootScope.authenticated = false;
        $rootScope.currentUser = '';
    };
});

app.config(function($routeProvider){
    // $routeProvide.html5(true);
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

app.controller('authController', function($scope, $rootScope, $http, $location) {
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
        $http.post('/auth/login', $scope.user).success(function(data) {
            $rootScope.authenticated = true;
            $rootScope.currentUser = data.user.username;
            $location.path('/');
        });
        // alert('USERNAME: ' + $scope.user.username + '\nPASSWORD: ' +  $scope.user.password);
    };

    $scope.register = function() {
        // DB QUERY FOR CREDENTIALS
        //form checking
        alert('registering');
        $http.post('/auth/signup', $scope.user).success(function(data) {
            $rootScope.authenticated = true;
            $rootScope.currentUser = data.user.username;
            $location.path('/');
        });
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
