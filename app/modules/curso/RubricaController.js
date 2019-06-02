
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
    $scope.hayRubrica = false;
    //$scope.rubricaEditar = null;

    //Verificando que si hay una rubrica asignada
    //Se muestre al entrar a la rubrica
    function mostrarRubricaActual(){
        if($scope.actividad.idRubrica != null){
            $scope.hayRubrica = true;
            var params = {
                idActividad: $scope.actividad.idActividad
            }
            //Si hay un idRubrica, llamar al servicio
            serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
                $scope.nomRubrica = res.data.nombreRubrica;
                $scope.lstAspectos = res.data.listaAspectos;
                $scope.rubrica.listaAspectos = res.data.listaAspectos;
    
                /* Obtener la suma de los indicadores para mostrarlo*/
                $scope.lstAspectos.forEach(aspecto => {
                    $scope.puntajeAcumuladoRubricaVista = 0;
                    aspecto.listaIndicadores.forEach(indicador => {
                        $scope.puntajeAcumuladoRubricaVista += indicador.puntajeMax
                    });
                    
                });
                $scope.mostrarRubrica = true;
    
            })


        }
    }

    $scope.btnEditarRubrica = function () {
        $("#formAct").addClass("was-validated");
        //validando que la rubrica tenga nombre
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
        $("#formAct").addClass("was-validated");
        //validando que la rubrica tenga nombre
            $scope.mostrarCrearRubrica = false;
            $scope.rubrica.nombreRubrica = $scope.nomRubrica;
            $scope.rubrica.idActividad = $scope.actividad.idActividad;
            
            serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function (response) {
                $scope.mostrarRubrica = false;
                window.alert("Se guardó la Rúbrica!")
            })

        
    }

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        listaAspectos: [],
        idRubricaActual: null

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
        //$scope.rubrica.listaAspectos[$scope.rubrica.listaAspectos.indexOf(asp)].puntajeMax = sum;
        return sum;
    }


    $scope.btnCrearRubrica = function () {
        //Preguntar si quiere crear una nueva rubrica
        //Solamente si ya hay una rubrica creada
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



    $scope.btnVerRubricaActual = function () {
        //Falta: Validar que primero haya guardado la rúbrica

        var params = {
            idActividad: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function (res) {
            $scope.lstAspectos = res.data.listaAspectos;

            /* Obtener la suma de los indicadores para mostrarlo*/
            $scope.lstAspectos.forEach(aspecto => {
                if(aspecto.puntajeMax != null){
                    $scope.puntajeAcumuladoRubricaVista = aspecto.puntajeMax
                }
            });

        })
        
        $('#mdVistaPrevia').appendTo("body").modal('show');
        
        //$scope.mostrarCrearRubrica = true;
    }

    


    /* Función crear rúbrica desde 0. Preguntar el tipo de rúbrica */
    $scope.btnAspectoConIndicadores = function () {                
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
        }

    }

    $scope.btnQuitarIndicador = function (aspecto, indicador) {
        var pos = aspecto.listaIndicadores.indexOf(indicador)
        aspecto.listaIndicadores.splice(pos, 1)
    }

    function init() {
        mostrarRubricaActual();
    }

    init();
})