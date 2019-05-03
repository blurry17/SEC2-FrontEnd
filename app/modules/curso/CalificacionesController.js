app.controller('CalificacionesController',function($scope, $location, $cookies, serviceUtil, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }

    $scope.btnclick = function(){
        var file = document.getElementById('file').files;
        console.dir(file);
    }

    var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;
})