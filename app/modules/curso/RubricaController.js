
app.controller('RubricaController',function($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.actividad = $cookies.getObject('actividadActual');
    $rootScope.lstCursos = $cookies.getObject('cursos');

    /* Variables */
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarEditarRubrica = false;
    $scope.mostrarAspecto = true;
    $scope.mostrarRubrica = false
    $scope.mostrarIndicadores = true;
    $scope.puntajeAcumuladoRubricaVista = 0;
    $scope.noHayRubrica = null;
    $scope.hayRubrica = null;
    //$scope.rubricaEditar = null;

    //Verificando que si hay una rubrica asignada
    //Se muestre al entrar a la rubrica
    function mostrarRubricaActual(){
        var params = {
            idActividad: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            console.dir(res.data);
            if(res.data.idRubrica != null){
                console.dir("hay una rubrica")
                //$scope.mostrarEditarRubrica = true
                //$scope.rubricaEditar = res.data;
                return $scope.hayRubrica = true;
            }
            return $scope.noHayRubrica = true;

        })
    }

    //console.dir('Soy rubricaeditar' + $scope.rubricaEditar)


    $scope.btnEditarRubrica = function () {
        $("#formAct").addClass("was-validated");
            $scope.mostrarCrearRubrica = false;
            console.dir($scope.rubricaEditar);

            $scope.rubricaEditar.nombreRubrica = $scope.nomRubrica;
            
            serviceCRUD.TypePost('actividad/editar_rubrica', $scope.rubricaEditar).then(function (response) {
                console.dir(response);
            })

            window.alert("Se editó la Rúbrica!")
        
    }




    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        listaAspectos: []

    }

    /* Inicializando la lista de aspectos */
    $scope.lstAspectos = []

    /* Funciones Rubrica */

    /* Obteniendo el puntaje acumulado de los indicadores */

    $scope.sumaInd = function(asp){
        var sum = 0;
        for (let i = 0; i < asp.listaIndicadores.length; i++) {
            sum += parseInt(asp.listaIndicadores[i].puntajeMax);            
        }
        /* Asigno la suma al puntajeMax del aspecto */
        $scope.rubrica.listaAspectos[$scope.rubrica.listaAspectos.indexOf(asp)].puntajeMax = sum;
        return sum;
    }


    $scope.btnCrearRubrica = function () {
        $scope.mostrarRubrica = true;
    }

    $scope.btnGuardarRubrica = function () {
        $("#formAct").addClass("was-validated");
        //validando que la rubrica tenga nombre
            $scope.mostrarCrearRubrica = false;
            console.dir($scope.rubrica);

            $scope.rubrica.nombreRubrica = $scope.nomRubrica;
            
            serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (response) {
                console.dir(response);
            })

            window.alert("Se guardó la Rúbrica!")
        
    }

    $scope.btnVerRubricaActual = function () {
        //Falta: Validar que primero haya guardado la rúbrica

        var params = {
            idActividad: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            console.dir(res.data);
            $scope.lstAspectos = res.data.listaAspectos;

            /* Obtener la suma de los indicadores para mostrarlo*/
            $scope.lstAspectos.forEach(aspecto => {
                $scope.puntajeAcumuladoRubricaVista = 0;
                aspecto.listaIndicadores.forEach(indicador => {
                    $scope.puntajeAcumuladoRubricaVista += indicador.puntajeMax
                });
                
            });

        })
        
        $('#mdVistaPrevia').appendTo("body").modal('show');
        
        //$scope.mostrarCrearRubrica = true;    
        console.dir($scope.lstAspectos);
    }

    


    /* Función crear rúbrica desde 0. Preguntar el tipo de rúbrica */
    $scope.btnAspectoConIndicadores = function () {
        console.dir("Escogi el aspecto tipo 1")
        console.dir("Se agrego un aspecto con indicadores...");
                
        $scope.rubrica.listaAspectos.unshift({
            //datos del aspecto
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 1
        });
        
    }
    $scope.btnAspectoConPuntaje = function () {
        console.dir("Escogi el aspecto tipo 2")
        console.dir("Se agrego un aspecto con puntaje...");
        
        $scope.rubrica.listaAspectos.unshift({
            //datos del aspecto
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 2
        });
        
    }
    $scope.btnAspectoSinPuntaje = function () {
        console.dir("Escogi el aspecto tipo 3")
        console.dir("Se agrego un aspecto sin puntaje...");
         
        $scope.rubrica.listaAspectos.unshift({
            //datos del aspecto
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            listaIndicadores: [],
            mostrar: true,
            tipoClasificacion: 3
        });
        
    }

    /* Funciones Aspectos */
    $scope.btnAgregarAspecto = function () {
        //Preguntar de que tipo desea el aspecto
        $('#mdElegirTipoAspecto').appendTo("body").modal('show');
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
        //Verificando que el aspecto sea de tipo 1
        if (aspecto.tipoClasificacion == 1){
            aspecto.listaIndicadores.push({
                /* datos del indicador */
                descripcion: '',
                informacion: '',
                puntajeMax: null,
                tipo: 'NOTA'
            });
            console.dir($scope.rubrica.listaAspectos)
        }

    }

    $scope.btnQuitarIndicador = function (aspecto, indicador) {
        var pos = aspecto.listaIndicadores.indexOf(indicador)
        aspecto.listaIndicadores.splice(pos, 1)
    }
    console.dir($scope.lstAspectos)


    function init() {
        mostrarRubricaActual();
    }

    init();

})