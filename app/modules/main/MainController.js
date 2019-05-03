app.controller('MainController', function ($rootScope, $scope, $location, $window) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
})