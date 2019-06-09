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
    $scope.flgCalificado = null;
    $scope.editar = null;
    $scope.auxNotaNivel = 0;
    $scope.nomRubrica="";

    /* $scope.sumaInd = function (asp) {
        if (asp.tipoClasificacion != 1) return null;
        var sum = 0;
        for (let i = 0; i < asp.listaNotaIndicador.length; i++) {
            sum += parseInt(asp.listaNotaIndicador[i].nota);
        }
        asp.nota = sum;
        return sum;
    } */

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        listaNotaAspectos: [],
    }

    $scope.btnEditar = function () {
        $scope.flgCalificado = false;
        $scope.editar = true;
    }
//sacar de frende de lista aspectos
    $scope.ObtenerNotas = function () {
        if ($scope.idalumno == '0') return;
        $scope.editar = false;
        var params = {
            idAlumno: $scope.idalumno,
            idActividad: $scope.actividad.idActividad,
            tipo: 4,
            idCalificador: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params).then(function (res) {
            $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
            $scope.notaFinal = res.data.calificacion.nota;
            $scope.flgCalificado = res.data.flgCalificado;
            $scope.falta=res.data.calificacion.flgFalta==1;
            console.dir("Estos es la respuesta");
            console.dir(res.data);
            console.dir("Esta es la rubrica");
            console.dir($scope.rubrica);
            for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                    $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
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
                listaNotaAspectos: $scope.listaNotaAspectos            
            }        
            serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
            })
            window.alert("Las notas han sido validadas satisfactoriamente!")
        }
    } */

    $scope.btnAgregarComentario = function (x) {
        x.puedeComentar = true;
    }

    $scope.marcado = function () {
        $scope.falta = true;
    }

    $scope.btnGuardarPuntaje = function () {
        /* 
        for (let i = 0; i < $scope.listaNotaAspectos.length; i++) {
            if ($scope.listaNotaAspectos[i].tipoClasificacion != 3) {
                if ($scope.listaNotaAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        if ($scope.listaNotaAspectos[i].listaNotaIndicador[j].nota == null || $scope.listaNotaAspectos[i].listaNotaIndicador[j].nota == NaN){
                            window.alert('Falta registrar la nota de un indicador');
                            return;
                        }
                    }
                }
            }
        }
        */
        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            if ($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == null || $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == NaN) {
                                window.alert('Falta registrar la nota de un nivel');
                                return;
                            }
                        }

                    }
                }
            }
        }

        window.confirm('¿Está seguro que desea guardar?');
        /*  
                for (let i = 0; i < $scope.listaNotaAspectos.length; i++) {
                    if ($scope.listaNotaAspectos[i].tipoClasificacion != 3) {
                        $scope.listaNotaAspectos[i].nota = parseInt($scope.listaNotaAspectos[i].nota);
                        if ($scope.listaNotaAspectos[i].tipoClasificacion == 1) {
                            for (let j = 0; j < $scope.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                                $scope.listaNotaAspectos[i].listaNotaIndicador[j].nota = parseInt($scope.listaNotaAspectos[i].listaNotaIndicador[j].nota);
                            }
                        }
                    }
        */
       console.dir('2');
        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    $scope.rubrica.listaNotaAspectos[i].nota=0;
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        $scope.rubrica.listaNotaAspectos[i].nota=$scope.rubrica.listaNotaAspectos[i].nota+$scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                        }
                    }
                }
            }
            else {
                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
            }
        }
        
        
        console.dir('3');
        if ($scope.editar == false) {
            var params = {
                idActividad: $scope.actividad.idActividad,
                idAlumno: $scope.idalumno,
                idJp: $scope.usuario.idUser,
                nota: parseInt($scope.notaFinal),
                flgFalta: $scope.falta ? 1 : 0,
                idRubrica: $scope.idRub,
                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                flgCompleto:1,
            }
            console.dir('entra a caificar');
            serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                }
                $scope.ObtenerNotas();
            })
        } else {
            var params = {
                idActividad: $scope.actividad.idActividad,
                idAlumno: $scope.idalumno,
                idJpN: $scope.usuario.idUser,
                idJpAnt:$scope.usuario.idUser,
                nota: parseInt($scope.notaFinal),
                flgFalta: $scope.falta ? 1 : 0,
                idRubrica: $scope.idRub,
                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                flgCompleto:1,
            }
            console.dir('entra a editar');
            console.dir(params);
            serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                }
                $scope.ObtenerNotas();
            })
        }
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

    function ListarAlumnos() {
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaAl = res.data.lista;
        })
    }

    $scope.elegirNivel = function (nivel,indicador,aspecto){
        indicador.nota = nivel.puntaje;
        aspecto.nota=indicador.nota;
    }

    function ObtenerRubrica() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: 4,
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {

            //$scope.rubrica.listaNotaAspectos = res.data.listaAspectos;
            //console.dir(res.data);

            console.dir(res.data.nombreRubrica);
            $scope.idRub = res.data.idRubrica;
            $scope.rubrica.nombreRubrica=res.data.nombreRubrica

            /* for (let i = 0; i < $scope.listaNotaAspectos.length; i++) {
                $scope.listaNotaAspectos[i].listaNotaIndicador = $scope.listaNotaAspectos[i].listaIndicadores;
                $scope.listaNotaAspectos[i].comentario = '';
                $scope.listaNotaAspectos[i].puedeComentar=false;
                delete $scope.listaNotaAspectos[i].listaIndicadores;
                for (let j = 0; j < $scope.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                    $scope.listaNotaAspectos[i].listaNotaIndicador[j].comentario = '';
                    $scope.listaNotaAspectos[i].listaNotaIndicador[j].puedeComentar=false;
                }
            } */
        })
    }

    function init() {
        ListarAlumnos();
        ObtenerRubrica();
    }

    init();
})