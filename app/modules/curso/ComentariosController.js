app.controller('ComentariosController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    console.dir(usuario);
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.idActividad = $scope.actividad.idActividad;
    $scope.vistaProfesor = usuario.profesor;
    //Para saber si el alumno envió un comentario o no
    $scope.envioComentario = false;


    $scope.comentario = {
        idActividad: $scope.idActividad,
        idAlumno: usuario.idUser,
        comentario: ""
    }

    /* Guardar Comentario como alumno */
    $scope.btnGuardarComentario = function () {
        serviceCRUD.TypePost('actividad/ingresar_comentario_alumno', $scope.comentario).then(function (response) {
            console.dir($scope.comentario.comentario);
            console.dir(response);
            if (response.data.error == 1)
                window.alert(response.data.mensaje + '.\n' + "Por favor, inténtelo nuevamente");
            else
                window.alert("Se guardó el comentario!")
        })
    }

    $scope.respuesta = {
        idActividad: $scope.idActividad,
        idAlumno : null,
        idProfesor: usuario.idUser,
        respuesta: ""
    }

    /* Guardar Respuesta como profesor */
    $scope.btnGuardarRespuesta = function (comentario) {
        //Obtengo el idAlumno del comentario y lo envio junto a la respuesta
        $scope.respuesta.idAlumno = comentario.idAlumno;
        serviceCRUD.TypePost('actividad/responder_comentario_alumno', $scope.respuesta).then(function (response) {
            console.dir(response);
            window.alert("Se guardó la respuesta!")
        })
    }

    /* Esto no debe estar hardcodeado. Falta el servicio de listar comentariosXactividad */
    $scope.lstComentarios = [
        {
            //Este comentario como ya tiene respuesta
            //Deberia mostrarse sin poder editar
            idAlumno: 1,
            nomAlumno: "Alumno 1",
            codAlumno: "19964321",
            nomProfesor: "Ernesto Torres",
            comentario: "hola profe xd",
            respuesta: "ola"
        },
        {
            //Este comentario como ya tiene respuesta
            //Deberia mostrarse para editar
            idAlumno: 2,
            nomAlumno: "Alumno 2",
            codAlumno: "19975432",
            nomProfesor: "Ernesto Torres",
            comentario: "profe no me salio la 2 ayude pues",
            respuesta: ""
        }
    ]
})