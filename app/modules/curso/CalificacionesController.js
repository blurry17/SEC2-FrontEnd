app.controller('CalificacionesController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")
    $scope.listaAl = [];

    var params = {
        idActividad: $scope.actividad.idActividad
    }

    serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
        $scope.listaAl = res.data.lista;

    })

    var file = null;

    $scope.irActividad = function () {
        $location.path("actividad")
    }
    $scope.irCurso = function () {
        $location.path("curso")
    }
    $scope.btnValidarPuntaje = function () {
        /* Preguntar si desea validar los puntajes una vez llenados */
        result = window.confirm('¿Desea validar la calificación que dio el Jefe de Practica?');

    }

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        lstAspectos: []

    }


    serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {

        $scope.lstAspectos = res.data.listaAspectos;

        $scope.listaIn = [];
        $scope.lstTabla = $scope.lstAspectos;
        $scope.sumaIndicadores=0;

        for (let i = 0; i < $scope.lstAspectos.length; i++) {

            $scope.tipoAspecto=$scope.lstAspectos.aspecto.tipoClasificacion;

            var nombre = $scope.lstAspectos[i].descripcion;
            listaIn = $scope.lstAspectos[i].listaIndicadores;
            $scope.lstAspectos[i].nota=null;
            $scope.lstAspectos[i].comentario=null;
            $scope.sumaIndicadores=0;

            for (let j = 0; j < listaIn.length; j++) {
                listaIn[j].nota=null;
                
                listaIn[j].comentario=null;
                var obj = {
                    nombreAsp: nombre,
                    indicador: listaIn[j],

                }

                $scope.lstTabla.push(obj);

            }
        }

        console.dir($scope.lstAspectos);
    })

    $scope.btnAgregarComentario = function () {
        $scope.texto = true;
    }

    $scope.btnGuardarPuntaje =function(){
        result = window.confirm('¿Está seguro que desea Guardar?');
         var params={
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.idalumno,
            idJp:$scope.usuario.idUser,
            nota:$scope.notaFinal,
            flgFalta: $scope.falta ? 1 : 0,
            //idRubrica: ,
            listaNotaAspectos: $scope.lstAspectos 
        } 



        serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
            console.dir(res.data);
            
    
        })

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

        for (var i = 0; i < file.length; i++) {
            var name = 'file ' + (i + 1);
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