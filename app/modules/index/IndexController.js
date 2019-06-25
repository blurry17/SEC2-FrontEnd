app.controller('IndexController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;
    $scope.idEsp = '0';
    $scope.idCur = '0';
    $scope.lstEsp = null;

    $scope.mostrarCurso = function (curso) {
        $cookies.putObject('cursoActual', curso);

        if (window.location.href == (indexURL + 'curso')) {
            location.reload()
        } else {
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
            $location.path('curso')
        }
    }

    $scope.btnMant = function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('mantenimiento');
    }

    $scope.btnLogout = function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $cookies.remove('usuario');
        $location.path('/')
    }

    $scope.btnCargaCursos = function () {
        $scope.idCur = '0';
        serviceCRUD.TypePost('mantenimiento/especialidad_semestre', null).then(function (res) {
            $scope.lstEsp = res.data.listaEspecialidades;
        })
        $('#mdCargaCursos').appendTo("body").modal('show');
    }

    $scope.btnCargaProfs = function () {
        $scope.idEsp = '0';
        serviceCRUD.TypePost('mantenimiento/especialidad_semestre', null).then(function (res) {
            $scope.lstEsp = res.data.listaEspecialidades;
        })
        $('#mdCargaProfs').appendTo("body").modal('show');
    }

    $scope.listarCursos = function () {
        var params = { idEspecialidad: $scope.idEsp };
        serviceCRUD.TypePost('mantenimiento/curso_semestre', params).then(function (res) {
            console.dir(res.data);
            $scope.lstCursos = res.data.listaCursos;
        })
    }
})