app.controller('LoginController', function ($rootScope, $scope, $location, $cookieStore, $window, serviceCRUD) {
  $rootScope.showLayout = false;
  var option = {
    animation: true,
    autohide: true,
    delay: 3000
  }

  $scope.btnLogin = function() {
    $rootScope.showLayout = true;
    
    var usuario = {
      id: 12,
      nombre: 'Juan Perez',
      esProfesor: 1,
      esJP: 0,
      esAlumno: 0
    }

    $cookieStore.put('usuario', usuario);
    $location.path('/main');
  }

  $scope.btnForgotPassword = function() {

  }
})
