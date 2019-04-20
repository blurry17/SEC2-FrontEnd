var app = angular.module('appFS', ['ng', 'ngRoute', 'ngCookies','ngMessages','ServiceCRUD','ServiceUtil']);

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
        
        //Manuel Delgado: "He cambiado esto"
        .when('/curso', {
            templateUrl: 'app/modules/curso/Curso.html?v=' + Date.now(),
            controller: 'cursoController'
        })     

        .otherwise({
            redirectTo: '/main'
        });

})
