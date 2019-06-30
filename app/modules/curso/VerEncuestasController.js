app.controller('VerEncuestasController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.listaAl = [];
    $scope.listaGrupal = [];
    $scope.alumno={
        idAlumno : 0,
    }
    $scope.grupo = {
        idGrupal: 0,
    };
    $scope.rubricaAuto = null;
    $scope.true = true;

    $scope.obtenerAuto = function () {
        console.dir('indice:');
        console.dir($scope.alumno.idAlumno);
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
                console.dir('Leer esto');
                console.dir($scope.alumno.idAlumno);

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
                        console.dir('Esta es la respuesta');
                        console.dir(res.data);

                    }

                })

            }

        })

    }

    $scope.obtenerCo = function () {

        console.dir($scope.grupo.idGrupal);
    }

    $scope.siguienteG = function () {
        let encontrado=false;
        let i = 0;
        if ($scope.grupo.idGrupal == 0) {
            $scope.grupo.idGrupal = $scope.listaGrupal[0].idGrupo;
        } else {
            for (i; i < $scope.listaGrupal.length; i++) {
                if (($scope.listaGrupal[i].idGrupo == $scope.grupo.idGrupal) && (encontrado==false)) {
                    let aux = $scope.listaGrupal[i + 1].idGrupo;
                    console.dir(aux);
                    $scope.grupo.idGrupal = aux;
                    encontrado=true;
                    //$scope.grupo.idGrupal=$scope.listaGrupal[i+1].idGrupo;
                }

            }

        }
        //console.dir($scope.grupo.idGrupal);
        let aux = {
            idGrupo: $scope.actividad.idActividad,
            tipo: 3,
        }

    }

    $scope.siguiente = function () {
        let i = 0;
        let encontrado=false;
        if ($scope.alumno.idAlumno == 0) {
            $scope.alumno.idAlumno = $scope.listaAl[0].idUsuario;
        } else {
            for (i; i < $scope.listaAl.length; i++) {
                console.dir('Comparar');
                console.dir($scope.listaAl[i].idUsuario);
                console.dir($scope.alumno.idAlumno);
                if (($scope.listaAl[i].idUsuario == $scope.alumno.idAlumno) && (encontrado==false)) {
                    let aux = $scope.listaAl[i + 1].idUsuario;
                   /*  console.dir('indice:')
                    console.dir(aux); */
                    $scope.alumno.idAlumno = aux;
                    encontrado=true;
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
                console.dir('Leer esto');
                console.dir($scope.alumno.idAlumno);

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
                        console.dir('Esta es la respuesta');
                        console.dir(res.data);

                    }

                })

            }

        })
    }

    $scope.listarGrupo = function () {
        //console.dir("hola");
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
            $scope.listaGrupal = res.data;
            console.dir('GRUPOS:');
            console.dir(res.data);
        })
    }

    function init() {
        console.dir($scope.curso);
        console.dir($scope.usuario);
        console.dir($scope.actividad);
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            console.dir('Leer Lista Al');
            console.dir(res.data);
            $scope.listaAl = res.data;
        })
        $scope.mostrar = true;

        $scope.listarGrupo();

    }

    init();
})