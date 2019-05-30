app.controller('CalificacionesController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")
    $scope.listaAl = [];
    $scope.falta = false;
    $scope.idRub = null;
    $scope.profe = $scope.usuario.esProfesor;
    $scope.notaFinal = null;

    $scope.sumaInd = function (asp) {
        if (asp.tipoClasificacion != 1) return null;
        var sum = 0;
        for (let i = 0; i < asp.listaNotaIndicador.length; i++) {
            sum += parseInt(asp.listaNotaIndicador[i].nota);
        }
        asp.nota = sum;
        return sum;
    }


    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        lstAspectos: []
    }

    $scope.ObtenerNotas = function () {
        if ($scope.idalumno == '0') return;
        var params = {
            idAlumno: $scope.idalumno,
            idActividad: $scope.actividad.idActividad
        }

        serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params).then(function (res) {
            console.dir(res.data);
            $scope.lstAspectos = res.data.listaNotaAspectos;
            $scope.notaFinal = res.data.nota;

            for (let i = 0; i < $scope.lstAspectos.length; i++) {
                if ($scope.lstAspectos[i].tipoClasificacion == 3) {
                    $scope.lstAspectos[i].nota = $scope.lstAspectos[i].nota == 1;
                }
            }
        })
    }

    /* $scope.btnValidarPuntaje = function () {
        result = window.confirm('¿Desea validar la calificación que dio el Jefe de Practica?');
        $("#formAct").addClass("was-validated");
        if($scope.puntajeAsignado){
            var params=
            {
                idActividad: $scope.actividad.idActividad,
                idAlumno: $scope.idalumno,
                nota:$scope.sumInd,
                listaNotaAspectos: $scope.lstAspectos            
            }        
            serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
            })
            window.alert("Las notas han sido validadas satisfactoriamente!")
        }
    } */

    $scope.btnAgregarComentario = function (x) {
        x.puedeComentar=true;
    }

    $scope.chckmarcado = function () {
        $scope.falta = false;
    }

    $scope.btnGuardarPuntaje = function () {
        result = window.confirm('¿Está seguro que desea Guardar?');


        for (let i = 0; i < $scope.lstAspectos.length; i++) {
            console.dir($scope.lstAspectos[i]);
            if ($scope.lstAspectos[i].tipoClasificacion != 3) {
                $scope.lstAspectos[i].nota = parseInt($scope.lstAspectos[i].nota);
                if ($scope.lstAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.lstAspectos[i].listaNotaIndicador.length; j++) {
                        $scope.lstAspectos[i].listaNotaIndicador[j].nota = parseInt($scope.lstAspectos[i].listaNotaIndicador[j].nota);
                    }
                }
            }
            else {
                $scope.lstAspectos[i].nota = $scope.lstAspectos[i].nota ? 1 : 0;
            }
        }



        var params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.idalumno,
            idJp: $scope.usuario.idUser,
            nota: parseInt($scope.notaFinal),
            flgFalta: $scope.falta ? 1 : 0,
            idRubrica: $scope.idRub,
            listaNotaAspectos: $scope.lstAspectos
        }

        serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
            for (let i = 0; i < $scope.lstAspectos.length; i++) {
                if ($scope.lstAspectos[i].tipoClasificacion == 3) $scope.lstAspectos[i].nota = $scope.lstAspectos[i].nota == 1;
            }
        })
    }

    /* $scope.btnEditarPuntaje = function () {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.idalumno,
            nota: parseInt($scope.notaFinal),
            listaNotaAspectos: $scope.lstAspectos
        }

        serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {

        })
    } */

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

    function ListarAlumnos() {
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaAl = res.data.lista;
        })
    }

    function ObtenerRubrica() {
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            $scope.lstAspectos = res.data.listaAspectos;
            $scope.idRub = res.data.idRubrica;
            for (let i = 0; i < $scope.lstAspectos.length; i++) {
                $scope.lstAspectos[i].listaNotaIndicador = $scope.lstAspectos[i].listaIndicadores;
                $scope.lstAspectos[i].comentario = '';
                $scope.lstAspectos[i].puedeComentar=false;
                delete $scope.lstAspectos[i].listaIndicadores;
                for (let j = 0; j < $scope.lstAspectos[i].listaNotaIndicador.length; j++) {
                    $scope.lstAspectos[i].listaNotaIndicador[j].comentario = '';
                    $scope.lstAspectos[i].listaNotaIndicador[j].puedeComentar=false;
                }
            }
        })
    }

    

    function init() {
        ListarAlumnos();
        //ObtenerRubrica();
    }

    init();
})