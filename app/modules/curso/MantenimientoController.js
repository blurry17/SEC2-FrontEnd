app.controller('MantenimientoController', function ($rootScope, $cookies, serviceCRUD, $scope, $location) {
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $rootScope.user = $scope.usuario;
    $scope.semActual = '2019-1';
    $scope.especialidades = [
        {
            nombre: 'Ingeniería Informática'
        },
        {
            nombre: 'Ingeniería Civil'
        },
        {
            nombre: 'Ingeniería Mecánica'
        },
        {
            nombre: 'Ingeniería Industrial'
        },
        {
            nombre: 'Ingeniería Mecatrónica'
        }
    ]

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

    $scope.btnCrearSem = function () {
        $('#mdCrearSemestre').appendTo("body").modal('show');
    }

    $scope.btnActSem = function () {
        $('#mdActivarSemestre').appendTo("body").modal('show');
    }

    $scope.btnTermSem = function () {
        $('#mdTerminarSemestre').appendTo("body").modal('show');
    }
})