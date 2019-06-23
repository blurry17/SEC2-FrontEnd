app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');

    $scope.idalumno=null;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno =$scope.usuario.alumno;
    $scope.listaAl = null;
    $scope.esActGrupal = false;
    $scope.idRub=0;
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
            console.dir('Esta es la rubricaCoAuto');
            console.dir(res);
        })
    }
    
    $scope.btnEvaluacion = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            if (res.data.succeed == false){
                window.alert('No existe esta evaluación');
                return;
            }
            $scope.rubrica = res.data;
            $scope.idRub=res.data.idRubrica;
            console.dir('Leer la rubricaa');
            console.dir($scope.rubrica);
            if(tipo == 2){
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null; 
            }else{
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;
                
            }
        })
    }

    $scope.listarGrupo = function () { 
        let params={
            idUsuario:$scope.usuario.idUser,
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion', params).then(function(res) {
            console.dir("ESTOOOOO")
            console.dir(res.data);
            $scope.listaAl=res.data;
        })
    }

    $scope.obtenerCo=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
            idCalificado:$scope.idalumno,
            idCalificador:$scope.usuario.idUser,

        }
        console.dir('este es el yeison');
        console.dir(params);
        serviceCRUD.TypePost('coevaluacion/obtener_coevaluacion',params).then(function(res){
            $scope.rubricaCoauto=res.data;
            console.dir('LA RES');
            console.dir(res.data);
            
        })
    }

    $scope.btnGuardarCo=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
            idAlumno:$scope.idalumno,
            idCalificador:$scope.usuario.idUser,
            nota:0,
            idRubrica:$scope.idRub,
            flgFalta:0,
            listaNotaAspectos:$scope.rubricaCoauto.listaNotaAspectos,
            flgCompleto:0,
        }
        console.dir('LEEEE ESTO');
        console.dir(params);
        serviceCRUD.TypePost('coevaluacion/calificar_coevaluacion',params).then(function(res){

        })
    }

    $scope.btnGuardarEvaluacion = function (tipo) {
        console.dir("guardar")
        let params={
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.usuario.alumno,
            nota: 12,
            idRubrica: 1,
            flgFalta:0,
            listaAspectos: [],
            flgCompleto: 0
            
        }

        serviceCRUD.TypePost('actividad/calificar_autoevaluacion', params).then(function(res) {
            
            //$scope.listaAl=res.data;
            console.dir(res.data);
        })
        
    }
    
    $scope.btnAgregarEsfuerzo = function () {
        
    }

    function init() {
        $scope.listarGrupo();
    }

    init();
})