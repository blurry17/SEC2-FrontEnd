app.controller('RubricaController',function($rootScope, $scope, $location, $cookies, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.actividad = $cookies.getObject('actividadActual');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $("[data-toggle=tooltipOcultarAspecto]").tooltip();
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarEditarRubrica = false;
    $scope.mostrarAspecto = true;
    $scope.mostrarEv = false;
    $scope.mostrarAutoeval = false;
    $scope.mostrarCoeval = false;
    $scope.mostrarBtns = false;
    $scope.bloqEval = false;
    $scope.edicion = false;
    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idActividad: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: '',
        listaAspectos: [],
        tipo: null
    }
    var ev = [0,0,0,0,0]; // chequea si tiene rubrica del curso, autoeval, coeval y eval

    $scope.btnObtenerEval = function(tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            console.dir(res.data);
            if (res.data.succeed == false) return;
            ev[tipo] = 1;
            $scope.rubrica = res.data;
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                $scope.rubrica.listaAspectos[i].mostrar = true;
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++)
                    $scope.rubrica.listaAspectos[i].listaIndicadores[j].mostrar = true;
            }
            $scope.bloqEval = true;
            $scope.mostrarBtnEditar = true;
            $scope.mostrarBtns = false;
            $scope.mostrarEv = true;
        })
    }

    $scope.btnEditarRubrica = function () {
        $("#formEva").addClass("was-validated");
        $scope.mostrarCrearRubrica = false;
        $scope.rubrica.nombreRubrica = $scope.nomRubrica;
        $scope.rubrica.idActividad = $scope.actividad.idActividad;
        $scope.rubrica.idRubricaActual = $scope.actividad.idRubrica;
        serviceCRUD.TypePost('actividad/editar_rubrica', $scope.rubrica).then(function (response) {
            $scope.mostrarEv = false;
            window.alert("Se guardaron los cambios!")
        })
    }

    $scope.btnGuardarRubrica = function () {
        $("#formEva").addClass("was-validated");
        if (formEva.checkValidity()) {
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++) {
                    for (let k = 0; k < $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles.length; k++) {
                        $scope.rubrica.listaAspectos[i].listaIndicadores[j].listaNiveles[k].grado = k + 1;                        
                    }
                }
            }
            if ($scope.edicion == true) {
                $scope.bloqEval = true;
                $scope.edicion = false;
                $scope.mostrarBtns = false;
                $scope.mostrarBtnEditar = true;
                serviceCRUD.TypePost('actividad/editar_rubrica', $scope.rubrica).then(function (res) {
                })
            } else { 
                $scope.bloqEval = true;
                $scope.mostrarBtns = false;
                $scope.mostrarBtnEditar = true;
                console.dir($scope.rubrica);
                serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (res) {

                })
            }
            $scope.mostrarCrearRubrica = false;
        }
    }

    /* $scope.sumaInd = function(asp){
        var sum = 0;
        for (let i = 0; i < asp.listaIndicadores.length; i++) {
            sum += parseInt(asp.listaIndicadores[i].puntajeMax);            
        }
        //$scope.rubrica.listaAspectos[$scope.rubrica.listaAspectos.indexOf(asp)].puntajeMax = sum;
        return sum;
    } */

    $scope.btnCrearEval = function (tipo) {
        if (ev[tipo]) {
            var r = window.confirm("Esta actividad ya tiene una hoja de evaluación. ¿Desea crear una nueva?");
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

    $scope.btnQuitarAspecto = function (aspecto) {
        var pos = $scope.rubrica.listaAspectos.indexOf(aspecto)
        $scope.rubrica.listaAspectos.splice(pos, 1)
    }

    $scope.btnAgregarIndicador = function (aspecto) {
        if (aspecto.tipoClasificacion == 1){
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

    $scope.btnAgregarNivel = function(indicador) {
        indicador.listaNiveles.push({
            descripcion: '',
            grado: '',
            puntaje: 0
        });
    }

    $scope.btnEliminarNivel = function(i, indicador) {
        indicador.listaNiveles.splice(i, 1);
    }

    $scope.btnCancelar = function () {
        $scope.mostrarEv = false;
        if ($scope.edicion) $scope.edicion = false;
        obtenerEval();
    }

    $scope.btnEdicion = function() {
        $scope.edicion = true;
        $scope.mostrarBtnEditar = false;
        $scope.mostrarBtns = true;        
        $scope.bloqEval = false;
        $("#formEva").removeClass("was-validated");
    }

    function init() {
        $scope.btnObtenerEval(4);
    }

    init();
})