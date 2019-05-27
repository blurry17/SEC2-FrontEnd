app.controller('CalificacionesController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")
    $scope.listaAl = [];
    $scope.falta = false;
    $scope.profe = $scope.usuario.esProfesor;
    $scope.notaFinal = null;

    /*  $scope.sumaInd = function(asp){
         var sum = 0;
         for (let i = 0; i < asp.listaIndicadores.length; i++) {
             sum += parseInt(asp.listaIndicadores[i].puntajeAsignado);            
         }
         return sum;
     }
  */

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        lstAspectos: []
    }   

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

    $scope.btnAgregarComentario = function () {
        $scope.texto = true;
    }

    $scope.chckmarcado = function () {
        $scope.falta = false;
    }

    $scope.btnGuardarPuntaje = function () {
        result = window.confirm('¿Está seguro que desea Guardar?');

        for (let i = 0; i < $scope.lstAspectos.length; i++) {
            $scope.lstAspectos[i].nota = parseInt($scope.lstAspectos[i].nota);
            if ($scope.lstAspectos[i].tipoClasificacion == 1){
                for (let j = 0; j < $scope.lstAspectos[i].listaNotaIndicador.length; j++) {
                    $scope.lstAspectos[i].listaNotaIndicador[j].nota = parseInt($scope.lstAspectos[i].listaNotaIndicador[j].nota);                    
                }
            }            
        }

        var params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.idalumno,
            idJp: $scope.usuario.idUser,
            nota: parseInt($scope.notaFinal),
            flgFalta: $scope.falta ? 1 : 0,
            idRubrica: $scope.actividad.idRubrica,
            listaNotaAspectos: $scope.lstAspectos
        }

        serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {

        })
    }

    $scope.btnEditarPuntaje = function () {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.idalumno,
            nota: parseInt($scope.notaFinal),
            listaNotaAspectos: $scope.lstAspectos
        }

        serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {

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


        /* return $http({
            url: 'http://localhost:5000/api/entregable/entrega',
            method: 'POST',
            data: datos,
            headers: { 'Content-Type': undefined },
            //prevents serializing datos.  don't do it.
            transformRequest: angular.identity
        }).then(function(respuesta){console.dir(respuesta)}).catch(function(error){console.dir(error)}) */
    }

    //var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;

    function ListarAlumnos(){
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaAl = res.data.lista;
        })
    }

    function ObtenerRubrica(){
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            $scope.lstAspectos = res.data.listaAspectos;

            for (let i = 0; i < $scope.lstAspectos.length; i++) {
                $scope.lstAspectos[i].listaNotaIndicador = $scope.lstAspectos[i].listaIndicadores;
                $scope.lstAspectos[i].comentario = '';
                delete $scope.lstAspectos[i].listaIndicadores;
                for (let j = 0; j < $scope.lstAspectos[i].listaNotaIndicador.length; j++) {
                    $scope.lstAspectos[i].listaNotaIndicador[j].comentario = '';
                }
            }

            console.dir($scope.lstAspectos);
        })
    }

    function init() {
        ListarAlumnos();
        ObtenerRubrica();
    }

    init();
})