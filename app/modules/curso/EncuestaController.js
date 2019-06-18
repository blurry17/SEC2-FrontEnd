app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');

    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno = $scope.usuario.alumno;
    $scope.listaAl=[];
    
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
     
    var ev = [0,0,0,0,0];// chequea si tiene rubrica del curso, autoeval, coeval y eval
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
            //console.dir("ESTOOOOO")
            //console.dir(res.data);
            $scope.listaAl=res.data;
        })
    }

    
    $scope.btnGuardarEvaluacion = function (tipo) {
        //console.dir("guardar")
        let params={
            idActividad:$scope.actividad.idActividad,
            //flgRubricaEspecial:$scope.actividad,
            //IdUsuarioCreador : ,
            //nombreRubrica : ,
            tipo :tipo,
            listaAspectos:$scope.listaAl,

        }
        serviceCRUD.TypePost('actividad/crear_rubrica', params).then(function(res) {
            
            $scope.listaAl=res.data;
        })
        
    }
    
    $scope.btnAgregarEsfuerzo = function () {
        
    }

    function init() {
        $scope.listarGrupo();
    }

    init();
})