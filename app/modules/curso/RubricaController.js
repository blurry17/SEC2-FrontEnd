

app.controller('RubricaController',function($scope, $location, $cookieStore, serviceUtil){ 

    /* Variables */
    $scope.mostrarCrearRubrica = false;
    $scope.mostrarAspecto = true;

    $("[data-toggle=tooltipOcultarAspecto]").tooltip();

    $scope.lstAspectos = [
            {   
                nomAspecto: '',
                descripcion: '',
                puntajeMax: null,
                lstIndicadores:[
                    {
                        nomIndicador: '',
                        descripcion: '',
                        puntajeMax: null
                    }
                ],
                mostrar: true
            }
    ]

    $scope.btnCrearRubrica = function(){
        $scope.mostrarCrearRubrica = true;
        //Tengo que limpiar los datos
        document.getElementById("nomRubrica").value = ""
        $scope.lstAspectos.length = 1
        var aspecto = $scope.lstAspectos[0];
        aspecto.nomAspecto = ''
        aspecto.descripcion = ''
        aspecto.puntajeMax = null
        aspecto.lstIndicadores.length = 1;
        var indicador = aspecto.lstIndicadores[0];
        indicador.nomIndicador = ''
        indicador.descripcion = ''
        indicador.puntajeMax = null

    }

    $scope.btnGuardarRubrica = function(){
        $scope.mostrarCrearRubrica = false;
        window.alert("Se guardó la Rúbrica!")
    }

     $scope.btnAgregarAspecto= function() {
        $scope.lstAspectos.push({
            /* datos del aspecto */
            nomAspecto: '',
            descripcion: '',
            puntajeMax: null,
            lstIndicadores:[
                {
                    nomIndicador: '',
                    descripcion: '',
                    puntajeMax: null
                }
            ],
            mostrar: true
        });
     }

    $scope.btnAgregarIndicador= function(aspecto) {
        aspecto.lstIndicadores.push({  
            /* datos del indicador */
            nomIndicador: '',
            descripcion: '',
            puntajeMax: null
        });
     }

    

    $scope.btnMostrarAspecto = function(aspecto){
        aspecto.mostrar = !(aspecto.mostrar);
    }

    $scope.btnQuitarAspecto = function(aspecto){
        var pos = $scope.lstAspectos.indexOf(aspecto)
        $scope.lstAspectos.splice(pos,1)
    }
    


    $scope.btnQuitarIndicador = function(aspecto,indicador){
        var pos = aspecto.lstIndicadores.indexOf(indicador)
        aspecto.lstIndicadores.splice(pos,1)
    }

    $scope.btnVerRubricaActual = function(){
        /*  
        if(($scope.lstAspectos.length = 1 && $scope.lstAspectos[0].nomAspecto != "") || $scope.lstAspectos.length > 1)
            $scope.mostrarCrearRubrica = true;
        else{
            window.alert("Primero debe guardar una rúbrica!");
        }
        */
       $scope.mostrarCrearRubrica = true;
        

    }

})