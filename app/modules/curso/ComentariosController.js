app.controller('ComentariosController', function ($scope, $location, $cookies, serviceUtil, serviceCRUD) {

    $scope.vistaProfesor = false

    $scope.lstComentarios = [
        {
            idComentario: 1,
            nomAlumno: "patty salinas",
            codAlumno : "20140631",
            nomProfesor: "daniel alpiste",
            comentario: "hola profe xd",            
            respuesta: "calla gil"
        },
        {
            idComentario: 2,
            nomAlumno: "elizabeth esparza",
            codAlumno : "20135152",
            nomProfesor: "nicolas",
            comentario: "profe no me salio la 2 ayude pues ptm",            
            respuesta: ""
        }
    ]
})