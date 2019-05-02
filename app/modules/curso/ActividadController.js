app.controller('ActividadController',function($scope, $location, $cookies, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")
    $scope.mostrarFila=false;
    $scope.listaPreg=[];
    $scope.ejemplo=[{
        familia:"Preparacion",
        pregunta:"¿Dedicaste una cantidad adecuada de horas para la actividad?"
    },{
        familia:"Aprendizaje",
        pregunta:"¿Lograste aprender los conceptos clave para esta actividad?"
    },{
        familia:"Responsabilidad",
        pregunta:"¿Organizaste bien tu tiempo para lograr los objetivos de la actividad?"
    },{
        familia:"Interiorizacion",
        pregunta:"¿Crees que lo aprendido te servira en un futuro?"
    }];

    $scope.btnCalificaciones = function(){
        $location.path("calificaciones")
    }
    $scope.btnAutoEvaluacion=function(){
        $('#mdCrearAutoEval').appendTo("body").modal('show');
    }
    $scope.btnVerAutoEval=function(){
        $('#mdVerAuto').appendTo("body").modal('show');
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
