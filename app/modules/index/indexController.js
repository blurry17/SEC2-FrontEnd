app.controller('indexController', function ($rootScope, $scope, $location, $window) {
    $rootScope.showLayout = true;
    $scope.mostrarCursos = true;

    $scope.btnLogout = function(){
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('/')
    }
})