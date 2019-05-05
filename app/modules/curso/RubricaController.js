app.controller('RubricaController',function($scope, $location, $cookies, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');

    /* Variables */
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarAspecto = true;

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    /* Inicializando la lista de aspectos */
    $scope.lstAspectos = []

    /* Funciones Rubrica */
    $scope.btnCrearRubrica = function(){
        /* Preguntar si desea crear una nueva rúbrica */
        result = window.confirm('¿Desea crear una nueva rúbrica?');
        if (result){
            $scope.mostrarCrearRubrica = true;

        }
    }

    $scope.btnGuardarRubrica = function(){
        if (document.getElementById('nomRubrica').value == '')
            window.alert("Ingrese el nombre de la rúbrica!")
        else{
            $scope.mostrarCrearRubrica = false;
            window.alert("Se guardó la Rúbrica!")
        }
    }

    $scope.btnVerRubricaActual = function(){
        //Falta: Validar que primero haya guardado la rúbrica
       $scope.mostrarCrearRubrica = true;
    }

    /* Funciones Aspectos */
     $scope.btnAgregarAspecto= function() {
        $scope.lstAspectos.push({
            /* datos del aspecto */
            nomAspecto: '',
            descripcion: '',
            puntajeMax: null,
            lstIndicadores:[],
            mostrar: true
        });
     }

    $scope.btnMostrarAspecto = function(aspecto){
        aspecto.mostrar = !(aspecto.mostrar);
    }

    $scope.btnQuitarAspecto = function(aspecto){
        var pos = $scope.lstAspectos.indexOf(aspecto)
        $scope.lstAspectos.splice(pos,1)
    }

    /* Funciones Indicadores */
    $scope.btnAgregarIndicador= function(aspecto) {
        aspecto.lstIndicadores.push({  
            /* datos del indicador */
            nomIndicador: '',
            descripcion: '',
            puntajeMax: null
        });
        console.dir($scope.lstAspectos)
     }

     $scope.btnQuitarIndicador = function(aspecto,indicador){
        var pos = aspecto.lstIndicadores.indexOf(indicador)
        aspecto.lstIndicadores.splice(pos,1)
    }

})