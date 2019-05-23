
app.controller('RubricaController',function($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD){ 

    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');

    /* Variables */
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarAspecto = true;
    $scope.mostrarRubricaTipo1 = false;
    $scope.mostrarRubricaTipo2 = false;
    $scope.mostrarRubricaTipo3 = false;

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: 2,
        nombreRubrica: "test",
        listaAspectos: []
    }

    /* Inicializando la lista de aspectos */
    $scope.lstAspectos = []

    /* Funciones Rubrica */

    /* Función crear rúbr ica desde 0. Preguntar el tipo de rúbrica */
    $scope.btnRubricaTipo1 = function () {
        console.log('cambiando tipo 1');
        $scope.mostrarRubricaTipo1 = true;
        $scope.mostrarRubricaTipo2 = false;
        $scope.mostrarRubricaTipo3 = false;
    }
    $scope.btnRubricaTipo2 = function () {
        console.log('cambiando tipo 2');
        $scope.mostrarRubricaTipo1 = false;
        $scope.mostrarRubricaTipo2 = true;
        $scope.mostrarRubricaTipo3 = false;
    }
    $scope.btnRubricaTipo3 = function () {
        console.log('cambiando tipo 3');
        $scope.mostrarRubricaTipo1 = false;
        $scope.mostrarRubricaTipo2 = false;
        $scope.mostrarRubricaTipo3 = true;
    }


    $scope.btnCrearRubrica = function () {
        $scope.mostrarCrearRubrica = true;
        $('#mdElegirTipoRubrica').appendTo("body").modal('show');
    }

    $scope.btnGuardarRubrica = function () {
        if (document.getElementById('nomRubrica').value == '')
            window.alert("Ingrese el nombre de la rúbrica!");
        else {
            $scope.mostrarCrearRubrica = false;
            console.dir($scope.rubrica);

            serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (response) {
                console.dir(response);
            })

            window.alert("Se guardó la Rúbrica!")
        }
    }

    $scope.btnVerRubricaActual = function () {
        //Falta: Validar que primero haya guardado la rúbrica

        var params = {
            idActividad: 1
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            console.dir(res.data);
            $scope.lstAspectos = res.data.lista_aspectos;
        })

        
            $('#mdVistaPrevia').appendTo("body").modal('show');
        


        //$scope.mostrarCrearRubrica = true;
        console.dir($scope.lstAspectos);
    }

    /* Funciones Aspectos */
    $scope.btnAgregarAspecto = function () {
        $scope.rubrica.listaAspectos.push({
            /* datos del aspecto */
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 1
        });
    }

    $scope.btnMostrarAspecto = function (aspecto) {
        if (!aspecto.mostrar) {
            aspecto.mostrar = !(aspecto.mostrar);
        }

    }

    $scope.btnOcultarIndicadores = function (aspecto) {
        if (aspecto.mostrar) {
            aspecto.mostrar = !(aspecto.mostrar);
        }
    }

    $scope.btnQuitarAspecto = function (aspecto) {
        var pos = $scope.rubrica.listaAspectos.indexOf(aspecto)
        $scope.rubrica.listaAspectos.splice(pos, 1)
    }

    /* Funciones Indicadores */
    $scope.btnAgregarIndicador = function (aspecto) {
        aspecto.listaIndicadores.push({
            /* datos del indicador */
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            tipo: 'NOTA'
        });
        console.dir($scope.rubrica.listaAspectos)
    }

    $scope.btnQuitarIndicador = function (aspecto, indicador) {
        var pos = aspecto.listaIndicadores.indexOf(indicador)
        aspecto.listaIndicadores.splice(pos, 1)
    }
    console.dir($scope.lstAspectos)

})