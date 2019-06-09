app.controller('AdministrarUSuariosController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {



    $scope.listaAl = [];




    function ListarAlumnos() {
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaAl = res.data.lista;
            console.dir(res.data);
        })
    }


})