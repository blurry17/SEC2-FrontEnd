app.controller('LoginController', function ($rootScope, $scope, $location, $window, serviceCRUD) {
  $rootScope.showLayout = false;
  var option = {
    animation: true,
    autohide: true,
    delay: 3000
  }

  $('.toast').toast(option)

  $scope.btnLogin = function(){
    $rootScope.showLayout = true;
    $location.path('/main');
  }

  $scope.btnForgotPassword = function(){
    $('#toast1').toast('show')
  }
})
