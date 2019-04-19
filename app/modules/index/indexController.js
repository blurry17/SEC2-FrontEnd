app.controller('indexController', function ($rootScope, $scope, $location, $window) {
    $rootScope.showLayout = true;
    $scope.mostrarCursos = true;

    $scope.btnLogout = function(){
        $location.path('/')
    }
})