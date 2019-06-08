app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.idActividad = $scope.actividad.idActividad;
    $scope.vistaAlumno = usuario.alumno;


    

})