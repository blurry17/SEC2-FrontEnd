app.controller('ComentariosController', function ($scope, $location, $cookies, serviceUtil, serviceCRUD) {

    //El comentario es sobre una actividad
    //Por lo tanto, necesito saber qué actividad es, de qué curso y qué alumno la escribió.
    //Tengo que identificar al profesor del curso y a los jps del curso
    //Porque quiero saber si un jp puede responder un comentario en particular
    //Para el caso de los laboratorios  que son revisados por un jp en específico
    //CONSULTAR SI TODOS LOS JPS PUEDEN RESPONDER COMENTARIOS O SOLAMENTE EL QUE ESTÁ ASIGNADO A UN LAB
    //Usar el horario de laboratorio del alumno y del jp

    //Servicios
    //idUsuario, tipoPermiso (si es profe o jp), idCurso, idActividad, idHorarioDeLaActividad

    //Requiero una lista así (aún por definir bien)
    listaComentarios = [
        {
            //Datos del alumno que REALIZA el comentario
            idUsuarioAlumno: "1",
            apellidoPaternoAlumno: "Paucar",
            apellidoMaternoAlumno: "Alpiste",
            nombresAlumno: "Martin Enrique",
            //Datos del profe o jp que RESPONDE el comentario
            idUsuarioRespuesta: "5", 
            apellidoPaternoRespuesta: "Dijkstra",
            apellidoMaternoRespuesta: "Ritchie",
            nombresRespuesta: "Steve Bill",
            //Datos del COMENTARIO
            comentario: "El laboratorio me pareció muy difícil xd",
            respuesta: "nada mano estaba ez"
        },
        {
            //Datos del alumno que REALIZA el comentario
            idUsuarioAlumno: "2",
            apellidoPaternoAlumno: "perez",
            apellidoMaternoAlumno: "gomez",
            nombresAlumno: "juan",
            //Datos del profe o jp que RESPONDE el comentario
            idUsuarioRespuesta: "",
            apellidoPaternoRespuesta: "",
            apellidoMaternoRespuesta: "",
            nombresRespuesta: "",
            //Datos del COMENTARIO
            comentario: "Profe cuánto valía la pregunta 1?",
            respuesta: "" //aun no respondida
        }
    ]


    $scope.lstComentarios

}