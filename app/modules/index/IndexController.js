app.controller('IndexController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;
    
    $scope.cursos = [
        {
            nombre: 'Sistemas de Información 1 H603'
        },
        {
            nombre: 'Algoritmia H501'
        },
        {   
            nombre: 'Ingeniería de Software H883'
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