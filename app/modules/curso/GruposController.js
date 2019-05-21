app.controller('GruposController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    //if ($scope.usuario == undefined) $location.path('/');

    $scope.lstAluSinGrupos = [];
    $scope.lstNuevoGrupo = [];

    var params = {
        idActividad: 1
    }

    serviceCRUD.TypePost('actividad/alumnos', params).then(function(res){
        $scope.lstAluSinGrupos = res.data
    })

    $scope.agregarAlu = function(i, al){
        $scope.lstAluSinGrupos.splice(i,1);
        $scope.lstNuevoGrupo.push(al);
    }

    $scope.elimAlu = function(al){
        
        $scope.lstNuevoGrupo.push(al);
        $scope.lstAluSinGrupos.splice(i,1);
    }
})