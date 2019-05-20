app.controller('IndexController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    //if ($scope.usuario == undefined) $location.path('/');
    $rootScope.showLayout = true;
    
    $scope.cursos = [
        {
            nombre: '[H0681] Sistemas de Información 1'
        },
        {
            nombre: '[H0582] Algoritmia'
        },
        {   
            nombre: '[H0881] Ingeniería de Software'
        }
    ]

    //console.log(window.location.pathname);

    $scope.mostrarCurso = function(curso){
        console.dir(window.location.href);


        $cookies.putObject('cursoActual', curso);

        if(window.location.href == (indexURL + 'curso')){
            location.reload()
        }else{
            $('#sidebar').removeClass('active');
            $('.overlay').removeClass('active');
            $location.path('/curso')
        }

        //$('#sidebar').removeClass('active');
        //$('.overlay').removeClass('active');
        //window.location.replace(indexURL + 'curso');
        //location.reload();
        //$location.path('/curso')
    }

    $scope.btnLogout = function(){
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
        $cookies.remove('usuario');
        $location.path('/')
    }
})