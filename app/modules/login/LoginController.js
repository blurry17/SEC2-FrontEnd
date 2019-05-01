app.controller('LoginController', function ($rootScope, $scope, $location, $cookies, $window, serviceCRUD) {
  $rootScope.showLayout = false;

  $scope.btnLogin = function() {
    $rootScope.showLayout = true;
    
    var usuario = {
      id: 12,
      nombre: 'Juan Perez',
      esProfesor: 1,
      esJP: 0,
      esAlumno: 0
    }

    $cookies.putObject('usuario', usuario);
    $location.path('main');
  }

  $scope.btnForgotPassword = function() {

  }
})
