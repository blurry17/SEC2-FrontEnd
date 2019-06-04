app.controller('RubricaController',function($rootScope, $scope, $location, $cookies, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.actividad = $cookies.getObject('actividadActual');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarEditarRubrica = false;
    $scope.mostrarAspecto = true;
    $scope.mostrarRubrica = false;
    $scope.mostrarAutoeval = false;
    $scope.mostrarCoeval = false;
    $scope.mostrarBtns = false;
    $scope.bloqEval = false;
    $scope.rubrica = {
        idActividad: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: '',
        listaAspectos: [],
        tipo: null
    }

    function mostrarRubricaActual() {
        if ($scope.actividad.idRubrica != null) {
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
                $scope.rubrica = res.data;
                for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                    $scope.rubrica.listaAspectos[i].mostrar = true;
                    for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++)
                        $scope.rubrica.listaAspectos[i].listaIndicadores[j].mostrar = true;
                }
                $scope.bloqEval = true;
                $scope.mostrarBtnEditar = true;
                $scope.mostrarBtns = false;
                $scope.mostrarRubrica = true;
            })
        } else {
            $scope.rubrica.nombreRubrica = '';
            $scope.rubrica.listaAspectos = [];
        }
    }

    $scope.btnEditarRubrica = function () {
        $("#formEva").addClass("was-validated");
        $scope.mostrarCrearRubrica = false;
        $scope.rubrica.nombreRubrica = $scope.nomRubrica;
        $scope.rubrica.idActividad = $scope.actividad.idActividad;
        $scope.rubrica.idRubricaActual = $scope.actividad.idRubrica;
        serviceCRUD.TypePost('actividad/editar_rubrica', $scope.rubrica).then(function (response) {
            $scope.mostrarRubrica = false;
            window.alert("Se guardaron los cambios!")
        })
    }

    $scope.btnGuardarRubrica = function () {
        $("#formEva").addClass("was-validated");
        if (formEva.checkValidity()) {
            console.dir('guardar');
            $scope.mostrarCrearRubrica = false;
            console.dir($scope.rubrica);

            /* serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (response) {
                $scope.mostrarRubrica = false;
                window.alert("Se guardó la Rúbrica!")
            }) */
        }
    }

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.sumaInd = function(asp){
        var sum = 0;
        for (let i = 0; i < asp.listaIndicadores.length; i++) {
            sum += parseInt(asp.listaIndicadores[i].puntajeMax);            
        }
        /* Asigno la suma al puntajeMax del aspecto */
        //$scope.rubrica.listaAspectos[$scope.rubrica.listaAspectos.indexOf(asp)].puntajeMax = sum;
        return sum;
    }


    $scope.btnCrearRubrica = function () {
        if($scope.actividad.idRubrica != null){
            $scope.hayRubrica = true;
            var r = window.confirm("Esta actividad ya tiene una rúbrica. ¿Desea crear una nueva?");
            if (r){
                $scope.mostrarRubrica = true;
            }
        }
        if($scope.actividad.idRubrica == null){
            $scope.mostrarRubrica = true;
        }
    }

    $scope.btnCrearEvaluacion = function () {
        if ($scope.actividad.idRubrica != null) {
            var r = window.confirm("Esta actividad ya tiene una hoja de evaluación. ¿Desea crear una nueva?");
            if (r) {
                $scope.rubrica.nombreRubrica = '';
                $scope.rubrica.listaAspectos = [];
                $scope.rubrica.tipo = 4;
                $scope.mostrarRubrica = true;
                $scope.bloqEval = false;
                $scope.edicion = false;
                $scope.mostrarBtnEditar = false;
                $scope.mostrarBtns = true;
            }
        } else {
            $scope.rubrica.nombreRubrica = '';
            $scope.rubrica.listaAspectos = [];
            $scope.rubrica.tipo = 4;
            $scope.mostrarRubrica = true;
            $scope.bloqEval = false;
            $scope.edicion = false;
            $scope.mostrarBtnEditar = false;
            $scope.mostrarBtns = true;
        }
    }

    $scope.btnCrearAutoeval = function () {
        $scope.rubrica.nombreRubrica = '';
        $scope.rubrica.listaAspectos = [];
        $scope.rubrica.tipo = 2;
        $scope.mostrarRubrica = true;
    }

    $scope.btnCrearCoeval = function () {
        $scope.rubrica.nombreRubrica = '';
        $scope.rubrica.listaAspectos = [];
        $scope.rubrica.tipo = 3;
        $scope.mostrarRubrica = true;
    }

    $scope.btnVerRubricaActual = function () {
        var params = {
            idActividad: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            $scope.lstAspectos = res.data.listaAspectos;
            $scope.lstAspectos.forEach(aspecto => {
                if(aspecto.puntajeMax != null){
                    $scope.puntajeAcumuladoRubricaVista = aspecto.puntajeMax
                }
            });
        })        
        $('#mdVistaPrevia').appendTo("body").modal('show');
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
        $scope.mostrarRubrica = false;
        if ($scope.edicion) $scope.edicion = false;
        mostrarRubricaActual();
    }

    $scope.btnEdicion = function() {
        $scope.bloqEval = false;
        $scope.edicion = true;
        $scope.mostrarBtnEditar = false;
        $scope.mostrarBtns = true;
    }

    function init() {
        mostrarRubricaActual();
    }

    init();
})