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

    $scope.alumno = {
        idAlumno: 0,
    }
    $scope.grupo = {
        idGrupal: 0,
    };
    $scope.rubricaAuto = null;
    $scope.true = true;

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
            console.dir(res.data);
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

    function init() {
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            $scope.listaAl = res.data;
        })
        $scope.mostrar = true;
        $scope.listarGrupo();
    }

    init();
})