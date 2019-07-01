app.controller('RubricaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.curso = $cookies.getObject("cursoActual");
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarEditarRubrica = false;
    $scope.mostrarAspecto = true;
    $scope.mostrarEv = false;
    $scope.mostrarAutoeval = false;
    $scope.mostrarCoeval = false;
    $scope.mostrarBtns = false;
    $scope.bloqEval = false;
    $scope.edicion = false;
    $scope.titleEval = null;
    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idActividad: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: '',
        listaAspectos: [],
        tipo: null
    }
    var ev = [0, 0, 0, 0, 0]; // chequea si tiene rubrica del curso, autoeval, coeval y eval
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });

    $scope.btnObtenerEval = function (tipo) {
        $scope.mostrarEv = false;
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        }

        if (tipo == 4) $scope.titleEval = 'Evaluación';
        else if (tipo == 3) $scope.titleEval = 'Coevaluación';
        else if (tipo == 2) $scope.titleEval = 'Autoevaluación';

        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            if (res.data.succeed == false) {
                Toast.fire({
                    type: 'error',
                    title: 'No existe esta evaluación'
                })
                return;
            }
            ev[tipo] = 1;
            $scope.rubrica = res.data;
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                $scope.rubrica.listaAspectos[i].mostrar = true;
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++)
                    $scope.rubrica.listaAspectos[i].listaIndicadores[j].mostrar = true;
            }
            $scope.bloqEval = true;
            $scope.edicion = false;
            $scope.mostrarBtnEditar = true;
            $scope.mostrarBtns = false;
            $scope.mostrarEv = true;
        })
    }

    $scope.btnGuardarRubrica = function () {
        $("#formEva").addClass("was-validated");
        if ($scope.rubrica.listaAspectos.length == 0) {
            $("#formEva").removeClass("was-validated");
            Toast.fire({
                type: 'error',
                title: 'No se agregó ninguna pregunta'
            })
            return;
        }

        for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
            if ($scope.rubrica.listaAspectos[i].tipoClasificacion == 1 && $scope.rubrica.listaAspectos[i].listaIndicadores.length == 0) {
                $("#formEva").removeClass("was-validated");
                Toast.fire({
                    type: 'error',
                    title: 'Falta agregar indicadores en un aspecto'
                })
                return;
            }
            if ($scope.rubrica.listaAspectos[i].tipoClasificacion != 3 && $scope.rubrica.listaAspectos[i].puntajeMax == '--') {
                $("#formEva").removeClass("was-validated");
                Toast.fire({
                    type: 'error',
                    title: 'El puntaje de un aspecto tiene formato incorrecto'
                })
                return;
            }
            for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++) {
                if ($scope.rubrica.listaAspectos[i].tipoClasificacion == 1 && $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles.length == 0) {
                    $("#formEva").removeClass("was-validated");
                    Toast.fire({
                        type: 'error',
                        title: 'Falta agregar niveles en un indicador'
                    })
                    return;
                }
                for (let k = 0; k < $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles.length; k++) {
                    if ($scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles[k].puntaje == '--') {
                        $("#formEva").removeClass("was-validated");
                        Toast.fire({
                            type: 'error',
                            title: 'El puntaje de un nivel tiene formato incorrecto'
                        })
                        return;
                    }
                }
            }
        }

        if (formEva.checkValidity()) {
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++) {
                    for (let k = 0; k < $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles.length; k++) {
                        $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles[k].grado = k + 1;
                    }
                }
            }
            $scope.rubrica.idActividad = $scope.actividad.idActividad;
            if ($scope.edicion == true) {
                $scope.bloqEval = true;
                $scope.edicion = false;
                $scope.mostrarBtns = false;
                $scope.mostrarBtnEditar = true;
                serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (res) {
                    Toast.fire({
                        type: 'success',
                        title: 'Evaluacion guardada'
                    })
                })
            } else {
                $scope.bloqEval = true;
                $scope.mostrarBtns = false;
                $scope.mostrarBtnEditar = true;
                serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (res) {
                    Toast.fire({
                        type: 'success',
                        title: 'Evaluacion guardada'
                    })
                })
            }
            $scope.mostrarCrearRubrica = false;
        }
    }

    $scope.btnCrearEval = function (tipo) {
        $("#formEva").removeClass("was-validated");
        if (ev[tipo]) {
            var r = window.confirm("Ya existe una evaluación de este tipo. ¿Desea crear una nueva?");
            if (r) {
                $scope.rubrica.nombreRubrica = '';
                $scope.rubrica.listaAspectos = [];
                $scope.rubrica.tipo = tipo;
                $scope.mostrarEv = true;
                $scope.bloqEval = false;
                $scope.edicion = false;
                $scope.mostrarBtnEditar = false;
                $scope.mostrarBtns = true;
            }

        } else {
            $scope.rubrica.nombreRubrica = '';
            $scope.rubrica.listaAspectos = [];
            $scope.rubrica.tipo = tipo;
            $scope.mostrarEv = true;
            $scope.bloqEval = false;
            $scope.edicion = false;
            $scope.mostrarBtnEditar = false;
            $scope.mostrarBtns = true;
        }
        if (tipo == 4) $scope.titleEval = 'Evaluación';
        else if (tipo == 3) $scope.titleEval = 'Coevaluación';
        else if (tipo == 2) $scope.titleEval = 'Autoevaluación';
    }

    $scope.btnAspectoConIndicadores = function () {
        $scope.rubrica.listaAspectos.unshift({
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            flgGrupal: 0,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 1
        });
    }

    $scope.btnAspectoConPuntaje = function () {
        $scope.rubrica.listaAspectos.unshift({
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            flgGrupal: 0,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 2
        });
    }

    $scope.btnAspectoSinPuntaje = function () {
        $scope.rubrica.listaAspectos.unshift({
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            flgGrupal: 0,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 3
        });
    }

    $scope.btnAgregarAspecto = function () {
        $('#mdElegirTipoAspecto').appendTo("body").modal('show');
    }

    $scope.btnMostrarAspecto = function (aspecto) {
        if (!aspecto.mostrar) {
            aspecto.mostrar = !(aspecto.mostrar);
        }
    }

    $scope.btnOcultarIndicadores = function (aspecto) {
        aspecto.mostrar = !(aspecto.mostrar);
    }

    $scope.btnOcultarNiveles = function (indicador) {
        indicador.mostrar = !(indicador.mostrar);
    }

    $scope.btnQuitarAspecto = function (aspecto) {
        var pos = $scope.rubrica.listaAspectos.indexOf(aspecto)
        $scope.rubrica.listaAspectos.splice(pos, 1)
    }

    $scope.btnAgregarIndicador = function (aspecto) {
        if (aspecto.tipoClasificacion == 1) {
            aspecto.mostrar = true;
            aspecto.listaIndicadores.push({
                descripcion: '',
                informacion: '',
                puntajeMax: null,
                listaNiveles: []
            });
        }
    }

    $scope.btnQuitarIndicador = function (aspecto, indicador) {
        var pos = aspecto.listaIndicadores.indexOf(indicador)
        aspecto.listaIndicadores.splice(pos, 1)
    }

    $scope.btnAgregarNivel = function (indicador) {
        indicador.mostrar = true;
        indicador.listaNiveles.push({
            descripcion: '',
            grado: '',
            puntaje: 0
        });
    }

    $scope.btnEliminarNivel = function (i, indicador) {
        indicador.listaNiveles.splice(i, 1);
    }

    $scope.btnCancelar = function () {
        $scope.mostrarEv = false;
        if ($scope.edicion) $scope.edicion = false;
        $scope.btnObtenerEval(4);
    }

    $scope.btnEdicion = function () {
        $scope.edicion = true;
        $scope.mostrarBtnEditar = false;
        $scope.mostrarBtns = true;
        $scope.bloqEval = false;
        $("#formEva").removeClass("was-validated");
    }

    function existeOtrasEval() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: 2
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            if (res.data.succeed == false) return;
            ev[2] = 1;
        })

        if ($scope.actividad.tipo == 'G') {
            var params = {
                idActividad: $scope.actividad.idActividad,
                tipo: 3
            }
            serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
                if (res.data.succeed == false) return;
                ev[3] = 1;
            })
        }
    }

    function init() {
        $scope.btnObtenerEval(4);
        existeOtrasEval();
    }

    init();
})