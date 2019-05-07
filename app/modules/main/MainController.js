app.controller('MainController', function ($rootScope,$cookies, $scope, $location, $window) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
})