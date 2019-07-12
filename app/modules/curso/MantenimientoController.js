app.controller('MantenimientoController', function ($rootScope, $cookies, serviceCRUD, $scope, $location) {
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $rootScope.user = $scope.usuario;
    $scope.nomSem = null;
    $scope.semActual = null;
    $scope.lstSemActivos = null;
    $scope.idSemAct = '0';

    $scope.changeCheckAll = function () {
        if ($scope.checkeados) {
            for (let i = 0; i < $scope.especialidades.length; i++) {
                $scope.especialidades[i].checked = true;
            }
        } else {
            for (let i = 0; i < $scope.especialidades.length; i++) {
                $scope.especialidades[i].checked = false;
            }
        }
    }

    $scope.changeCheck = function (checked) {
        if (!checked) {
            $scope.checkeados = false;
        } else {
            for (let i = 0; i < $scope.especialidades.length; i++) {
                if (!$scope.especialidades[i].checked) return;
            }
            $scope.checkeados = true;
        }
    }

    $scope.crearSemestre = function () {
        var params = { nombreSemestre: $scope.nomSem };
        serviceCRUD.TypePost('mantenimiento/semestre/crear', params).then(function (res) {
            $('#mdCrearSemestre').modal('hide');
            Swal.fire({
                type: 'success',
                title: 'Semestre creado'
            })
        })
    }

    $scope.btnActivarSemestre = function () {
        var params = { idSemestre: $scope.idSemAct };
        serviceCRUD.TypePost('mantenimiento/semestre_activar', params).then(function (res) {
            $('#mdActivarSemestre').modal('hide');
            Swal.fire({
                type: 'success',
                title: 'Semestre activado'
            })
            obtenerSemActual();
        })
    }

    function obtenerSemActual() {
        serviceCRUD.TypePost('mantenimiento/nombre_semestre', null).then(function (res) {
            $scope.semActual = res.data.nombre;
        })
    }

    $scope.btnCrearSem = function () {
        $scope.nomSem = null;
        $('#mdCrearSemestre').appendTo("body").modal('show');
    }

    $scope.btnActSem = function () {
        serviceCRUD.TypePost('mantenimiento/semestres_no_activos', null).then(function (res) {
            $scope.lstSemActivos = res.data;
        })
        $scope.idSemAct = '0';
        $('#mdActivarSemestre').appendTo("body").modal('show');
    }

    $scope.btnTermSem = function () {
        $('#mdTerminarSemestre').appendTo("body").modal('show');
    }

    obtenerSemActual();
})