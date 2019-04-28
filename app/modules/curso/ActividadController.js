app.controller('ActividadController',function($scope, $location, $cookieStore, serviceUtil){ 
    $scope.curso=$cookieStore.get("cursoActual")
    $scope.actividad=$cookieStore.get("actividadActual")
    $scope.mostrarFila=false;
    $scope.listaPreg=[];

    $scope.btnCalificaciones = function(){
        $location.path("calificaciones")
    }
    $scope.btnAutoEvaluacion=function(){
        $('#mdCrearAutoEval').appendTo("body").modal('show');
    }
    $scope.showFila=function(){
        $scope.mostrarFila=true;
        let auxLista={
            familia:"",
            pregunta:""
        };
        $scope.listaPreg.push(auxLista);
    }  

    $scope.btnRubrica = function(){
        $location.path("rubrica")
    }

    $scope.irCurso = function(){
        $location.path("curso")
    }

    $scope.btnEstadisticas = function(){
        $location.path("estadisticas")
    }
})
