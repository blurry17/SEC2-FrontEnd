app.controller('MainController', function ($rootScope, $cookies, serviceCRUD, $scope, $location){
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');

    var params = {
        idProfesor : $scope.usuario.idUser
    }
    
    serviceCRUD.TypePost('profesor/cursos', params).then(function(res){
        $rootScope.lstCursos = res.data.listaCursos;
        $cookies.putObject('cursos', $rootScope.lstCursos);
        console.dir(res.data);
    })

    var params1 = {
        idhorario : 6
    }

    serviceCRUD.TypePost('actividad/lista', params1).then(function(res){
        console.dir(res.data);
    })
})