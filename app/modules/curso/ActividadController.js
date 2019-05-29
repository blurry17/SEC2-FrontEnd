
app.controller('ActividadController',function($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")
    console.dir($scope.actividad);

    $scope.esIndividual = false;
    $scope.esGrupal = false;
    $scope.actividad.tipo == 'I' ? $scope.esIndividual = true : $scope.esGrupal = true;

    $scope.mostrarFila=false;
    $scope.mostrarPreg=false;
    $scope.agregar=false;
    $scope.listaFam=[];
    $scope.guardado=false;
    $scope.editado=false;
    $scope.eliminado=false;
    $scope.listaPregunta=[];
    $scope.error=false;
    
    $scope.ejemplo=[];

    $scope.btnAgregarComentario= function() {
     }

    $scope.abreModalEliminar=function(){
        $('#mdVerAuto').modal('hide');
        $('#mdConfirmacionEliminacion').appendTo("body").modal('show');
    }

    $scope.btnAbreModalEliminar=function(){
        $('#mdVerCo').modal('hide');
        $('#mdConfirmacionEliminacionCo').appendTo("body").modal('show');
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
        let params={
            idActividad:$scope.actividad.idActividad,
        };

        serviceCRUD.TypePost("autoevaluacion/existencia", params).then(function (response) {
            if(response.data.message=="False"){
                $scope.listaFam=[];
                $('#mdCrearAutoEval').appendTo("body").modal('show');

            }else{
                $("#mdError").appendTo("body").modal('show');
                $scope.error=true;
            }
        })
        
    }
 
    $scope.noerror=function(){
        $scope.error=false;
    }

    $scope.btnVerAutoEval = function () {
        params = {
            idActividad: $scope.actividad.idActividad,
        };
        serviceCRUD.TypePost("autoevaluacion/existencia", params).then(function (response) {
            console.dir(response.data);
            if(response.data.message=="True"){
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
                
                

            }else{
                $("#mdNoHayRubrica").appendTo("body").modal('show');
                $scope.error=true;
            }
        })
    }

    $scope.btnVerAutoEval2=function(){
        $('#mdConfirmacionEliminacion').modal('hide');
        $('#mdVerAuto').appendTo("body").modal('show');
    }

    $scope.btnVerCo2=function(){
        $('#mdConfirmacionEliminacion').modal('hide');
        $('#mdVerCo').appendTo("body").modal('show');
    }

    $scope.btnCoEvaluacion=function(){
        $scope.listaPregunta=[];
        let params={
            idActividad:$scope.actividad.idActividad,
        };
        serviceCRUD.TypePost("co-evaluacion/existencia", params).then(function (response) {
            if(response.data.message=="False"){
               
                $('#mdCrearCoEval').appendTo("body").modal('show');
            }else{
                $("#mdErrorCoEval").appendTo("body").modal('show');
                $scope.error=true;
            }
        })

    }
    
    $scope.btnVerCoEval=function(){
        params={
            idActividad:$scope.actividad.idActividad,
        };

        serviceCRUD.TypePost("co-evaluacion/existencia", params).then(function (response) {
            console.dir(response.data);
            if(response.data.message=="True"){
                $scope.mostrarFila=false;
                $scope.mostrarPreg=false;
                $scope.agregar=false;
                $scope.listaPregunta=[];
                serviceCRUD.TypePost("co-evaluacion/listarPreguntas", params).then(function (response) {
                    console.dir(response.data);
        
                    $scope.listaPregunta=response.data.listaPreguntas;
                    console.dir($scope.listaPregunta);
                })
                console.dir($scope.actividad);
                $('#mdVerCo').appendTo("body").modal('show');
                
                

            }else{
                $("#mdNoHayCoEval").appendTo("body").modal('show');
                $scope.error=true;
            }
        })
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
        $scope.listaPregunta.forEach(function(pregunta){
            if(!pregunta.editar){
                pregunta.editar=!(pregunta.editar);
            }
        })
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

        
        $("#formAuto").addClass("was-validated");
        if (formAuto.checkValidity()) {
            let params = {
                idActividad: $scope.actividad.idActividad,
                listaFamilia: $scope.listaFam,
            }
            let encontrado=false;
            let i=0;
            let aux=$scope.listaFam;
            
            aux.forEach(function(fam){
                let auxLista = aux;
                auxLista.splice(i,1);
                i++;
                auxLista.forEach(function(fam1){
                    if(fam==fam1){
                        encontrado=true;   
                    }
                });
            });

            if(!encontrado){
                $scope.guardado = !($scope.guardado);
    
                serviceCRUD.TypePost("auto-evaluacion/creacion", params).then(function (response) {
    
                })
                $("#mdCrearAutoEval").modal('hide');
                $("#mdConfirmacionCreacion").appendTo("body").modal('show');

            }else{
                $("#mdCrearAutoEval").modal('hide');
                $("#mdFamiliaRepetida").appendTo("body").modal('show');
            }
        }
    }
 
    $scope.btnGuardarCoEval = function () {
        $("#formCoEval").addClass("was-validated");
        if (formCoEval.checkValidity()) {
            let params = {
                idActividad: $scope.actividad.idActividad,
                listaPreguntas: $scope.listaPregunta,
            }


            $scope.guardado = !($scope.guardado);

            serviceCRUD.TypePost("co-evaluacion/crear_co_evaluacion", params).then(function (response) {

            })
            $("#mdCrearCoEval").modal('hide');
            $("#mdConfirmacionCreacion").appendTo("body").modal('show');
        }
    }

    $scope.btnModificarAutoEval = function () {

        $("#formVerAuto").addClass("was-validated");
        if (formVerAuto.checkValidity()) {
            let params = {
                idActividad: $scope.actividad.idActividad,
                listaFamilia: $scope.listaFam,
            }
            serviceCRUD.TypePost("auto-evaluacion/editar", params).then(function (response) {
            })
            $scope.editado = !($scope.editado);
            $("#mdVerAuto").modal('hide');
            $("#mdConfirmacionModificacion").appendTo("body").modal('show');
        }
    }

    $scope.btnModificarCoEval = function () {

        $("#formVerCo").addClass("was-validated");
        if (formVerCo.checkValidity()) {
            let params = {
                idActividad: $scope.actividad.idActividad,
                listaPreguntas: $scope.listaPregunta,
            }
            serviceCRUD.TypePost("co-evaluacion/editar", params).then(function (response) {
            })
            $scope.editado = !($scope.editado);
            $("#formVerCo").modal('hide');
            $("#mdConfirmacionModificacion").appendTo("body").modal('show');
        }
    }

    $scope.btnEliminarAutoEval=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost("auto-evaluacion/eliminar",params).then(function(response){
            $scope.ejemplo=response.data.listaFamilia;
        })
        $scope.eliminado=!($scope.eliminado);
        $("#mdSeElimino").appendTo("body").modal('show');
    }

    $scope.btnEliminarCoEval=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost("co-evaluacion/eliminar",params).then(function(response){
            $scope.ejemplo=response.data.listaPreguntas;
        })
        $scope.eliminado=!($scope.eliminado);
        $("#mdSeElimino").appendTo("body").modal('show');
    }

})

