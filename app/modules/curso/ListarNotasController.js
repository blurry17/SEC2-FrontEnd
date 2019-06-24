app.controller('ListarNotasController', function ($rootScope, $scope, $location, $cookies,serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.esProfesor = $scope.usuario.profesor;

    console.dir("holaaaa1");
    function ListarNotas() {
        console.dir("holaaaa");
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('alumnos/notas', params).then(function (res) {
          $scope.listaN = res.data.listaNotas;
          $scope.listaFrec = res.data.notaFrecuencia;
          $scope.cantidadN = res.data.cantidadNotas;
          $scope.cantidadF = res.data.cantidadFalta;
          $scope.cantidadT = res.data.cantidadTotal;
          console.dir(res.data);
        })
    }
    function init() {
        ListarNotas();
      }
    
      init();

})