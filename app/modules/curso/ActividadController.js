
app.controller('ActividadController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.esIndividual = false;
    $scope.esGrupal = false;
    $scope.actividad.tipo == 'I' ? $scope.esIndividual = true : $scope.esGrupal = true;
    $scope.esProfesor = $scope.usuario.profesor;


    if ($scope.actividad.minInicio == "0") $scope.actividad.minInicio = $scope.actividad.minInicio + "0";
    if ($scope.actividad.minFin == "0") $scope.actividad.minFin = $scope.actividad.minFin + "0";

    $scope.btnCalificaciones = function () {
        $location.path('calificaciones');
    }

    $scope.btnGrupos = function () {
        $location.path('grupos');
    }

    $scope.btnRubrica = function () {
        $location.path("rubrica")
    }

    $scope.btnEstadisticas = function () {
        $location.path("estadisticas")
    }

    $scope.btnComentarios = function () {
        $location.path("comentarios")
    }
})