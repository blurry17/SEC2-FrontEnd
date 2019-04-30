app.controller('IndexController', function ($rootScope, $scope, $location, $cookieStore, $window, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookieStore.get('usuario');
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