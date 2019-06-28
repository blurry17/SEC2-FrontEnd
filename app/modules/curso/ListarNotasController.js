app.controller('ListarNotasController', function ($rootScope, $scope, $location, $cookies,serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.rubrica = $cookies.getObject("rubricaActual");
    $scope.esProfesor = $scope.usuario.profesor;
    $scope.listaNotasAlum =[];

 
    function ListarNotas() {
        var params = { 
          idActividad: $scope.actividad.idActividad,
          idRubrica: $scope.rubrica.idRubrica }
        
          //console.dir(params);
          serviceCRUD.TypePost('notas-finales', params).then(function (res) {
          $scope.listaNotasAlum = res.data.listaNotas;
          //console.dir("holaaaa");
        })
    }
    function init() {
        ListarNotas();
      }
    
      init();

})