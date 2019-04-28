app.controller('ActividadController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.btnCalificaciones = function(){
        $location.path("calificaciones")
    }

    $scope.btnRubrica = function(){
        $location.path("rubrica")
    }
})