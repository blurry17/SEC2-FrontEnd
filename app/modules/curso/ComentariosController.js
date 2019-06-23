app.controller('ComentariosController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    $rootScope.user = usuario;
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.idActividad = $scope.actividad.idActividad;
    $scope.vistaProfesor = usuario.profesor;
    //Para saber si el alumno envió un comentario o no
    $scope.envioComentario = false;
    $scope.lstComentarios = []
    $scope.verRespuestaProf = null;
    $scope.mostrarPantallaComenta = false;
    $scope.mostrarPantallaNoComenta = false;
    $scope.noPuedeComentarAun = false;

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
        idAlumno: null,
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


    function obtenerComentarios() {
        var params = { idActividad: $scope.actividad.idActividad }
        console.dir($scope.actividad.idActividad)
        serviceCRUD.TypePost('actividad/listar_comentarios', params).then(function (res) {
            $scope.lstComentarios = res.data.listaComentarios;
            if (!usuario.profesor) {
                for (let i = 0; i < $scope.lstComentarios.length; i++) {
                    if ($scope.lstComentarios[i].codAlumno == usuario.codigoPUCP) {
                        $scope.envioComentario = true;
                        $scope.verRespuestaProf = $scope.lstComentarios[i];
                        console.dir($scope.verRespuestaProf)
                    }
                }
                var params2 = {
                    idAlumno: usuario.idUser,
                    idActividad: $scope.actividad.idActividad,
                    tipo: 4,
                    idCalificador: 1
                }
                if ($scope.envioComentario == false) {
                    serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params2).then(function (res2) {
                        console.dir(res2.data.flgCalificado)
                        if (!res2.data.flgCalificado) {
                            $scope.noPuedeComentarAun = true;
                            $scope.mostrarPantallaNoComenta = true;
                        }
                        $scope.mostrarPantallaComenta = true;
                    })
                }

            }
        })
    }

    function init() {
        obtenerComentarios();
    }

    init();
})