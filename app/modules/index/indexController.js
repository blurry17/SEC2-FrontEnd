app.controller('indexController', function ($rootScope, $scope, $location, $window) {
    $rootScope.showLayout = true;
    $scope.mostrarCursos = true;
    $('#sidebar').addClass('active');

    $scope.btnLogout = function(){
        $location.path('/')
    }
})