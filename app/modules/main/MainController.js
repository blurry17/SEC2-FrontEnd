app.controller('MainController', function ($rootScope,$cookies,serviceCRUD, $scope, $location, $window){
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
})