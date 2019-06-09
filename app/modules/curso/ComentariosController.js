app.controller('ComentariosController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    console.dir(usuario);
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.idActividad = $scope.actividad.idActividad;
    $scope.vistaProfesor = usuario.profesor;
    //Para saber si el alumno envió un comentario o no
    $scope.envioComentario = false;
    $scope.lstComentarios = []

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
            /* 
            if (response.data.error == 1)
                window.alert(response.data.mensaje + '.\n' + "Por favor, inténtelo nuevamente");
            else
                window.alert("Se guardó el comentario!")
            */
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

    function mostrarComentarios(){
        var params = { idActividad: $scope.actividad.idActividad }

        serviceCRUD.TypePost('actividad/listar_comentarios', params).then(function (res) {
            console.dir('comentariosss')
            console.dir(res.data)
            $scope.lstComentarios = res.data;
            
        })
    }

    

    function init() {
        if (usuario.profesor == 1)
            mostrarComentarios();
    }

    init();
})