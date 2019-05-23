app.controller('ComentariosController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.vistaProfesor = usuario.profesor;

    $scope.lstComentarios = [
        {
            idComentario: 1,
            nomAlumno: "patty salinas",
            codAlumno : "20140631",
            nomProfesor: "daniel alpiste",
            comentario: "hola profe xd",            
            respuesta: "ola"
        },
        {
            idComentario: 2,
            nomAlumno: "elizabeth esparza",
            codAlumno : "20135152",
            nomProfesor: "nicolas",
            comentario: "profe no me salio la 2 ayude pues",            
            respuesta: ""
        }
    ]
})