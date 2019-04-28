app.controller('CalificacionesController',function($scope, $location, $cookieStore, serviceUtil){ 
    $scope.curso=$cookieStore.get("cursoActual")
    $scope.actividad=$cookieStore.get("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }
})