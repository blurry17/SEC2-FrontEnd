app.controller('ActividadController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.btnCalificaciones = function(){
        $location.path("calificaciones")
    }
    $scope.btnAutoEvaluacion=function(){
        $location.path("autoeval")
    }
})
