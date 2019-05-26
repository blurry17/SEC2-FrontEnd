
app.controller('ActividadController',function($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")

    $scope.esIndividual = false;
    $scope.esGrupal = false;
    $scope.actividad.tipo == 'I' ? $scope.esIndividual = true : $scope.esGrupal = true;

    $scope.mostrarFila=false;
    $scope.mostrarPreg=false;
    $scope.listaFam=[];

    $scope.btnCalificaciones = function(){
        $location.path('calificaciones');
    }

    $scope.btnGrupos = function () {
        $location.path('grupos');
    }

    $scope.btnAutoEvaluacion = function () {
        $('#mdCrearAutoEval').appendTo("body").modal('show');
    }
    
    $scope.btnVerAutoEval=function(){
        var params = {
            idActividad:$scope.actividad.idActividad,
        };
        serviceCRUD.TypePost("auto-evaluacion/listarPreguntas", params).then(function (response) {
            console.dir(response.data);
            $scope.ejemplo = response.data.listaFamilia;
        })
        console.dir($scope.actividad);
        $('#mdVerAuto').appendTo("body").modal('show');
    }
    $scope.showFila = function () {
        $scope.mostrarFila = true;
        let auxLista = {
            familia: "",
            listaPregunta: [],
        };
        $scope.listaFam.push(auxLista);
    }

    $scope.showPreg = function (fam) {
        $scope.mostrarPreg = true;
        let auxPreg = {
            pregunta: "",
        };
        fam.listaPregunta.push(auxPreg);
    }

    $scope.btnRubrica = function () {
        $location.path("rubrica")
    }

    $scope.irCurso = function () {
        $location.path("curso")
    }

    $scope.btnEstadisticas = function () {
        $location.path("estadisticas")
    }

    $scope.btnComentarios = function () {
        $location.path("comentarios")
    }

    $scope.deleteFam = function (fam) {
        let pos = $scope.listaFam.indexOf(fam);
        $scope.listaFam.splice(pos, 1);
    }

    $scope.deleteRow = function (fam, preg) {
        let posFam = $scope.listaFam.indexOf(fam);
        let posPreg = $scope.listaFam[posFam].listaPregunta.indexOf(preg);
        fam.listaPregunta.splice(posPreg, 1);
    }
    $scope.habilitarCampos = function (preg) {
        if (!preg.editar)
            preg.editar = !(preg.editar);
    }
    $scope.btnGuardarAutoEval = function () {
        let params={
            idActividad:$scope.actividad.idActividad,
            listaFamilia:$scope.listaFam,
        }
        console.dir(params)
        serviceCRUD.TypePost("auto-evaluacion/creacion", params).then(function (response) {
            console.dir(response);

        })
    }

    $scope.btnModificarAutoEval=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
            listaFamilia:$scope.listaFam,
        }
        console.dir(params);
        serviceCRUD.TypePost("auto-evaluacion/editar", params).then(function(response){
            console.dir(response);
        })
    }
    $scope.btnEliminarAutoEval=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost("auto-evaluacion/eliminar",params).then(function(response){
            console.dir(response.data);
            $scope.ejemplo=response.data.listaFamilia;
        })
    }
})
