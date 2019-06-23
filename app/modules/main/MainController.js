app.controller('MainController', function ($rootScope, $cookies, serviceCRUD, $scope, $location) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;
    var params = { idProfesor: $scope.usuario.idUser }
    serviceCRUD.TypePost('profesor/cursos', params).then(function (res) {
        $rootScope.lstCursos = res.data.listaCursos;
        $cookies.putObject('cursos', $rootScope.lstCursos);
    })
})