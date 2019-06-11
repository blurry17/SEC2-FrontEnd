app.controller('CalificacionesController', function ($rootScope, $scope, $location, $cookies, $http, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject("cursoActual")
    $scope.actividad = $cookies.getObject("actividadActual")
    $scope.listaAl = [];
    $scope.listaGrupal = [];
    $scope.esActIndividual = false;
    $scope.mostrar = false;
    $scope.falta = false;
    $scope.idRub = null;
    $scope.profe = $scope.usuario.esProfesor;
    $scope.notaFinal = null;
    $scope.flgCalificado = null;
    $scope.editar = null;
    $scope.auxNotaNivel = 0;
    $scope.nomRubrica="";

    console.dir('Estoy dentro de calificar')
    console.dir($scope.actividad)


    $scope.rubrica = {
        flgRubricaEspecial: 0,
        idUsuarioCreador: $scope.usuario.idUser,
        nombreRubrica: $scope.nomRubrica,
        listaNotaAspectos: [],
    }

    $scope.btnEditar = function () {
        $scope.flgCalificado = false;
        $scope.editar = true;
    }
//sacar de frende de lista aspectos
    $scope.ObtenerNotas = function () {
        if($scope.actividad.tipo == "I"){
            if ($scope.idalumno == '0') return;
            $scope.editar = false;
            var params = {
                idAlumno: $scope.idalumno,
                idActividad: $scope.actividad.idActividad,
                tipo: 4,
                idCalificador: $scope.usuario.idUser
            }
            serviceCRUD.TypePost('actividad/alumnos/obtener_nota_alumno', params).then(function (res) {
                $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                $scope.notaFinal = res.data.calificacion.nota;
                $scope.flgCalificado = res.data.flgCalificado;
                $scope.falta=res.data.calificacion.flgFalta==1;
                console.dir("Estos es la respuesta");
                console.dir(res.data);
                console.dir("Esta es la rubrica");
                console.dir($scope.rubrica);
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                }
            })
        }
        else{
            if ($scope.idgrupo == '0') return;
            $scope.editar = false;
            var params = {
                idActividad: $scope.actividad.idActividad,
                idGrupo: $scope.idgrupo,
                idJp: $scope.usuario.idUser
            }
            serviceCRUD.TypePost('actividad/alumnos/obtener_nota_grupo', params).then(function (res) {
                $scope.rubrica.listaNotaAspectos = res.data.calificacion.listaNotaAspectos;
                $scope.notaFinal = res.data.calificacion.nota;
                $scope.flgCalificado = res.data.flgCalificado;
                $scope.falta=res.data.calificacion.flgFalta==1;
                console.dir('Obtengo la nota del grupo')
                console.dir("Estos es la respuesta");
                console.dir(res.data);
                console.dir("Esta es la rubrica");
                console.dir($scope.rubrica);
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) {
                        $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                }
            })
        }
        

    }


    $scope.btnAgregarComentario = function (x) {
        x.puedeComentar = true;
    }

    $scope.marcado = function () {
        $scope.falta = true;
    }

    $scope.btnGuardarPuntaje = function () {

        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            if ($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == null || $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje == NaN) {
                                window.alert('Falta registrar la nota de un nivel');
                                return;
                            }
                        }

                    }
                }
            }
        }

        window.confirm('¿Está seguro que desea guardar?');

       console.dir('2');
        for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
            if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion != 3) {
                $scope.rubrica.listaNotaAspectos[i].nota = parseInt($scope.rubrica.listaNotaAspectos[i].nota);
                if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 1) {
                    $scope.rubrica.listaNotaAspectos[i].nota=0;
                    for (let j = 0; j < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador.length; j++) {
                        $scope.rubrica.listaNotaAspectos[i].nota=$scope.rubrica.listaNotaAspectos[i].nota+$scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].nota;
                        for (let k = 0; k < $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles.length; k++) {
                            $scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje = parseInt($scope.rubrica.listaNotaAspectos[i].listaNotaIndicador[j].listaNiveles[k].puntaje);
                        }
                    }
                }
            }
            else {
                $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota ? 1 : 0;
            }
        }
        
        
        console.dir('3');
        if ($scope.editar == false) {
            if($scope.actividad.tipo == "I"){
                var params = {
                    idActividad: $scope.actividad.idActividad,
                    idAlumno: $scope.idalumno,
                    idJp: $scope.usuario.idUser,
                    nota: parseInt($scope.notaFinal),
                    flgFalta: $scope.falta ? 1 : 0,
                    idRubrica: $scope.idRub,
                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                    flgCompleto:1,
                }
                console.dir('entra a calificar');
                serviceCRUD.TypePost('actividad/alumnos/calificar', params).then(function (res) {
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                    $scope.ObtenerNotas();
                })
            }
            else{
                //es actividad grupal
                var params = {
                    idActividad: $scope.actividad.idActividad,
                    idGrupo: $scope.idgrupo,
                    idJp: $scope.usuario.idUser,
                    nota: parseInt($scope.notaFinal),
                    flgFalta: $scope.falta ? 1 : 0,
                    idRubrica: $scope.idRub,
                    listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                    flgCompleto:1,
                }
                console.dir('entra a calificar grupo');
                serviceCRUD.TypePost('actividad/alumnos/calificar_grupo', params).then(function (res) {
                    for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                        if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                    }
                    $scope.ObtenerNotas();
                })
            }
        } else {
            var params = {
                idActividad: $scope.actividad.idActividad,
                idAlumno: $scope.idalumno,
                idJpN: $scope.usuario.idUser,
                idJpAnt:$scope.usuario.idUser,
                nota: parseInt($scope.notaFinal),
                flgFalta: $scope.falta ? 1 : 0,
                idRubrica: $scope.idRub,
                listaNotaAspectos: $scope.rubrica.listaNotaAspectos,
                flgCompleto:1,
            }
            console.dir('entra a editar');
            console.dir(params);
            serviceCRUD.TypePost('actividad/alumnos/editar_nota', params).then(function (res) {
                for (let i = 0; i < $scope.rubrica.listaNotaAspectos.length; i++) {
                    if ($scope.rubrica.listaNotaAspectos[i].tipoClasificacion == 3) $scope.rubrica.listaNotaAspectos[i].nota = $scope.rubrica.listaNotaAspectos[i].nota == 1;
                }
                $scope.ObtenerNotas();
            })
        }
    }

    $scope.btnclick = function () {
        file = document.getElementById('file').files;
        var datos = new FormData();
        var hoy = new Date();

        datos.append("idActividad", 1);
        datos.append('idUsuario', 1);
        datos.append('tipo', 1);
        datos.append('cantidadFiles', file.length)
        datos.append('fechaEntrega', serviceUtil.ddmmyyyy(hoy));
        datos.append('url', '');

        for (var i = 0; i < file.length; i++) {
            var name = 'file ' + (i + 1);
            datos.append(name, file[i]);
        }


    }

    function ListarAlumnos() {
        //Si es una actividad grupal
        if($scope.actividad.tipo == "G") {
            $scope.esActIndividual = false;
            console.dir('Actividad grupal!')
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaGrupal = res.data;
                console.dir($scope.listaGrupal)
            })
            $scope.mostrar = true;
        }
        else{ //Si es una actividad individual
            $scope.esActIndividual = true;
            
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaAl = res.data.lista;
            })
            $scope.mostrar = true;
        }

    }

    $scope.elegirNivel = function (nivel,indicador,aspecto){
        indicador.nota = nivel.puntaje;
        aspecto.nota=0;
        for(let i=0;i<aspecto.listaNotaIndicador.length;i++){
            aspecto.nota+=aspecto.listaNotaIndicador[i].nota;

        }

    }

    function ObtenerRubrica() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: 4,
        }
        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {

            $scope.rubrica.listaNotaAspectos = res.data.listaAspectos;
            console.dir(res.data);

            //console.dir(res.data.nombreRubrica);
            //$scope.idRub = res.data.idRubrica;
            //$scope.rubrica.nombreRubrica=res.data.nombreRubrica

        })
    }

    function init() {
        ListarAlumnos();
        ObtenerRubrica();
    }

    init();
})