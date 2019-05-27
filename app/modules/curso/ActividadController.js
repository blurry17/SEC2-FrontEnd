
app.controller('ActividadController',function($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")
    $scope.mostrarFila=false;
    $scope.mostrarPreg=false;
    $scope.agregar=false;
    $scope.listaFam=[];
    $scope.guardado=false;
    $scope.editado=false;
    $scope.eliminado=false;
    $scope.listaPregunta=[];
    
    $scope.ejemplo=[];

    $scope.btnAgregarComentario= function() {
     }

    $scope.btnCalificaciones = function(){
        $location.path('calificaciones');
    }

    $scope.btnGrupos = function () {
        $location.path('grupos');
    }
    $scope.btnCerrarModalAuto = function(){
        $("#mdCrearAutoEval").modal('hide');
    }
    $scope.btnCerrarModalVerAuto=function(){
        $("#mdVerAuto").modal('hide');
    }

    $scope.btnAutoEvaluacion = function () {
        $scope.listaFam=[];
        $('#mdCrearAutoEval').appendTo("body").modal('show');
    }

    $scope.btnVerAutoEval = function () {
        params = {
            idActividad: $scope.actividad.idActividad,
        };
        $scope.mostrarFila=false;
        $scope.mostrarPreg=false;
        $scope.agregar=false;
        $scope.listaFam=[];
        serviceCRUD.TypePost("auto-evaluacion/listarPreguntas", params).then(function (response) {
            console.dir(response.data);
            
            $scope.listaFam=response.data.listaFamilia;
            console.dir($scope.familia);
        })
        console.dir($scope.actividad);
        $('#mdVerAuto').appendTo("body").modal('show');
    }

    $scope.btnCoEvaluacion=function(){
        $scope.listaPregunta=[];
        $('#mdCrearCoEval').appendTo("body").modal('show');
    }
    
    $scope.btnVerCoEval=function(){
        params={
            idActividad:$scope.actividad.idActividad,
        };
        $('#mdVerCo').appendTo("body").modal('show');
    }

    $scope.showFila = function () {
        $scope.mostrarFila = true;
        let auxLista = {
            familia: "",
            listaPregunta: [],
        };
        if($scope.listaFam.length<15){    
            $scope.listaFam.unshift(auxLista);
        }
        $scope.listaFam.forEach(function(fam){
            if(!fam.editar){
                fam.editar=!(fam.editar);
            }
            fam.listaPregunta.forEach(function(preg){
                if (!preg.editar){
                    preg.editar = !(preg.editar);
                }
            })

        })
    }

    $scope.showPreg = function (fam) {
        $scope.mostrarPreg = true;
        let auxPreg = {
            pregunta: "",
        };
        if(fam.listaPregunta.length<10){
            fam.listaPregunta.unshift(auxPreg);
            
        }
        if(!fam.editar){
            fam.editar=!(fam.editar);
        }
        fam.listaPregunta.forEach(function(preg){
            if (!preg.editar){
                preg.editar = !(preg.editar);
            }
        })
    }
    
    $scope.showPregunta=function(){
        $scope.mostrarPreg=true;
        let auxPreg={
            pregunta:"",
        };
        if($scope.listaPregunta.length<10){
            $scope.listaPregunta.unshift(auxPreg);
        }
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
    
    $scope.deletePregunta = function(preg){
        let pos=$scope.listaPregunta.indexOf(preg);
        $scope.listaPregunta.splice(pos,1);
    }

    $scope.deleteRow = function (fam, preg) {
        let posFam = $scope.listaFam.indexOf(fam);
        let posPreg = $scope.listaFam[posFam].listaPregunta.indexOf(preg);
        fam.listaPregunta.splice(posPreg, 1);
    }
    $scope.habilitarCampos = function () {
        if(!$scope.agregar){
            $scope.agregar=!($scope.agregar);
        }
        $scope.listaFam.forEach(function(fam){
            if(!fam.editar){
                fam.editar=!(fam.editar);
            }
            fam.listaPregunta.forEach(function(preg){
                if (!preg.editar){
                    preg.editar = !(preg.editar);
                }
            })

        })
        
    }


    $scope.btnGuardarAutoEval = function () {
        
        let params={
            idActividad:$scope.actividad.idActividad,
            listaFamilia:$scope.listaFam,
        }
        $scope.guardado=!($scope.guardado);
        console.dir(params)
        serviceCRUD.TypePost("auto-evaluacion/creacion", params).then(function (response) {
            console.dir(response);
            

        })
        //$("#mdCrearAutoEval").modal('hide');
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
        $scope.editado=!($scope.editado);
    }
    $scope.btnEliminarAutoEval=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost("auto-evaluacion/eliminar",params).then(function(response){
            console.dir(response.data);
            $scope.ejemplo=response.data.listaFamilia;
        })
        $scope.eliminado=!($scope.eliminado);
    }
})
