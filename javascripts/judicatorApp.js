var app = angular.module('judicatorApp', []);

app.controller('registrationController', function($scope) {
    $scope.user = {
        'username': '',
        'password' : '',
        'password2' : '',
        'firstName': '',
        'lastName': '',
        'email': ''
    };
    $scope.errMsg = '';
    $scope.register = function() {
        // DB QUERY FOR CREDENTIALS
        alert('USERNAME: ' + $scope.user.username + '\nPASSWORD: ' +  $scope.user.password);
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
