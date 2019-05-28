app.controller('ComentariosController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.vistaProfesor = usuario.profesor;

    $scope.lstComentarios = [
        {
            idComentario: 1,
            nomAlumno: "Alumno 1",
            codAlumno : "19964321",
            nomProfesor: "daniel alpiste",
            comentario: "hola profe xd",            
            respuesta: "ola"
        },
        {
            idComentario: 2,
            nomAlumno: "Alumno 2",
            codAlumno : "19975432",
            nomProfesor: "nicolas",
            comentario: "profe no me salio la 2 ayude pues",            
            respuesta: ""
        }
    ]
})