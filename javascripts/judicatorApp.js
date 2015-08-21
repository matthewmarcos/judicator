var app = angular.module('judicatorApp', []);

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
