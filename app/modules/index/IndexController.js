app.controller('IndexController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    //if ($scope.usuario == undefined) $location.path('/');
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

    //console.log(window.location.pathname);

    $scope.mostrarCurso = function(curso){
        $cookies.putObject('cursoActual', curso);
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('/curso')
    }

    $scope.btnLogout = function(){
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $cookies.remove('usuario');
        $location.path('/')
    }
})