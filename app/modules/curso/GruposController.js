app.controller('GruposController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.actividad = $cookies.getObject('actividadActual');
    $scope.lstAluSinGrupos = [];
    $scope.lstNuevoGrupo = [];
    $scope.lstGrupos = [];
    $scope.lstVerGrupo = [];
    $scope.creacionGrupos = false;
    $scope.showAlert1 = false;
    $scope.Reg = {
        nomGrupo: ''
    }

    function mostrarGrupos() {
        var params = { idActividad: $scope.actividad.idActividad };    
        serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function(res){
            if(res.data.length == 0){
                $scope.creacionGrupos = true;
                var params = {
                    idActividad: $scope.actividad.idActividad
                }
                serviceCRUD.TypePost('actividad/alumnos', params).then(function(res){
                    $scope.lstAluSinGrupos = res.data;
                })
            } else {
                $scope.lstGrupos = res.data;
                $scope.mostrarGrupos = true;
            }
        })
    }

    $scope.btnCrearGrupos = function() {
        $scope.creacionGrupos = true;
    }

    $scope.agregarAlu = function(i, al) {
        $scope.lstAluSinGrupos.splice(i, 1);
        $scope.lstNuevoGrupo.push(al);
    }

    $scope.elimAlu = function(i, al) {
        $scope.lstNuevoGrupo.splice(i, 1);
        $scope.lstAluSinGrupos.push(al);        
    }

    $scope.btnGuardarGrupo = function() {
        $scope.showAlert1 = false;
        $scope.showAlert2 = false;

        if (!$scope.Reg.nomGrupo){
            $scope.showAlert1 = true;
            return;
        }
        $scope.showAlert1 = false;

        if ($scope.lstNuevoGrupo.length == 0){
            $scope.showAlert2 = true;
            return;
        }
        $scope.showAlert2 = false;

        var gr = {
            nombre: $scope.Reg.nomGrupo,
            lstAlumnos: $scope.lstNuevoGrupo
        }

        $scope.lstGrupos.push(gr);
        $scope.Reg.nomGrupo = '';
        $scope.lstNuevoGrupo = [];
    }

    $scope.elimGrupo = function(i, gr) {
        for (let i = 0; i < gr.lstAlumnos.length; i++){
            $scope.lstAluSinGrupos.push(gr.lstAlumnos[i]);
        }
        $scope.lstGrupos.splice(i, 1);
    }

    $scope.mostrarIntegrantes = function(grupo) {
        var params = {
            idGrupo: grupo.idGrupo
        }
        serviceCRUD.TypePost('grupo/integrantes', params).then(function(res){
            $scope.lstVerGrupo = res.data;+
            $('#mdVerGrupo').appendTo("body").modal('show');
        })
    }

    $scope.btnTerminar = function() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            grupos: $scope.lstGrupos
        }
        serviceCRUD.TypePost('grupo/crear', params).then(function(res){
            $scope.creacionGrupos = false;
            mostrarGrupos();
        })   
    }

    function init(){
        mostrarGrupos();
    }

    init();
})