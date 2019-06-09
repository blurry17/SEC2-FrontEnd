
app.controller('ActividadController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.esIndividual = false;
    $scope.esGrupal = false;
    $scope.actividad.tipo == 'I' ? $scope.esIndividual = true : $scope.esGrupal = true;

    if ($scope.actividad.minInicio == "0") $scope.actividad.minInicio = $scope.actividad.minInicio + "0";
    if ($scope.actividad.minFin == "0") $scope.actividad.minFin = $scope.actividad.minFin + "0";
    $scope.listaAlarmas= [];
    $scope.mostrarFila=false;
    $scope.mostrarPreg=false;
    $scope.agregar=false;
    $scope.listaFam=[];
    $scope.guardado=false;
    $scope.editado=false;
    $scope.eliminado=false;
    $scope.listaPregunta=[];
    $scope.error=false;
    $scope.nuevaAlarma = true;
    $scope.ejemplo=[];
    $scope.regAlarma = {
        idAlarma: 0, 
        asunto : '',
        mensaje:'',
        fechaEjecucion : new Date(),
        horaInicio : '',
        minInicio : '00',
        nombre : ''
    }
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

    $scope.btnCalificaciones = function () {
        $location.path('calificaciones');
    }

    $scope.btnGrupos = function () {
        $location.path('grupos');
    }

    $scope.btnRubrica = function () {
        $location.path("rubrica")
    }

    $scope.btnEstadisticas = function () {
        $location.path("estadisticas")
    }
    $scope.btnEncuesta = function () {
        $location.path("encuesta")
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


            $scope.guardado = !($scope.guardado);

            serviceCRUD.TypePost("auto-evaluacion/creacion", params).then(function (response) {
                console.dir(response.data);
            })
            $("#mdCrearAutoEval").modal('hide');
            $("#mdConfirmacionCreacion").appendTo("body").modal('show');

        }
        $("#mdCrearAutoEval").modal('hide');
        $("#mdConfirmacionCreacion").appendTo("body").modal('show');
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
                console.dir($scope.listaPregunta);
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

    $scope.btnAlerta= function(){
        // se tiene q validar que ya exite una alarma...
        $scope.nuevaAlarma =true;
        $scope.regAlarma = {
            asunto : '',
            mensaje:'',
            fechaEjecucion : new Date(),
            horaInicio : '',
            minInicio : '00',
            nombre : ''
        }
        $("#mdCrearAlarma").appendTo("body").modal('show');
    }
    $scope.btnGuardarAlerta = function(){
        $scope.nuevaAlarma =true;

        $scope.regAlarma.fechaEjecucion.setMinutes(0);
        $scope.regAlarma.fechaEjecucion.setHours(0);
        $scope.regAlarma.fechaEjecucion.setSeconds(0);
        $scope.regAlarma.fechaEjecucion.setMilliseconds(0);
        $scope.regAlarma.fechaEjecucion.setMinutes($scope.regAlarma.fechaEjecucion.getMinutes() - $scope.regAlarma.fechaEjecucion.getTimezoneOffset() + parseInt($scope.regAlarma.minInicio));
        $scope.regAlarma.fechaEjecucion.setHours($scope.regAlarma.fechaEjecucion.getHours() + parseInt($scope.regAlarma.horaInicio));        

        var params={
            idActividad: $scope.actividad.idActividad,
            asunto: $scope.regAlarma.asunto,
            mensaje: $scope.regAlarma.mensaje,
            fechaEjecucion: $scope.regAlarma.fechaEjecucion,
            nombre : $scope.regAlarma.nombre
        }

        serviceCRUD.TypePost('actividad/alarma/crear',params).then(function(res){
            $("#mdCrearAlarma").modal('hide');
        })
    }

    $scope.btnlistarAlarmas = function(){
        var params= {
            idActividad: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('alarma/listar',params).then(function(res){
            console.dir(res);
            $scope.listaAlarmas = res.data;
        })
    }
    $scope.btnVerAlerta = function(p){
        $scope.nuevaAlarma = false;
        var objFecha = serviceUtil.getObjDate(p.fechaEjecucion);
        $scope.regAlarma = {
            idAlarma : p.idAlarma,
            asunto : p.asunto,
            mensaje: p.mensaje,
            fechaEjecucion : serviceUtil.convertToDate(objFecha.datestr) ,
            horaInicio : objFecha.hora,
            minInicio : objFecha.min,
            nombre : p.nombre
        }
        console.dir($scope.regAlarma);
        $("#mdCrearAlarma").appendTo("body").modal('show')
    }

    $scope.btnEditarAlerta = function(){
        $scope.regAlarma.fechaEjecucion.setMinutes(0);
        $scope.regAlarma.fechaEjecucion.setHours(0);
        $scope.regAlarma.fechaEjecucion.setSeconds(0);
        $scope.regAlarma.fechaEjecucion.setMilliseconds(0);
        $scope.regAlarma.fechaEjecucion.setMinutes($scope.regAlarma.fechaEjecucion.getMinutes() - $scope.regAlarma.fechaEjecucion.getTimezoneOffset() + parseInt($scope.regAlarma.minInicio));
        $scope.regAlarma.fechaEjecucion.setHours($scope.regAlarma.fechaEjecucion.getHours() + parseInt($scope.regAlarma.horaInicio));        
    
        var params={
            idAlarma : $scope.regAlarma.idAlarma,
            nombre : $scope.regAlarma.nombre,
            mensaje : $scope.regAlarma.mensaje,
            asunto : $scope.regAlarma.asunto,
            fechaEjecucion : $scope.regAlarma.fechaEjecucion
        }
        console.dir(params);
        serviceCRUD.TypePost('alarma/editar',params).then(function(res){
            console.dir(res);
            $("#mdCrearAlarma").modal('hide');
        })
    }
    $scope.btnEliminarAlerta = function(){
        var params={
            idAlarma : $scope.regAlarma.idAlarma
        }
        serviceCRUD.TypePost('alarma/eliminar',params).then(function(res){

            $('#mdCrearAlarma').modal('hide');
        })
        $scope.nuevaAlarma = true;
    }
})