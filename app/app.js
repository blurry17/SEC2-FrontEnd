var app = angular.module('appFS', ['ng', 'ngRoute', 'ngCookies', 'ServiceCRUD', 'ServiceUtil']);
var indexURL = "http://127.0.0.1:5500/Index.html#!/";

app.config(function ($routeProvider, $httpProvider) {
    $httpProvider.defaults.headers.post = { 'Content-Type': 'application/json; charset=utf-8' };
    
    $routeProvider
        .when('/', {
            templateUrl: 'app/modules/login/Login.html?v=' + Date.now(),
            controller: 'LoginController'
        })

        .when('/main', {
            templateUrl: 'app/modules/main/Main.html?v=' + Date.now(),
            controller: 'MainController'
        })   
        
        .when('/curso', {
            templateUrl: 'app/modules/curso/Curso.html?v=' + Date.now(),
            controller: 'CursoController'
        })  
        
        .when('/actividad', {
            templateUrl: 'app/modules/curso/Actividad.html?v=' + Date.now(),
            controller: 'ActividadController'
        }) 

        .when('/calificaciones', {
            templateUrl: 'app/modules/curso/Calificaciones.html?v=' + Date.now(),
            controller: 'CalificacionesController'
        }) 

        .when('/rubrica',{
            templateUrl: 'app/modules/curso/Rubrica.html?v=' + Date.now(),
            controller: 'RubricaController'
        })

        .when('/estadisticas', {
            templateUrl: 'app/modules/curso/Estadisticas.html?v=' + Date.now(),
            controller: 'EstadisticasController'
        }) 

        .otherwise({
            redirectTo: '/main'
        });

})
