app.controller('CalificacionesController',function($scope, $location, $cookies, serviceUtil, serviceCRUD){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")

    var file = null;

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }

    $scope.btnclick = function(){
        file = document.getElementById('file').files;
        console.dir(file);
    }

    var params = {
        irActividad : 1,
        idUsuario : 1,
        tipo : 1,
        fecha : new Date(),
        files : file,
        url : ''
    }

    serviceCRUD.TypePost('entregable/entrega', params).then(function(response){
        console.dir(response);
    })

    var url = 'https://paideia.pucp.edu.pe/cursos/mod/resource/view.php?id=381468';
    //document.getElementById('my_iframe').src = url;
})