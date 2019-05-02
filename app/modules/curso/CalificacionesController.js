app.controller('CalificacionesController',function($scope, $location, $cookies, serviceUtil){ 
    $scope.curso=$cookies.get("cursoActual")
    $scope.actividad=$cookies.get("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }
})