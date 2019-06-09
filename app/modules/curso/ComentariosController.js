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
    $scope.verRespuestaProf = null;
    $scope.mostrarPantalla = false;

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


    function obtenerComentarios(){
        var params = { idActividad: $scope.actividad.idActividad }
        console.dir($scope.actividad.idActividad)
        serviceCRUD.TypePost('actividad/listar_comentarios', params).then(function (res) {
            $scope.lstComentarios = res.data.listaComentarios;
        if(!usuario.profesor){
            for (let i = 0; i < $scope.lstComentarios.length; i++) {
                if($scope.lstComentarios[i].codAlumno == usuario.codigoPUCP){
                    $scope.envioComentario = true;
                    
                    $scope.verRespuestaProf = $scope.lstComentarios[i];
                    console.dir($scope.verRespuestaProf)
                }
            }
            $scope.mostrarPantalla = true;
        }
        })
    }

    function init() {
        obtenerComentarios();
    }

    init();
})