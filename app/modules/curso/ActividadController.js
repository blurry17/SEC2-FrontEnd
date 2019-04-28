app.controller('ActividadController',function($scope, $location, $cookieStore, serviceUtil){ 

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


})
