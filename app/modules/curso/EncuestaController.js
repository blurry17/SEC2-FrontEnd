app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    var usuario = $cookies.getObject('usuario');
    
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno = usuario.alumno;

    var ev = [0,0,0,0,0]; // chequea si tiene rubrica del curso, autoeval, coeval y eval
    function obtenerEvaluacion(tipo) {  
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        }  
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            console.dir(res.data);
            if (res.data.succeed == false) return;
            ev[tipo] = 1;
            $scope.rubrica = res.data;
            for (let i = 0; i < $scope.rubrica.listaAspectos.length; i++) {
                $scope.rubrica.listaAspectos[i].mostrar = true;
                for (let j = 0; j < $scope.rubrica.listaAspectos[i].listaIndicadores.length; j++)
                    $scope.rubrica.listaAspectos[i].listaIndicadores[j].mostrar = true;
            }
            
        })
    }
    function init() {
        obtenerEvaluacion(2);
        obtenerEvaluacion(3);
      }
    
    init();

})