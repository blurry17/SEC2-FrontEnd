app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno =$scope.usuario ;
    $scope.listaAl = null;
    $scope.esActGrupal = false;
    //console.dir($scope.usuario );

    /**
     $scope.btnGuardarEncuesta = function () {
        $("#formEva").addClass("was-validated");
        
        serviceCRUD.TypePost('actividad/', $scope.rubrica).then(function (response) {
            
            window.alert("Se guardaron los cambios!")
        })
    }
     */

    if($scope.actividad.tipo == "G") {
        $scope.esActGrupal = true;
    }else {
        $scope.esActGrupal = false;
    }
    
    $scope.btnListarGrupo = function() {
        console.dir("hola");
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario:$scope.usuario.idUser  
        }
        console.dir(params);
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion',params).them(function(res){
            $scope.listaAl = res.data.lista;
        })
    }

    $scope.btnEvaluacionE = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario:$scope.usuario.idUser, 
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_calificacion_otra_rubrica', params).then(function (res) {
            $scope.rubrica = res.data;
            if(tipo == 2){
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null; 
            }else{
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;
                
            }
            console.dir(res);
        })
    }
    
    $scope.btnEvaluacion = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            $scope.rubrica = res.data;
            if(tipo == 2){
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null; 
            }else{
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;
                
            }
        })
    }


    
    $scope.btnAgregarEsfuerzo = function () {
        
    }
})