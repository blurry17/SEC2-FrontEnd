app.controller('RubricaController',function($scope, $location, $cookies, serviceUtil, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');

    /* Variables */
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarAspecto = true;

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.rubrica = {
        flgRubricaEspecial : 0,
        idUsuarioCreador : 2,
        nombreRubrica : "test",
        listaAspectos : []
    }

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
            window.alert("Ingrese el nombre de la rúbrica!");
        else{
            $scope.mostrarCrearRubrica = false;
            console.dir($scope.rubrica);

            serviceCRUD.TypePost('actividad/crear_rubrica', $scope.rubrica).then(function(response){
                console.dir(response);
            })

            window.alert("Se guardó la Rúbrica!")
        }
    }

    $scope.btnVerRubricaActual = function(){
        //Falta: Validar que primero haya guardado la rúbrica

        var params = {
            idActividad : 1
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica_idactividad', params).then(function(res){
            console.dir(res.data);
        })


       $scope.mostrarCrearRubrica = true;
    }

    /* Funciones Aspectos */
     $scope.btnAgregarAspecto= function() {
        $scope.rubrica.listaAspectos.push({
            /* datos del aspecto */
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            listaIndicadores:[],
            mostrar: true,
            tipoClasificacion : 1
        });
     }

    $scope.btnMostrarAspecto = function(aspecto){
        aspecto.mostrar = !(aspecto.mostrar);
    }

    $scope.btnQuitarAspecto = function(aspecto){
        var pos = $scope.rubrica.listaAspectos.indexOf(aspecto)
        $scope.rubrica.listaAspectos.splice(pos,1)
    }

    /* Funciones Indicadores */
    $scope.btnAgregarIndicador= function(aspecto) {
        aspecto.listaIndicadores.push({  
            /* datos del indicador */
            descripcion: '',
            informacion: '',
            puntajeMax: null,
            tipo : 'NOTA'
        });
        console.dir($scope.rubrica.listaAspectos)
     }

     $scope.btnQuitarIndicador = function(aspecto,indicador){
        var pos = aspecto.listaIndicadores.indexOf(indicador)
        aspecto.listaIndicadores.splice(pos,1)
    }

})