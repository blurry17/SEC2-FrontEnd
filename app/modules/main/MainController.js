app.controller('MainController', function ($rootScope,$cookies,serviceCRUD, $scope, $location, $window){
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');


    var params = {
        idProfesor : 2
    }
    serviceCRUD.TypePost('profesor/cursos', params).then(function(res){
        console.dir(res.data);
    })
})