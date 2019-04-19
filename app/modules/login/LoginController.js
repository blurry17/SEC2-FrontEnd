app.controller('LoginController', function ($rootScope, $scope, $location, $window) {
  $rootScope.showLayout = false;

  $scope.btnLogin = function(){
    $rootScope.showLayout = true;
    $location.path('/main');
  }
})
