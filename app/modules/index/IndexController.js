﻿app.controller('IndexController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;

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
})