app.controller('MainController', function ($rootScope, $cookies, serviceCRUD, $scope, $location) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;
    var params = { idProfesor: $scope.usuario.idUser }
    serviceCRUD.TypePost('profesor/cursos', params).then(function (res) {
        console.dir(res.data);
        $rootScope.lstCursos = res.data.listaCursos;
        $cookies.putObject('cursos', $rootScope.lstCursos);
    })

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    Toast.fire({
        type: 'success',
        title: 'Bienvenido'
    })
})