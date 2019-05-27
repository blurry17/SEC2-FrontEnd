app.controller('LoginController', function ($rootScope, $scope, $location, $cookies, $window, serviceCRUD) {
  $rootScope.showLayout = false;
  var usuario = null;
  $scope.showAlert1 = false;
  $scope.showAlert2 = false;

  $scope.btnLogin = function () {
    location.href = indexURL + 'main';

    if (!$scope.email || !$scope.pass) {
      $scope.showAlert1 = true;
      return;
    }
    $scope.showAlert1 = false;
    $scope.showAlert2 = false;

    
    var params = {
      email: $scope.email,
      clave: $scope.pass
    }

    serviceCRUD.TypePost('login', params).then(function (res) {
      if (res.data.message == 'error datos') {
        $scope.showAlert2 = true;
        return;
      }
      var usuario = res.data;   
      $cookies.putObject('usuario', usuario);

      $scope.showAlert2 = false;
      
      location.href = indexURL + 'main';
      //$rootScope.showLayout = true;
    })
    
  }

  $scope.btnForgotPassword = function () {
  }
})