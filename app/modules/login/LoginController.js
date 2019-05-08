app.controller('LoginController', function ($rootScope, $scope, $location, $cookies, $window, serviceCRUD) {
  $rootScope.showLayout = false;
  var usuario = null;

  $scope.btnLogin = function () {
    var params = {
      email: $scope.email,
      clave: $scope.pass
    }

    $rootScope.showLayout = true;

    serviceCRUD.TypePost('login', params).then(function(res){
        usuario = res.data;
        $cookies.putObject('usuario', usuario);
        $location.path('/main');
    })
  }

  $scope.btnForgotPassword = function () {
  }
})