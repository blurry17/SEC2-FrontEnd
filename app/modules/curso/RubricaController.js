

app.controller('RubricaController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.mostrarCrearRubrica = false;

    $scope.lstAspectos = [
        [
            {
                nomAspecto: '',
                descripcion: '',
                puntajeMax: 0,
                lstIndicadores: $scope.lstIndicadores[0]
            }
        ]
    ]

    $scope.lstIndicadores = [
        [
            {
                nomIndicador: 'indicador1',
                descripcion: '',
                puntajeMax: 0
            }
        ]
    ]


    $scope.btnCrearRubrica = function(){
        $scope.mostrarCrearRubrica = true;
        /* Tengo que pushear un aspecto a lstAspectos
        y un indicador a lstIndicadores.
        Luego, estos van a a ser usados por el ng-repeat
        pero como están vacíos, van a parecer nuevos registros*/
        $scope.lstAspectos.push({

        })

    }

     $scope.btnAgregarAspecto= function() {
        $scope.lstAspectos.push({
            /* datos del aspecto */
            nomAspecto: '',
            descripcion: '',
            puntajeMax: 0,
            lstIndicadores: []
        });
     }

    $scope.btnAgregarIndicador= function(aspecto) {
        var numAspecto = lstAspectos.indexof(aspecto);
        $scope.lstAspectos[numAspecto].push({
            /* datos del indicador */
            nomIndicador: '',
            descripcion: '',
            puntajeMax: 0
        });
     }
    

})