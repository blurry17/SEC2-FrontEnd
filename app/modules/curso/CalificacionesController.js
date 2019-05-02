app.controller('CalificacionesController',function($scope, $location, $cookies, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }
})