app.controller('IndexController', function ($rootScope, $scope, $location, $window, serviceCRUD, serviceUtil) {
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
        sessionStorage['cursoActual'] = JSON.stringify(curso);
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('/curso')
    }

    /* serviceCRUD.TypeGet('hello').then(function(response){
        console.dir(response);
    }) */

    $scope.btnLogout = function(){
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $location.path('/')
    }    
})