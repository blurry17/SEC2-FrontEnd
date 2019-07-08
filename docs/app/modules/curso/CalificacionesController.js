app.controller('CalificacionesController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    console.dir($scope.usuario)
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.listaAl = [];
    $scope.listaGrupal = [];
    $scope.esActIndividual = false;
    $scope.mostrar = false;
    $scope.falta = false;
    $scope.idRub = null;
    $scope.idalumno=0;
    $scope.profe = $scope.usuario.profesor;
    $scope.notaFinal = null;
    $scope.flgCalificado = null;
    $scope.editar = null;
    $scope.auxNotaNivel = 0;
    $scope.nomRubrica = "";
    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        listaNotaAspectos: [],
    }
    $scope.archivos = null;
    $scope.data = {
        url: null
    }

    $scope.esJP = $scope.usuario.jp;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    $scope.siguiente = function () {
        let i = 0;
        let encontrado = false;
        console.dir($scope.listaAl);
        console.dir($scope.idalumno);
        if ($scope.idalumno == 0) {
            $scope.idalumno = $scope.listaAl[0].idAlumno;
        } else {
            for (i; i < $scope.listaAl.length; i++) {
                if (($scope.listaAl[i].idAlumno == $scope.idalumno) && (encontrado == false)) {
                    let aux = $scope.listaAl[i + 1].idAlumno;
                    $scope.idalumno = aux;
                    encontrado = true;
                    //$scope.grupo.idGrupal=$scope.listaGrupal[i+1].idGrupo;
                }

            }

        }
        if ($scope.actividad.tipo == "I" || $scope.usuario.alumno) {
            if ($scope.usuario.alumno == 1) {
                $scope.idalumno = $scope.usuario.idUser;
            }
            else if ($scope.idalumno == '0') return;
            $scope.editar = false;
            mostrarEntregables($scope.idalumno);
            var params = {
                idAlumno: $scope.idalumno,
                idActividad: $scope.actividad.idActividad,
                tipo: 4,
                idCalificador: $scope.usuario.idUser
            }
            serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params).then(function (res) {
                console.dir('Busca nota');
                console.dir(res.data);
                $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                $scope.notaFinal = res.data.calificacion.nota;
                $scope.Calificado = res.data.flgCalificado;
                $scope.flgCalificado = $scope.usuario.alumno == 1 ? true : res.data.flgCalificado;
                $scope.falta = res.data.calificacion.flgFalta == 1;
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                }
            })
        }
        else {
            if ($scope.idgrupo == '0') return;
            $scope.editar = false;
            var params = {
                idActividad: $scope.actividad.idActividad,
                idGrupo: $scope.idgrupo,
                idJp: $scope.usuario.idUser,
                idRubrica: $scope.idRub,
            }
            console.dir(params);
            serviceCRUD.TypePost('actividad/alumnos/obtener_nota_grupo', params).then(function (res) {
                //console.dir("ESTO ES LA RUB GRUPO")
                console.dir(res.data);
                $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                $scope.notaFinal = res.data.calificacion.nota;
                $scope.flgCalificado = res.data.flgCalificado;
                $scope.falta = res.data.calificacion.flgFalta == 1;
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                }
            })
        }
    }
    
    $scope.btnEditar = function () {
        $scope.flgCalificado = false;
        $scope.editar = true;
    }
    //sacar de frende de lista aspectos
    $scope.ObtenerNotas = function () {
        console.dir($scope.idalumno)
        if ($scope.actividad.tipo == "I" || $scope.usuario.alumno) {
            if($scope.usuario.alumno==1){
                if ($scope.usuario.alumno == 1) {
                    $scope.idalumno = $scope.usuario.idUser;
                }
                if ($scope.idalumno == '0') return;
                $scope.editar = false;
                mostrarEntregables($scope.idalumno);
                var params = {
                    idAlumno: $scope.idalumno,
                    idActividad: $scope.actividad.idActividad,
                    tipo: 4,
                    idCalificador: $scope.usuario.idUser
                }
                serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno_publicada', params).then(function (res) {
                    console.dir("respuesta de alumno");
                    console.dir(res);
                    if(res.data.succeed==false){
                        Swal.fire({
                            title: 'Error!',
                            text: 'Aun no ha sido calificado',
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubrica=null;
                    }else{

                        $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                        $scope.notaFinal = res.data.calificacion.nota;
                        $scope.flgCalificado = $scope.usuario.alumno == 1 ? true : res.data.flgCalificado;
                        $scope.falta = res.data.calificacion.flgFalta == 1;
                        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                            }
                        }
                    }
                })

            }else{
                if ($scope.usuario.alumno == 1) {
                    $scope.idalumno = $scope.usuario.idUser;
                }
                if ($scope.idalumno == '0') return;
                $scope.editar = false;
                mostrarEntregables($scope.idalumno);
                var params = {
                    idAlumno: $scope.idalumno,
                    idActividad: $scope.actividad.idActividad,
                    tipo: 4,
                    idCalificador: $scope.usuario.idUser
                }
                serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params).then(function (res) {
                    $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                    $scope.notaFinal = res.data.calificacion.nota;
                    $scope.flgCalificado = $scope.usuario.alumno == 1 ? true : res.data.flgCalificado;
                    $scope.falta = res.data.calificacion.flgFalta == 1;
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                            $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                        }
                    }
                })

            }
        }
        else {
            if ($scope.idgrupo == '0') return;
            if($scope.usuario.alumno==1){
                if ($scope.usuario.alumno == 1) {
                    $scope.idalumno = $scope.usuario.idUser;
                }
                if ($scope.idalumno == '0') return;
                $scope.editar = false;
                mostrarEntregables($scope.idgrupo);
                var params = {
                    idActividad: $scope.actividad.idActividad,
                    idGrupo: $scope.idgrupo,
                    idJp: $scope.usuario.idUser,
                    idRubrica: $scope.idRub,
                }
                serviceCRUD.TypePost('actividad/alumnos/obtener_nota_grupo_publicada', params).then(function (res) {
                    console.dir("respuesta de alumno");
                    console.dir(res);
                    if(res.data.succeed==false){
                        Swal.fire({
                            title: 'Error!',
                            text: 'Aun no han sido calificados',
                            type: 'error',
                            confirmButtonText: 'Ok'
                        })
                        $scope.rubrica=null;
                    }else{

                        $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                        $scope.notaFinal = res.data.calificacion.nota;
                        $scope.flgCalificado = $scope.usuario.alumno == 1 ? true : res.data.flgCalificado;
                        $scope.falta = res.data.calificacion.flgFalta == 1;
                        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                            }
                        }
                    }
                })

            }else{
           
                $scope.editar = false;
                mostrarEntregables($scope.idgrupo);
                var params = {
                    idActividad: $scope.actividad.idActividad,
                    idGrupo: $scope.idgrupo,
                    idJp: $scope.usuario.idUser,
                    idRubrica: $scope.idRub,
                }
                serviceCRUD.TypePost('actividad/alumnos/obtener_nota_grupo', params).then(function (res) {
                    $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                    $scope.notaFinal = res.data.calificacion.nota;
                    $scope.flgCalificado = res.data.flgCalificado;
                    $scope.falta = res.data.calificacion.flgFalta == 1;
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                            $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                        }
                    }
                })
            }

        }
    }


    $scope.btnAgregarComentario = function (x) {
        x.puedeComentar = true;
    }

    $scope.marcado = function () {
        $scope.falta = !$scope.falta;
    }

    $scope.btnGuardarPuntaje = function () {
        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            if ($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == null || $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == NaN) {
                                Toast.fire({
                                    type: 'error',
                                    title: 'Falta registrar la nota de un nivel'
                                })
                                return;
                            }
                        }

                    }
                }
            }
        }
        if ($scope.falta == false) {
            if (formCal.checkValidity()) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false,
                })

                swalWithBootstrapButtons.fire({
                    title: 'Está seguro que quiere calificar al alumno con la nota "' + $scope.notaFinal + '" ?',
                    text: "Si debe cambiar algo, cancele",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, continuar',
                    cancelButtonText: 'No, cancelar',

                }).then((result) => {
                    if (result.value) {
                        swalWithBootstrapButtons.fire(
                            'Listo!',
                            'Se calificó correctamente.',
                            'success'
                        )
                        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                                $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                                    $scope.rubrica.listaNotaAspectos[i].nota = 0;
                                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota + $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                                            $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                                        }
                                    }
                                }
                            }
                            else {
                                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
                            }
                        }

                        if ($scope.editar == false) {
                            if ($scope.actividad.tipo == "I") {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idAlumno: $scope.idalumno,
                                    idJp: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                })
                            }
                            else {
                                //es actividad grupal
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idGrupo: $scope.idgrupo,
                                    idJp: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                serviceCRUD.TypePost('actividad/alumnos/calificar_grupo', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                })
                            }
                        } else {
                            if ($scope.actividad.tipo == "I") {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idAlumno: $scope.idalumno,
                                    idJpN: $scope.usuario.idUser,
                                    idJpAnt: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                })
                            }
                            else {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idGrupo: $scope.idgrupo,
                                    idJpAnt: $scope.usuario.idUser,
                                    idJpN: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    idRubrica: $scope.idRub,
                                    flgFalta: $scope.falta ? 1 : 0,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                serviceCRUD.TypePost('actividad/alumnos/editar_nota_grupo', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                })
                            }


                        }
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Se canceló la calificación',

                        )
                    }
                })

            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Debe llenar todos los puntajes',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }

        } else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false,
            })

            swalWithBootstrapButtons.fire({
                title: 'Se asignará una falta al alumno en cuestión',
                text: "Si debe cambiar algo, cancele",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, continuar',
                cancelButtonText: 'No, cancelar',

            }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire(
                        'Listo!',
                        'Se calificó correctamente.',
                        'success'
                    )
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                            $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                                $scope.rubrica.listaNotaAspectos[i].nota = 0;
                                for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                                    $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota + $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                                    for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                                        $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                                    }
                                }
                            }
                        }
                        else {
                            $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
                        }
                    }

                    if ($scope.editar == false) {
                        if ($scope.actividad.tipo == "I") {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idAlumno: $scope.idalumno,
                                idJp: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                            })
                        }
                        else {
                            //es actividad grupal
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idGrupo: $scope.idgrupo,
                                idJp: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            serviceCRUD.TypePost('actividad/alumnos/calificar_grupo', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                            })
                        }
                    } else {
                        if ($scope.actividad.tipo == "I") {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idAlumno: $scope.idalumno,
                                idJpN: $scope.usuario.idUser,
                                idJpAnt: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                            })
                        }
                        else {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idGrupo: $scope.idgrupo,
                                idJpAnt: $scope.usuario.idUser,
                                idJpN: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                idRubrica: $scope.idRub,
                                flgFalta: $scope.falta ? 1 : 0,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            serviceCRUD.TypePost('actividad/alumnos/editar_nota_grupo', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                            })
                        }


                    }
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Se canceló la calificación',

                    )
                }
            })

        }
    }
    $scope.btnSubir = function () {
        file = document.getElementById('file').files;
        var datos = new FormData();
        var tipo = 3;
        if ($scope.data.url && file.length > 0) tipo = 3;
        else if (!$scope.data.url && file.length > 0) tipo = 1;
        else if ($scope.data.url && file.length == 0) tipo = 2;
        else {
            Swal.fire({
                title: 'Error',
                text: 'Ingrese un archivo y/o url',
                type: 'error',
                confirmButtonText: 'OK'
            })
            return;
        }

        datos.append('idActividad', $scope.actividad.idActividad);
        datos.append('idUsuario', $scope.usuario.idUser);
        datos.append('tipo', tipo);
        datos.append('cantidadFiles', file.length)
        datos.append('url', $scope.data.url);

        for (var i = 0; i < file.length; i++) {
            var name = 'file ' + (i + 1);
            datos.append(name, file[i]);
        }

        serviceCRUD.TypePostFile('entregable/entrega', datos).then(function (res) {
            Swal.fire({
                title: 'Correcto',
                text: 'Entrega exitosa',
                type: 'success',
                confirmButtonText: 'OK'
            })
        })
    }

    function mostrarEntregables(idAl) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario: idAl
        }
        serviceCRUD.TypePost('entregables/lista', params).then(function (res) {
            $scope.archivos = res.data;
        })
    }

    $scope.descargarArchivo = function (arch) {
        var params = { idEntregable: arch.idEntregable }
        serviceCRUD.TypePost('entregable/descarga', params).then(function (res) {
            document.getElementById('my_iframe').src = res.data.url;
        })
    }

    function ListarAlumnos() {
        //Si es una actividad grupal
        if ($scope.actividad.tipo == "G") {
            $scope.esActIndividual = false;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaGrupal = res.data;
            })
            $scope.mostrar = true;
        }
        else { //Si es una actividad individual
            $scope.esActIndividual = true;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaAl = res.data.lista;
            })
            $scope.mostrar = true;
        }
    }

    $scope.elegirNivel = function (nivel, indicador, aspecto) {
        indicador.nota = nivel.puntaje;
        aspecto.nota = 0;
        for (let i = 0; i < aspecto.listaNotaIndicador.length; i++) {
            aspecto.nota += aspecto.listaNotaIndicador[i].nota;
        }
    }

    $scope.btnObtenerRevisiones = function(){
        var params  = {
            idProfesor: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('publicar-notas/obtener_revisiones_profesor', params).then(function (res) {
            console.dir(res.data);
        })
    }

    function ObtenerRubrica() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: 4,
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            $scope.rubrica.listaNotaAspectos = res.data.listaAspectos;
            $scope.idRub = res.data.idRubrica;
            $scope.rubrica.nombreRubrica = res.data.nombreRubrica
        })
    }

    $scope.btnValidarPuntaje  = function(){
        var params = {
            idProfesor: $scope.usuario.idUser,
            idActividad: $scope.actividad.idActividad

        }
        console.dir(params)
        serviceCRUD.TypePost('publicar-notas/publicar_notas_directo_profesor', params).then(function (res) {
            if(res.data.succeed == false){
                console.dir('no se pudo aprobar la calificacion')
                return;
            }
            console.dir(res.data)
            console.dir('Se aprobo la calificacion correctamente')
        })    
    }


    $scope.btnCalificarComoJP = function () {
        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            if ($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == null || $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == NaN) {
                                Toast.fire({
                                    type: 'error',
                                    title: 'Falta registrar la nota de un nivel'
                                })
                                return;
                            }
                        }

                    }
                }
            }
        }
        if ($scope.falta == false) {
            if (formCal.checkValidity()) {
                const swalWithBootstrapButtons = Swal.mixin({
                    customClass: {
                        confirmButton: 'btn btn-success',
                        cancelButton: 'btn btn-danger'
                    },
                    buttonsStyling: false,
                })

                swalWithBootstrapButtons.fire({
                    title: 'Está seguro que quiere calificar al alumno con la nota "' + $scope.notaFinal + '" ?',
                    text: "Si debe cambiar algo, cancele",
                    type: 'warning',
                    showCancelButton: true,
                    confirmButtonText: 'Si, continuar',
                    cancelButtonText: 'No, cancelar',

                }).then((result) => {
                    if (result.value) {
                        swalWithBootstrapButtons.fire(
                            'Listo!',
                            'Se calificó correctamente.',
                            'success'
                        )
                        console.dir('2');
                        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                                $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                                    $scope.rubrica.listaNotaAspectos[i].nota = 0;
                                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota + $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                                            $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                                        }
                                    }
                                }
                            }
                            else {
                                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
                            }
                        }

                        if ($scope.editar == false) {
                            if ($scope.actividad.tipo == "I") {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idAlumno: $scope.idalumno,
                                    idJp: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                console.dir(params);
                                serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                    //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                    var paramsAprobacion={
                                        idActividad: $scope.actividad.idActividad,
                                        idJpReviso: $scope.usuario.idUser
                                    }
                                    console.dir('Este es el json de lo que envio')
                                    console.dir(JSON.stringify(paramsAprobacion))
                                    serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                        console.dir('califique como JP y')
                                        console.dir('lo mande al servicio de aprobacion pendiente')
                                        console.dir(JSON.stringify(res))
                                        
                                    })
                                })

                            }
                            else {
                                //es actividad grupal
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idGrupo: $scope.idgrupo,
                                    idJp: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                serviceCRUD.TypePost('actividad/alumnos/calificar_grupo', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();

                                    //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                    var paramsAprobacion={
                                        idActividad: $scope.actividad.idActividad,
                                        idJpReviso: $scope.usuario.idUser
                                    }
                                    console.dir('Este es el json de lo que envio')
                                    console.dir(JSON.stringify(paramsAprobacion))
                                    serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                        console.dir('califique como JP y')
                                        console.dir('lo mande al servicio de aprobacion pendiente')
                                        console.dir(JSON.stringify(res))
                                    })
                                })

                            }
                        } else {
                            if ($scope.actividad.tipo == "I") {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idAlumno: $scope.idalumno,
                                    idJpN: $scope.usuario.idUser,
                                    idJpAnt: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    flgFalta: $scope.falta ? 1 : 0,
                                    idRubrica: $scope.idRub,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                console.dir(JSON.stringify(params));
                                serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                    //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                    var paramsAprobacion={
                                        idActividad: $scope.actividad.idActividad,
                                        idJpReviso: $scope.usuario.idUser
                                    }
                                    console.dir('Este es el json de lo que envio')
                                    console.dir(JSON.stringify(paramsAprobacion))
                                    serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                        console.dir(JSON.stringify(res))
                                        console.dir('califique como JP y')
                                        console.dir('lo mande al servicio de aprobacion pendiente')
                                    })
                                })

                            }
                            else {
                                var params = {
                                    idActividad: $scope.actividad.idActividad,
                                    idGrupo: $scope.idgrupo,
                                    idJpAnt: $scope.usuario.idUser,
                                    idJpN: $scope.usuario.idUser,
                                    nota: parseInt($scope.notaFinal),
                                    idRubrica: $scope.idRub,
                                    flgFalta: $scope.falta ? 1 : 0,
                                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                    flgCompleto: 1,
                                }
                                console.dir('Estos son los params que envio');
                                console.dir(params);
                                serviceCRUD.TypePost('actividad/alumnos/editar_nota_grupo', params).then(function (res) {
                                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                    }
                                    $scope.ObtenerNotas();
                                    //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                    var paramsAprobacion={
                                        idActividad: $scope.actividad.idActividad,
                                        idJpReviso: $scope.usuario.idUser
                                    }
                                    console.dir('Este es el json de lo que envio')
                                    console.dir(JSON.stringify(paramsAprobacion))
                                    serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                        console.dir(JSON.stringify(res))
                                        console.dir('califique como JP y')
                                        console.dir('lo mande al servicio de aprobacion pendiente')
                                    })
                                })

                            }


                        }
                    } else if (
                        result.dismiss === Swal.DismissReason.cancel
                    ) {
                        swalWithBootstrapButtons.fire(
                            'Se canceló la calificación',

                        )
                    }
                })

            }
            else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Debe llenar todos los puntajes',
                    type: 'error',
                    confirmButtonText: 'Ok'
                })
            }

        } else {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false,
            })

            swalWithBootstrapButtons.fire({
                title: 'Se asignará una falta al alumno en cuestión',
                text: "Si debe cambiar algo, cancele",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, continuar',
                cancelButtonText: 'No, cancelar',

            }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire(
                        'Listo!',
                        'Se calificó correctamente.',
                        'success'
                    )
                    console.dir('2');
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                            $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                                $scope.rubrica.listaNotaAspectos[i].nota = 0;
                                for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                                    $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota + $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                                    for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                                        $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                                    }
                                }
                            }
                        }
                        else {
                            $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
                        }
                    }

                    if ($scope.editar == false) {
                        if ($scope.actividad.tipo == "I") {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idAlumno: $scope.idalumno,
                                idJp: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            console.dir(params);
                            serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                                //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                var paramsAprobacion={
                                    idActividad: $scope.actividad.idActividad,
                                    idJpReviso: $scope.usuario.idUser
                                }
                                console.dir('Este es el json de lo que envio')
                                console.dir(JSON.stringify(paramsAprobacion))
                                serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                    console.dir(JSON.stringify(res))
                                    console.dir('califique como JP y')
                                    console.dir('lo mande al servicio de aprobacion pendiente')
                                })
                            })
                        }
                        else {
                            //es actividad grupal
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idGrupo: $scope.idgrupo,
                                idJp: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            serviceCRUD.TypePost('actividad/alumnos/calificar_grupo', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                                //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                var paramsAprobacion={
                                    idActividad: $scope.actividad.idActividad,
                                    idJpReviso: $scope.usuario.idUser
                                }
                                console.dir('Este es el json de lo que envio')
                                console.dir(JSON.stringify(paramsAprobacion))
                                serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                    console.dir(JSON.stringify(res))
                                    console.dir('califique como JP y')
                                    console.dir('lo mande al servicio de aprobacion pendiente')
                                })
                            })
                        }
                    } else {
                        if ($scope.actividad.tipo == "I") {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idAlumno: $scope.idalumno,
                                idJpN: $scope.usuario.idUser,
                                idJpAnt: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                flgFalta: $scope.falta ? 1 : 0,
                                idRubrica: $scope.idRub,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            console.dir(JSON.stringify(params));
                            serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                                //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                var paramsAprobacion={
                                    idActividad: $scope.actividad.idActividad,
                                    idJpReviso: $scope.usuario.idUser
                                }
                                console.dir('Este es el json de lo que envio')
                                console.dir(JSON.stringify(paramsAprobacion))
                                serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                    console.dir(JSON.stringify(res))
                                    console.dir('califique como JP y')
                                    console.dir('lo mande al servicio de aprobacion pendiente')
                                })
                            })
                        }
                        else {
                            var params = {
                                idActividad: $scope.actividad.idActividad,
                                idGrupo: $scope.idgrupo,
                                idJpAnt: $scope.usuario.idUser,
                                idJpN: $scope.usuario.idUser,
                                nota: parseInt($scope.notaFinal),
                                idRubrica: $scope.idRub,
                                flgFalta: $scope.falta ? 1 : 0,
                                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                                flgCompleto: 1,
                            }
                            console.dir('Estos son los params que envio');
                            console.dir(params);
                            serviceCRUD.TypePost('actividad/alumnos/editar_nota_grupo', params).then(function (res) {
                                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                                }
                                $scope.ObtenerNotas();
                                //Si soy JP, debo llamar al servicio de enviar calificacion para ser aprobada por profesor
                                var paramsAprobacion={
                                    idActividad: $scope.actividad.idActividad,
                                    idJpReviso: $scope.usuario.idUser
                                }
                                console.dir('Este es el json de lo que envio')
                                console.dir(JSON.stringify(paramsAprobacion))
                                serviceCRUD.TypePost('publicar-notas/jp_solicitud_publicar', paramsAprobacion).then(function (res) {
                                    console.dir(JSON.stringify(res))
                                    console.dir('califique como JP y')
                                    console.dir('lo mande al servicio de aprobacion pendiente')
                                })
                            })
                        }


                    }
                } else if (
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Se canceló la calificación',

                    )
                }
            })

        }
    }

    function init() {
        ListarAlumnos();
        ObtenerRubrica();
        if ($scope.usuario.alumno) {
            $scope.ObtenerNotas();
            if ($scope.actividad.tipo == 'I') mostrarEntregables($scope.usuario.idUser);
            else mostrarEntGrupo();
        }
    }

    function mostrarEntGrupo() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('grupo/pertenece', params).then(function (res) {
            mostrarEntregables(res.data.idGrupo);
        })
    }

    $scope.mostrar = function (arch) {
        if (arch.urlEntregable == null) return arch.nombreArchivo;
        else return arch.urlEntregable;
    }

    init();
})
