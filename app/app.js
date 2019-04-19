var app = angular.module('appFS', ['ng', 'ngRoute', 'ngCookies','ngMessages']);

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/json; charset=utf-8' };

    $routeProvider
        .when('/', {
            templateUrl: 'app/modules/login/Login.html?v=' + Date.now(),
            controller: 'LoginController'
        })

        .when('/main', {
            templateUrl: 'app/modules/main/main.html?v=' + Date.now(),
            controller: 'mainController'
        })        

        .otherwise({
            redirectTo: '/main'
        });

})
