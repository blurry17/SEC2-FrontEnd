app.controller('VerEncuestasController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.listaAl=[];

    $scope.obtenerAuto = function () {
        let params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.usuario.idUser,
        }
        serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion', params).then(function (res) {
            $scope.rubricaAuto = res.data;
            if (res.data.nota == null || res.data==null || res==null) {
                Swal.fire({
                    title: 'Aviso!',
                    text: 'El alumno aun no registra su autoevaluación',
                    type: 'warning',
                    confirmButtonText: 'Ok'
                })
                $scope.auTieneNota = false;
            } else {
                $scope.auTieneNota = true;
            }
        })
    }


    function init() {
        console.dir($scope.curso);
        console.dir($scope.usuario);
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            console.dir(res.data);
            $scope.listaAl = res.data;
        })
        $scope.mostrar = true;


    }

    init();
})