

app.controller('RubricaController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.mostrarCrearRubrica = false;

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
                ]
            }
    ]

    $scope.btnCrearRubrica = function(){
        $scope.mostrarCrearRubrica = true;
        /* Tengo que pushear un aspecto a lstAspectos
        y un indicador a lstIndicadores.
        Luego, estos van a a ser usados por el ng-repeat
        pero como están vacíos, van a parecer nuevos registros*/

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
            ]
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
    

    $scope.btnOcultarAspecto = function(aspecto){

    }

    $scope.btnQuitarAspecto = function(aspecto){
        var pos = $scope.lstAspectos.indexOf(aspecto)
        $scope.lstAspectos.splice(pos,1)
    }

    $scope.btnQuitarIndicador = function(aspecto,indicador){
        var pos = aspecto.lstIndicadores.indexOf(indicador)
        aspecto.lstIndicadores.splice(pos,1)
    }

})