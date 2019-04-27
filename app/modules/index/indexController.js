app.controller('IndexController', function ($rootScope, $scope, $location, $cookieStore, $window, serviceCRUD, serviceUtil) {
    $rootScope.showLayout = true;
    $scope.cursos = [
        {
            nombre: 'Sistemas de Información 1'
        },
        {
            nombre: 'Algoritmia'
        },
        {   
            nombre: 'Ingeniería de Software'
        }
    ]

    $scope.usuario = $cookieStore.get('usuario');

    console.dir($scope.usuario)

    $scope.mostrarCurso = function(curso){
        $cookieStore.put('cursoActual', curso);

        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('/curso')
    }

    $scope.btnLogout = function(){
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $cookieStore.remove('usuario');
        $location.path('/')
    }
})