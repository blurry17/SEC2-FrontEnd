app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $scope.esProfesor = $scope.usuario.profesor;
    $scope.idalumno=null;
    if ($scope.usuario == undefined) $location.path('/');
    console.dir($scope.usuario)
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    console.dir($scope.curso)
    $scope.vistaAlumno =$scope.usuario.alumno;
    $scope.listaAl = null;
    $scope.esActGrupal = false;
    $scope.idActividadUHorario = null;
    $scope.idalumno = null;
    //Como me encuentro en la actividad, el tipo es 1 y el idActividadUHorario es idActividad
    $scope.regEsfuerzo = {
        tipo: 1,
        idActividadUHorario: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        listaCategorias: []
    };

    $scope.regEsfuerzoHoras = {
        idRegistroEsfuerzo: $scope.regEsfuerzo.idRegistroEsfuerzo,
        idAlumno: null,
        listaCategorias: $scope.regEsfuerzo.listaCategorias
    }

    $scope.hayRegHorasActividad = false;


    //console.dir($scope.usuario );

    /**
     $scope.btnGuardarEncuesta = function () {
        $("#formEva").addClass("was-validated");
        
        serviceCRUD.TypePost('actividad/', $scope.rubrica).then(function (response) {
            
            window.alert("Se guardaron los cambios!")
        })
    }
     */

    if($scope.actividad.tipo == "G") {
        $scope.esActGrupal = true;
    }else {
        $scope.esActGrupal = false;
    }
    
    $scope.btnListarGrupo = function() {
        console.dir("hola");
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario:$scope.usuario.idUser  
        }
        console.dir(params);
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion',params).them(function(res){
            $scope.listaAl = res.data.lista;
        })
    }

    $scope.btnEvaluacionE = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario:$scope.usuario.idUser, 
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_calificacion_otra_rubrica', params).then(function (res) {
            $scope.rubrica = res.data;
            if(tipo == 2){
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null; 
            }else{
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;
                
            }
            console.dir(res);
        })
    }
    
    $scope.btnEvaluacion = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        } 
        
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            if (res.data.succeed == false){
                window.alert('No existe esta evaluación');
                return;
            }
            $scope.rubrica = res.data;
            console.dir($scope.rubrica);
            if(tipo == 2){
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null; 
            }else{
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;
                
            }
        })
    }

    $scope.listarGrupo = function () { 
        let params={
            idUsuario:$scope.usuario.idUser,
            idActividad:$scope.actividad.idActividad,
        }
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion', params).then(function(res) {
            console.dir("ESTOOOOO")
            console.dir(res.data);
            $scope.listaAl=res.data;
        })
    }

    $scope.obtenerCo=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
            idCalificado:$scope.idalumno,
            idCalificador:$scope.usuario.idUser,

        }
        console.dir('este es el yeison');
        console.dir(params);
        serviceCRUD.TypePost('coevaluacion/obtener_coevaluacion',params).then(function(res){
            console.dir('LA RES');
            console.dir(res.data);
        })
    }

    $scope.btnGuardarCo=function(){
        let params={
            idActividad:$scope.actividad.idActividad,
            idAlumno:$scope.idalumno,
            idCalificador:$scope.usuario.idUser,
            nota:0,
            flgFalta:0,
            listaNotaAspectos:$scope.rubrica.listaAspectos,
            flgCompleto:0,
        }
        console.dir('LEEEE ESTO');
        console.dir(params);
        serviceCRUD.TypePost('coevaluacion/calificar_coevaluacion',params).then(function(res){

        })
    }

    $scope.btnGuardarEvaluacion = function (tipo) {
        console.dir("guardar")
        let params={
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.usuario.alumno,
            nota: 12,
            idRubrica: 1,
            flgFalta:0,
            listaAspectos: [],
            flgCompleto: 0
            
        }

        serviceCRUD.TypePost('actividad/calificar_autoevaluacion', params).then(function(res) {
            
            //$scope.listaAl=res.data;
            console.dir(res.data);
        })
        
    }
    
    //Como profesor: Crear Registro Horas
    $scope.btnCrearRegistroHoras = function () {
        console.dir($scope.regEsfuerzo)
        console.dir(JSON.stringify($scope.regEsfuerzo))
        serviceCRUD.TypePost('registro_horas/crear_registro_horas', $scope.regEsfuerzo).then(function (res) {
            console.dir(res)
        })
    }

    //Como alumno: Registrar Horas
    $scope.btnRegistrarHoras = function (){
        console.dir('regEsfuerzoHoras cuando presiono el boton')
        console.dir($scope.regEsfuerzoHoras)
        
        serviceCRUD.TypePost('registro_horas/registrar_horas', $scope.regEsfuerzoHoras).then(function (res) {
            console.dir(res)
        })
    }

    //Como profesor y alumno: Obtener registro horas x alumno
    $scope.obtenerRegistroHorasXAlumno = function(){
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.idalumno
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.idalumno
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasActividad = true;
        })
    }

    $scope.obtenerRegHorasComoAlumno = function(){
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.usuario.idUser
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasAlumno = true;
        })
    }

    //Como profesor y alumno: Obtener registro horas (solo categorias)
    function obtenerRegistroHorasSoloCategorias(){
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas', params).then(function (res) {
            if (res.data.succeed == false){
                console.dir('no se encontro el registro de esfuerzo')
                return;
            } 
            else{
                //Asigno el objeto registro horas categoria al registro horas con respuestas
                $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
                $scope.regEsfuerzoHorasidAlumno = $scope.usuario.idUser;
                $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
                for (let i = 0; i < $scope.regEsfuerzoHoras.listaCategorias.length; i++) {
                    $scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas = []
                }
            }
            
        })
    }

    //Como profesor: Agregar una categoria
    $scope.btnAgregarCategoria = function(){
        $scope.regEsfuerzo.listaCategorias.push({
            descripcion: ''
        });
    }

    //Como profesor: Quitar una categoria
    $scope.btnQuitarCategoria = function(categoria){
        var pos = $scope.regEsfuerzo.listaCategorias.indexOf(categoria)
        $scope.regEsfuerzo.listaCategorias.splice(pos, 1)
    }

    //Como alumno puedo agregar una respuesta a una categoria
    $scope.btnAgregarRespuesta = function(categoria){
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        console.dir(pos)
        
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.push({
            descripcion: '',
            horasPlanificadas: null,
            horasReales: null
        })
        console.dir($scope.regEsfuerzoHoras)
    }

    //Como alumno: Quitar una respuesta de una categoria
    $scope.btnQuitarRespuesta = function(categoria,respuesta){
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        var pos2 = $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.indexOf(respuesta);
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.splice(pos2,1)
    }

    function ListarAlumnos() {
        //Si es una actividad grupal
        if ($scope.actividad.tipo == "G") {
            $scope.esActIndividual = false;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaGrupal = res.data;
            })
            $scope.mostrar = true;
        }
        else { //Si es una actividad individual
            $scope.esActIndividual = true;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                console.dir(res.data);
                $scope.listaAl = res.data.lista;
            })
            $scope.mostrar = true;
        }
    }

    function init() {
        if($scope.esProfesor){
            ListarAlumnos();
            obtenerRegistroHorasSoloCategorias();
            $scope.obtenerRegistroHorasXAlumno();
        }
        if(!$scope.esProfesor){
            $scope.listarGrupo();
            $scope.obtenerRegHorasComoAlumno();
        }
            

        
        
    }

    init();
})