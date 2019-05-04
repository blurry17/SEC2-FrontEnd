app.controller('CalificacionesController', function ($scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")

    var file = null;

    $scope.irActividad = function () {
        $location.path("actividad")
    }
    $scope.irCurso = function () {
        $location.path("curso")
    }

    $scope.btnclick = function () {
        file = document.getElementById('file').files;

        var datos = new FormData();

        datos.append("idActividad", 1);
        datos.append('idUsuario', 1);
        datos.append('tipo', 1);
        datos.append('fecha', new Date());
        datos.append('files', file);
        datos.append('url', '');

        return $http({
            url: 'http://localhost:5000/api/entregable/entrega',
            method: 'POST',
            data: datos,
            headers: { 'Content-Type': undefined },
            //prevents serializing datos.  don't do it.
            transformRequest: angular.identity
        });

        var params = {
            idActividad: 1,
            idUsuario: 1,
            tipo: 1,
            fecha: new Date(),
            files: file,
            url: ''
        }

        console.dir(file);
        serviceCRUD.TypePostFile('entregable/entrega', params).then(function (response) {
            console.dir(response);
        })
    }





    var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;
})