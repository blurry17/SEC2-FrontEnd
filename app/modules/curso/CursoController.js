//Manuel Delgado: "He cambiado esto"
app.controller('CursoController',function($scope){
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
        var cursoElegido = $scope.cursos.indexOf(curso)
        console.log(cursoElegido)
        console.log($scope.cursos[cursoElegido].nombre)
        return $scope.cursos[cursoElegido].nombre
    }
})

