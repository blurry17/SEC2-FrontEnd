app.controller('MantenimientoController', function ($rootScope, $cookies, serviceCRUD, $scope, $location) {
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

    $scope.changeCheck = function () {

    }
})