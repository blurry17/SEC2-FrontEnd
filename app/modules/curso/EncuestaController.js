app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');

    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno = $scope.usuario.alumno;
    $scope.listaAl=[];
    /**
     $scope.btnGuardarEncuesta = function () {
        $("#formEva").addClass("was-validated");
        
        serviceCRUD.TypePost('actividad/', $scope.rubrica).then(function (response) {
            
            window.alert("Se guardaron los cambios!")
        })
    }
     */
    

     
    var ev = [0,0,0,0,0];// chequea si tiene rubrica del curso, autoeval, coeval y eval
    $scope.btnEvaluacion = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            console.dir(res.data);
            //if (res.data.succeed == false) return;
            ev[tipo] = 1;
            
            $scope.rubrica = res.data;
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                $scope.rubrica.listaAspectos[i].mostrar = true;
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++)
                    $scope.rubrica.listaAspectos[i].listaIndicadores[j].mostrar = true;
            }
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
        //PEDIR SERVICIO
        //Listar a sus compañeros de grupo
        //id usuario, id actividad
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

    $scope.btnAgregarEsfuerzo = function () {
        
    }

    function init() {
        $scope.listarGrupo();
    }

    init();
})