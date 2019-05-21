app.controller('CalificacionesController', function ($scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    //if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")
    $scope.listaAl=[];

    var params = {
        idActividad : 1
    }

    serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function(res){
        console.dir(res.data);
        $scope.listaAl=res.data.lista;
    })

    var file = null;

    $scope.irActividad = function () {
        $location.path("actividad")
    }
    $scope.irCurso = function () {
        $location.path("curso")
    }

    $scope.btnAgregarComentario= function(){
        $scope.texto=true;
    }
    $scope.btnAgregarComentario1= function(){
        $scope.texto1=true;
    }
    $scope.btnAgregarComentario2= function(){
        $scope.texto2=true;
    }
    $scope.btnAgregarComentario3= function(){
        $scope.texto3=true;
    }
    $scope.btnAgregarComentario4= function(){
        $scope.texto4=true;
    }

    $scope.btnclick = function () {
        file = document.getElementById('file').files;
        var datos = new FormData();
        var hoy = new Date();

        datos.append("idActividad", 1);
        datos.append('idUsuario', 1);
        datos.append('tipo', 1);
        datos.append('cantidadFiles', file.length)
        datos.append('fechaEntrega', serviceUtil.ddmmyyyy(hoy));
        datos.append('url', '');

        for (var i=0; i<file.length; i++){
            var name = 'file ' + (i+1);
            datos.append(name, file[i]);    
        }

        console.dir(serviceUtil.TypePostFile('entregable/entrega', datos));

        /* return $http({
            url: 'http://localhost:5000/api/entregable/entrega',
            method: 'POST',
            data: datos,
            headers: { 'Content-Type': undefined },
            //prevents serializing datos.  don't do it.
            transformRequest: angular.identity
        }).then(function(respuesta){console.dir(respuesta)}).catch(function(error){console.dir(error)}) */
    }





    var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;
})