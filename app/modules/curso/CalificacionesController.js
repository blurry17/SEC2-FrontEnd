app.controller('CalificacionesController', function ($scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
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
        console.dir(file);
        var datos = new FormData();
        var hoy = new Date();
        datos.append("idActividad", 1);
        datos.append('idUsuario', 1);
        datos.append('tipo', 1);
        datos.append('cantidadFiles',1)
        datos.append('fechaEntrega', serviceUtil.ddmmyyyy(hoy));
        datos.append('files 1', file[0]);
        datos.append('files 2', file[1]);
        datos.append('url', '');
        //zconsole.dir({form:datos,files:file})

        return $http({
            url: 'http://localhost:5000/api/entregable/entrega',
            method: 'POST',
            data: datos,
            headers: { 'Content-Type': undefined },
            //prevents serializing datos.  don't do it.
            transformRequest: angular.identity
        }).then(function(respuesta){console.dir(respuesta)}).catch(function(error){console.dir(error)})
    }





    var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;
})