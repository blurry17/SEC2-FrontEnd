app.controller('CursoController',function($rootScope, $scope, $location, serviceUtil){
    $scope.curso = JSON.parse(sessionStorage['cursoActual']);
    console.dir($scope.curso);
})

