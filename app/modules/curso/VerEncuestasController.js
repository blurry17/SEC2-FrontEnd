app.controller('VerEncuestasController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.listaAl = [];
    $scope.listaGrupal = [];
    $scope.coEval = [];
    $scope.lstAspectos = [];

    $scope.reg = {
        idalumno: 0,
    };

    $scope.flgCrear = $cookies.getObject("flgCrear");

    if ($scope.flgCrear) $scope.hayRegHorasActividad = true;

    $scope.alumno = {
        idAlumno: 0,
    }
    $scope.grupo = {
        idGrupal: 0,
    };
    $scope.rubricaAuto = null;
    $scope.true = true;

    $scope.regEsfuerzo = {
        tipo: 1,
        idActividadUHorario: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        listaCategorias: []
    };

    $scope.regEsfuerzoHoras = {
        idRegistroEsfuerzo: $scope.regEsfuerzo.idRegistroEsfuerzo,
        idAlumno: null,
        listaCategorias: $scope.regEsfuerzo.listaCategorias
    }

    $scope.hayRegHorasActividad = false;
    $scope.hayRegCategoriasActividad = false;

    $scope.obtenerAuto = function () {
        let aux = {
            idActividad: $scope.actividad.idActividad,
            tipo: 2,
        }

        serviceCRUD.TypePost('actividad/obtener_rubrica', aux).then(function (res) {
            if (res.data.succeed == false) {
                Swal.fire({
                    title: 'Aviso!',
                    text: 'No existe una autoevaluación',
                    type: 'warning',
                    confirmButtonText: 'Ok'
                })
                $scope.rubricaAuto = null;
            } else {
                let params = {
                    idActividad: $scope.actividad.idActividad,
                    idAlumno: $scope.alumno.idAlumno,
                }

                serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion', params).then(function (res) {
                    if (res.data.nota == null) {
                        Swal.fire({
                            title: 'Aviso!',
                            text: 'El alumno aun no responde su autoevaluación',
                            type: 'warning',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubricaAuto = null;
                    } else {
                        $scope.rubricaAuto = res.data;
                    }

                })

            }

        })

    }

    $scope.obtenerCo = function () {
        var params = {
            idGrupo: $scope.grupo.idGrupal,
            idActividad: $scope.actividad.idActividad,
        }
        serviceCRUD.TypePost('coevaluacion/obtener_notas_grupos', params).then(function (res) {

            $scope.coEval = res.data.listaNotas;
            $scope.lstAspectos = res.data.listaNotas[0].nombreAspectos;

        })
    }

    $scope.siguienteG = function () {
        let encontrado = false;
        let i = 0;
        if ($scope.grupo.idGrupal == 0) {
            $scope.grupo.idGrupal = $scope.listaGrupal[0].idGrupo;
        } else {
            for (i; i < $scope.listaGrupal.length; i++) {
                if (($scope.listaGrupal[i].idGrupo == $scope.grupo.idGrupal) && (encontrado == false)) {
                    let aux = $scope.listaGrupal[i + 1].idGrupo;
                    $scope.grupo.idGrupal = aux;
                    encontrado = true;
                    //$scope.grupo.idGrupal=$scope.listaGrupal[i+1].idGrupo;
                }

            }

        }
        let aux = {
            idGrupo: $scope.actividad.idActividad,
            tipo: 3,
        }

    }

    $scope.siguiente = function () {
        let i = 0;
        let encontrado = false;
        if ($scope.alumno.idAlumno == 0) {
            $scope.alumno.idAlumno = $scope.listaAl[0].idUsuario;
        } else {
            for (i; i < $scope.listaAl.length; i++) {
                if (($scope.listaAl[i].idUsuario == $scope.alumno.idAlumno) && (encontrado == false)) {
                    let aux = $scope.listaAl[i + 1].idUsuario;
                    $scope.alumno.idAlumno = aux;
                    encontrado = true;
                    //$scope.grupo.idGrupal=$scope.listaGrupal[i+1].idGrupo;
                }

            }

        }
        let aux = {
            idActividad: $scope.actividad.idActividad,
            tipo: 2,
        }

        serviceCRUD.TypePost('actividad/obtener_rubrica', aux).then(function (res) {
            if (res.data.succeed == false) {
                Swal.fire({
                    title: 'Aviso!',
                    text: 'No existe una autoevaluación',
                    type: 'warning',
                    confirmButtonText: 'Ok'
                })
                $scope.rubricaAuto = null;
            } else {
                let params = {
                    idActividad: $scope.actividad.idActividad,
                    idAlumno: $scope.alumno.idAlumno,
                }
                serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion', params).then(function (res) {
                    if (res.data.nota == null) {
                        Swal.fire({
                            title: 'Aviso!',
                            text: 'El alumno aun no responde su autoevaluación',
                            type: 'warning',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubricaAuto = null;
                    } else {
                        $scope.rubricaAuto = res.data;
                    }

                })

            }

        })
    }

    $scope.listarGrupo = function () {
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaGrupal = res.data;
        })
    }

    //Como profesor: Crear Registro Horas
    $scope.btnCrearRegistroHoras = function () {

        $cookies.putObject('flgCrear', 1);

        serviceCRUD.TypePost('registro_horas/crear_registro_horas', $scope.regEsfuerzo).then(function (res) {

        })
    }

    //Como alumno: Registrar Horas
    $scope.btnRegistrarHoras = function () {

        serviceCRUD.TypePost('registro_horas/registrar_horas', $scope.regEsfuerzoHoras).then(function (res) {

        })
    }

    //Como profesor y alumno: Obtener registro horas x alumno
    $scope.obtenerRegistroHorasXAlumno = function () {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.reg.idalumno
        }

        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.reg.idalumno
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasActividad = true;
        })
    }

    $scope.obtenerRegHorasComoAlumno = function () {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.usuario.idUser
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasActividad = true;
        })
    }

    //Como profesor y alumno: Obtener registro horas (solo categorias)
    function obtenerRegistroHorasSoloCategorias() {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas', params).then(function (res) {
            if (res.data.succeed == false) {
                $scope.flgCrear = false;
                return;
            }
            else {
                //Asigno el objeto registro horas categoria al registro horas con respuestas

                $scope.flgCrear = true;
                $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
                $scope.regEsfuerzoHorasidAlumno = $scope.usuario.idUser;
                $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
                for (let i = 0; i < $scope.regEsfuerzoHoras.listaCategorias.length; i++) {
                    $scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas = []
                }
                $scope.hayRegCategoriasActividad = true;
            }

        })
    }

    //Como profesor: Agregar una categoria
    $scope.btnAgregarCategoria = function () {
        $scope.regEsfuerzo.listaCategorias.push({
            descripcion: ''
        });
    }

    //Como profesor: Quitar una categoria
    $scope.btnQuitarCategoria = function (categoria) {
        var pos = $scope.regEsfuerzo.listaCategorias.indexOf(categoria)
        $scope.regEsfuerzo.listaCategorias.splice(pos, 1)
    }

    //Como alumno puedo agregar una respuesta a una categoria
    $scope.btnAgregarRespuesta = function (categoria) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)

        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.push({
            descripcion: '',
            horasPlanificadas: null,
            horasReales: null
        })
    }

    //Como alumno: Quitar una respuesta de una categoria
    $scope.btnQuitarRespuesta = function (categoria, respuesta) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        var pos2 = $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.indexOf(respuesta);
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.splice(pos2, 1)
    }


    function init() {
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            $scope.listaAl = res.data;
        })
        $scope.mostrar = true;

        $scope.listarGrupo();
        obtenerRegistroHorasSoloCategorias();
        if ($scope.flgCrear) $scope.obtenerRegistroHorasXAlumno();
    }

    init();
})