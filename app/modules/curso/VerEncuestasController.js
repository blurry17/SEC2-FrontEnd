app.controller('VerEncuestasController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.listaAl = [];
    $scope.idAlumno = 0;
    $scope.rubricaAuto = null;
    $scope.true=true;

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
                $scope.rubricaAuto=null;
            } else {
                let params = {
                    idActividad: $scope.actividad.idActividad,
                    idAlumno: $scope.idAlumno,
                }
                console.dir('Leer esto');
                console.dir($scope.idAlumno);

                serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion', params).then(function (res) {
                    if(res.data.nota==null){
                        Swal.fire({
                            title: 'Aviso!',
                            text: 'El alumno aun no responde su autoevaluación',
                            type: 'warning',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubricaAuto=null;
                    }else{
                        $scope.rubricaAuto = res.data;
                        console.dir('Esta es la respuesta');
                        console.dir(res.data);

                    }

                })

            }

        })

    }

    $scope.siguiente=function(){
        $scope.idAlumno++;
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
                $scope.rubricaAuto=null;
            } else {
                let params = {
                    idActividad: $scope.actividad.idActividad,
                    idAlumno: $scope.idAlumno,
                }
                console.dir('Leer esto');
                console.dir($scope.idAlumno);

                serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion', params).then(function (res) {
                    if(res.data.nota==null){
                        Swal.fire({
                            title: 'Aviso!',
                            text: 'El alumno aun no responde su autoevaluación',
                            type: 'warning',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubricaAuto=null;
                    }else{
                        $scope.rubricaAuto = res.data;
                        console.dir('Esta es la respuesta');
                        console.dir(res.data);

                    }

                })

            }

        })
    }

    function init() {
        console.dir($scope.curso);
        console.dir($scope.usuario);
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            console.dir('Leer Lista Al');
            console.dir(res.data);
            $scope.listaAl = res.data;
        })
        $scope.mostrar = true;


    }

    init();
})