app.controller('CursoController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    if ($scope.usuario == undefined) $location.path('/');
    console.dir($scope.usuario)
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.esProfesor = $scope.usuario.profesor;
    $scope.nuevo = true; // true->crear false->editar
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.busy = false;
    $scope.showAlert1 = false;
    $scope.showAlert2 = false;
    $scope.showAlert3 = false;
    $scope.showAlert4 = false;
    $scope.showAlert5 = false;
    $scope.showAlert6 = false;
    $scope.showAlert7 = false;
    $scope.showAlert8 = false;
    $scope.lstGrupos = [];
    $scope.lstVerAgrupacion = [];
    $scope.regAct = {
        nombre: '',
        descripcion: '',
        tipo: 'I',
        flgEntregable: true,
        nota: null,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        flgConfianza: true,
        flgMulticalificable: false,
        horaInicio: '',
        horaFin: '',
        minInicio: '00',
        minFin: '00'
    }
    $scope.lstNuevoGrupo = [];

    //Como me encuentro en el curso, el tipo es 2 y el idActividadUHorario es idhorario
    $scope.regEsfuerzo = {
        tipo: 2,
        idActividadUHorario: $scope.curso.idhorario,
        idUsuarioCreador: $scope.usuario.idUser,
        listaCategorias: []
    };

    $scope.regEsfuerzoHoras = {
        idRegistroEsfuerzo: $scope.regEsfuerzo.idRegistroEsfuerzo,
        idAlumno: null,
        listaCategorias: $scope.regEsfuerzo.listaCategorias
    }

    $scope.listaFeedbacks = []
    $scope.listaActividadesFeedback = [];

    $scope.hayRegHorasHorario = false;
    $scope.regHorasIngresado = false;

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
    });


    var idActEdit = null;
    $('#acts').collapse('show');
    $('#groups').collapse('show');

    function ListarActividades() {
        var params = { idHorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('actividad/lista', params).then(function (res) {
            console.dir(res.data);
            for (let i = 0; i < res.data.length; i++) {
                var dtIni = serviceUtil.getObjDate(res.data[i].fechaInicio);
                var dtFin = serviceUtil.getObjDate(res.data[i].fechaFin);

                res.data[i].fechaInicio = dtIni.datestr;
                res.data[i].horaInicio = dtIni.hora;
                res.data[i].minInicio = dtIni.min;

                res.data[i].fechaFin = dtFin.datestr;
                res.data[i].horaFin = dtFin.hora;
                res.data[i].minFin = dtFin.min;
            }
            $scope.lstActividad = res.data;
        })
    }

    function ListarAgrupaciones() {
        /* var params = { idhorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('grupo/listar-general', params).then(function (res) {
            $scope.lstGrupos = res.data;
        }) */
    }

    function hayAgrupaciones() {
        var params = {
            idHorario: $scope.curso.idhorario
        }
        serviceCRUD.TypePost('existencia/agrupaciones', params).then(function (res) {
            console.dir(res);
            if (res.data.message == false) {
                $scope.existeAgrupaciones = false;
                $scope.lstAgrupaciones = [];

            } else {
                $scope.existeAgrupaciones = true;

                serviceCRUD.TypePost('grupo/listar-general', params).then(function (res2) {
                    $scope.lstAgrupaciones = res2.data;
                    //console.dir(res2);
                    //console.dir($scope.lstAgrupaciones);
                })
            }
        })
    }

    $scope.btnAgregarActividad = function () {
        $scope.nuevo = true;
        $("#formAct").removeClass("was-validated");
        $scope.regAct = {
            nombre: '',
            descripcion: '',
            tipo: 'I',
            flgEntregable: true,
            flgConfianza: true,
            flgMulticalificable: false,
            fechaInicio: new Date(),
            fechaFin: new Date(),
            horaInicio: '8',
            horaFin: '10',
            minInicio: '0',
            minFin: '0'
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnAgregarAgrupacion = function () {
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            $scope.lstAluSinGrupos = res.data;
        })
        $('#mdAgregarAgrupacion').appendTo("body").modal('show');
    }

    $scope.btnGuardarActividad = function () {
        $("#formAct").addClass("was-validated");
        if ($scope.regAct.fechaInicio > $scope.regAct.fechaFin) {
            $("#formAct").removeClass("was-validated");
            $scope.showAlert1 = true;
            return;
        } else if (($scope.regAct.fechaInicio.getYear() == $scope.regAct.fechaFin.getYear() && $scope.regAct.fechaInicio.getMonth() == $scope.regAct.fechaFin.getMonth() && $scope.regAct.fechaInicio.getDate() == $scope.regAct.fechaFin.getDate()) &&
            (parseInt($scope.regAct.horaInicio) >= parseInt($scope.regAct.horaFin) || (parseInt($scope.regAct.horaInicio) == parseInt($scope.regAct.horaFin) && parseInt($scope.regAct.minInicio) >= parseInt($scope.regAct.minFin)))) {
            $("#formAct").removeClass("was-validated");
            $scope.showAlert1 = true;
            return;
        } else if (!$scope.regAct.nombre || !$scope.regAct.descripcion) {
            $("#formAct").removeClass("was-validated");
            $scope.showAlert2 = true;
            return;
        }

        $scope.showAlert1 = false;
        $scope.showAlert2 = false;
        if ($scope.nuevo) {
            if (formAct.checkValidity()) {
                $scope.regAct.fechaInicio.setMinutes(0);
                $scope.regAct.fechaInicio.setHours(0);
                $scope.regAct.fechaInicio.setSeconds(0);
                $scope.regAct.fechaInicio.setMilliseconds(0);
                $scope.regAct.fechaInicio.setMinutes($scope.regAct.fechaInicio.getMinutes() - $scope.regAct.fechaInicio.getTimezoneOffset() + parseInt($scope.regAct.minInicio));
                $scope.regAct.fechaInicio.setHours($scope.regAct.fechaInicio.getHours() + parseInt($scope.regAct.horaInicio));

                $scope.regAct.fechaFin.setMinutes(0);
                $scope.regAct.fechaFin.setHours(0);
                $scope.regAct.fechaFin.setSeconds(0);
                $scope.regAct.fechaFin.setMilliseconds(0);
                $scope.regAct.fechaFin.setMinutes($scope.regAct.fechaFin.getMinutes() - $scope.regAct.fechaFin.getTimezoneOffset() + parseInt($scope.regAct.minFin));
                $scope.regAct.fechaFin.setHours($scope.regAct.fechaFin.getHours() + parseInt($scope.regAct.horaFin));

                var params = {
                    idHorario: $scope.curso.idhorario,
                    nombre: $scope.regAct.nombre.trim(),
                    tipo: $scope.regAct.tipo,
                    descripcion: $scope.regAct.descripcion.trim(),
                    fechaInicio: $scope.regAct.fechaInicio,
                    fechaFin: $scope.regAct.fechaFin,
                    flgEntregable: $scope.regAct.flgEntregable ? 1 : 0,
                    flgConfianza: $scope.regAct.flgConfianza ? 1 : 0,
                    idUsuarioCreador: $scope.usuario.idUser,
                    flgMulticalificable: $scope.regAct.flgMulticalificable ? 1 : 0
                }

                $scope.busy = true;
                serviceCRUD.TypePost('actividad/crear_actividad', params).then(function (res) {
                    ListarActividades();
                    $("#mdAgregarActividad").modal('hide');
                    $scope.busy = false;
                    Toast.fire({
                        type: 'success',
                        title: 'Actividad creada'
                    })
                })

            }
        } else {
            if (formAct.checkValidity()) {
                $scope.regAct.fechaInicio.setMinutes(0);
                $scope.regAct.fechaInicio.setHours(0);
                $scope.regAct.fechaInicio.setSeconds(0);
                $scope.regAct.fechaInicio.setMilliseconds(0);
                $scope.regAct.fechaInicio.setMinutes($scope.regAct.fechaInicio.getMinutes() - $scope.regAct.fechaInicio.getTimezoneOffset() + parseInt($scope.regAct.minInicio));
                $scope.regAct.fechaInicio.setHours($scope.regAct.fechaInicio.getHours() + parseInt($scope.regAct.horaInicio));

                $scope.regAct.fechaFin.setMinutes(0);
                $scope.regAct.fechaFin.setHours(0);
                $scope.regAct.fechaFin.setSeconds(0);
                $scope.regAct.fechaFin.setMilliseconds(0);
                $scope.regAct.fechaFin.setMinutes($scope.regAct.fechaFin.getMinutes() - $scope.regAct.fechaFin.getTimezoneOffset() + parseInt($scope.regAct.minFin));
                $scope.regAct.fechaFin.setHours($scope.regAct.fechaFin.getHours() + parseInt($scope.regAct.horaFin));

                var params = {
                    idActividad: idActEdit,
                    nombre: $scope.regAct.nombre,
                    tipo: $scope.regAct.tipo,
                    descripcion: $scope.regAct.descripcion,
                    fechaInicio: $scope.regAct.fechaInicio,
                    fechaFinal: $scope.regAct.fechaFin,
                    flgEntregable: $scope.regAct.flgEntregable ? 1 : 0,
                    flgConfianza: $scope.regAct.flgConfianza ? 1 : 0,
                    idUsuarioCreador: $scope.usuario.idUser,
                    flgMulticalificable: $scope.regAct.flgMulticalificable ? 1 : 0
                }

                $scope.busy = true;
                serviceCRUD.TypePost('actividad/editar_actividad', params).then(function (res) {
                    ListarActividades();
                    $("#mdAgregarActividad").modal('hide');
                    Toast.fire({
                        type: 'success',
                        title: 'Actividad editada'
                    })
                    $scope.busy = false;
                })
            }
        }
    }

    $scope.btnVerActividad = function (act) {
        $cookies.putObject('actividadActual', act)
        $('#btnVer').tooltip('hide');
        $location.path("actividad");
    }

    $scope.btnEditarActividad = function (act) {
        $scope.nuevo = false;
        $("#formAct").removeClass("was-validated");
        $scope.regAct = {
            nombre: act.nombre,
            descripcion: act.descripcion,
            tipo: act.tipo,
            flgEntregable: !!act.flgEntregable,
            fechaInicio: serviceUtil.convertToDate(act.fechaInicio),
            horaInicio: act.horaInicio,
            minInicio: act.minInicio,
            fechaFin: serviceUtil.convertToDate(act.fechaFin),
            horaFin: act.horaFin,
            minFin: act.minFin,
            flgConfianza: !!act.flgConfianza,
            flgMulticalificable: !!act.flgMulticalificable
        }
        idActEdit = act.idActividad;
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnPublicarActividad = function () {
        $('#mdPublicarActividad').appendTo("body").modal('show');
    }

    $scope.btnConfirmarPublicacion = function () {
        $("#mdPublicarActividad").modal('hide');
    }

    $scope.btnCrearGrupos = function () {
        $scope.creacionGrupos = true;
    }
    $scope.btnNocrearGrupos = function () {
        $scope.creacionGrupos = false;
        //$scope.lstAluSinGrupos = [];
        $scope.lstNuevoGrupo = [];
        $scope.lstGrupos = [];
    }

    $scope.agregarAlu = function (i, al) {
        $scope.lstAluSinGrupos.splice(i, 1);
        $scope.lstNuevoGrupo.push(al);
    }

    $scope.elimAlu = function (i, al) {
        $scope.lstNuevoGrupo.splice(i, 1);
        $scope.lstAluSinGrupos.push(al);
    }

    $scope.btnGuardarGrupo = function () {
        $scope.showAlert1 = false;
        $scope.showAlert2 = false;

        if (!$scope.Reg.nomGrupo) {
            $scope.showAlert1 = true;
            return;
        }
        $scope.showAlert1 = false;

        if ($scope.lstNuevoGrupo.length == 0 || $scope.lstNuevoGrupo.length == 1) {
            $scope.showAlert2 = true;
            return;
        }
        $scope.showAlert2 = false;

        var gr = {
            nombre: $scope.Reg.nomGrupo,
            lstAlumnos: $scope.lstNuevoGrupo
        }

        $scope.lstGrupos.push(gr);
        $scope.Reg.nomGrupo = '';
        $scope.lstNuevoGrupo = [];
    }

    $scope.elimGrupo = function (i, gr) {
        for (let i = 0; i < gr.lstAlumnos.length; i++) {
            $scope.lstAluSinGrupos.push(gr.lstAlumnos[i]);
        }
        $scope.lstGrupos.splice(i, 1);
    }

    $scope.verGrupo = function (grupo) {
        $scope.lstVerAgrupacion = grupo;
        $('#mdVerAgrupaciones').appendTo("body").modal('show');
    }

    $scope.btnTerminar = function () {
        var params = {
            idHorario: $scope.curso.idhorario,
            grupos: $scope.lstGrupos
        }

        serviceCRUD.TypePost('grupo/crear-general', params).then(function (res) {
            hayAgrupaciones();
        })
        $("#mdAgregarAgrupacion").modal('hide');
    }

    $scope.enCurso = function (act) {
        return (serviceUtil.convertToDate(act.fechaFin) > (new Date()).addDays(-1));
    }

    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    //Como profesor: Crear Registro Horas
    $scope.btnGuardarRegHoras = function () {
        $("#formActRegHoras").addClass("was-validated");

        if ($scope.regEsfuerzo.listaCategorias.length == 0) {
            $("#formActRegHoras").removeClass("was-validated");
            $scope.showAlert4 = true;
            return;
        }
        $scope.showAlert4 = false;
        for (let i = 0; i < $scope.regEsfuerzo.listaCategorias.length; i++) {
            if ($scope.regEsfuerzo.listaCategorias[i].descripcion.length == 0) {
                $("#formActRegHoras").removeClass("was-validated");
                $scope.showAlert3 = true;
                return;
            }
        }
        $scope.showAlert3 = false;

        if (formActRegHoras.checkValidity()) {
            serviceCRUD.TypePost('registro_horas/crear_registro_horas', $scope.regEsfuerzo).then(function (res) {
                console.dir(res)
            })
        }
    }

    //Como alumno: Registrar Horas
    $scope.btnGuardarRegHorasAlumno = function () {
        $("#formActRegHorasAlumno").addClass("was-validated");

        for (let i = 0; i < $scope.regEsfuerzoHoras.listaCategorias.length; i++) {
            for (let j = 0; j < $scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas.length; j++) {
                if ($scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas.length == 0) {
                    $("#formActRegHorasAlumno").removeClass("was-validated");
                    $scope.showAlert5 = true;
                    return;
                }
                $scope.showAlert5 = false;

                if ($scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas[j].descripcion.length == 0) {
                    $("#formActRegHorasAlumno").removeClass("was-validated");
                    $scope.showAlert6 = true;
                    return;
                }
                $scope.showAlert6 = false;

                if ($scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas[j].horasPlanificadas == null) {
                    $("#formActRegHorasAlumno").removeClass("was-validated");
                    $scope.showAlert7 = true;
                    return;
                }
                $scope.showAlert7 = false;

                if ($scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas[j].horasReales == null) {
                    $("#formActRegHorasAlumno").removeClass("was-validated");
                    $scope.showAlert8 = true;
                    return;
                }
                $scope.showAlert8 = false;
            }
        }

        if (formActRegHorasAlumno.checkValidity()) {
            serviceCRUD.TypePost('registro_horas/registrar_horas', $scope.regEsfuerzoHoras).then(function (res) {
                $("#mdRegHoras").modal('hide');
            })
        }


    }

    //Como profesor y alumno: Obtener registro horas (solo categorias)
    function obtenerRegistroHorasSoloCategorias() {
        var params = {
            tipo: 2,
            idActividadUHorario: $scope.curso.idhorario
        }

        serviceCRUD.TypePost('registro_horas/obtener_registro_horas', params).then(function (res) {
            if (res.data.succeed == false) {
                return;
            }
            else {
                $scope.hayRegHorasHorario = true;
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

    //Como profesor y alumno: Obtener registro horas x alumno
    $scope.obtenerRegistroHorasXAlumno = function () {
        var params = {
            tipo: 2,
            idActividadUHorario: $scope.curso.idhorario,
            //esto lo saco del select alumno
            idAlumno: $scope.idalumno
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.idalumno
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasHorario = true;

        })
    }

    function obtenerRegHorasComoAlumno() {
        var params = {
            tipo: 2,
            idActividadUHorario: $scope.curso.idhorario,
            //esto lo saco del select alumno
            idAlumno: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.usuario.idUser
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;

            if ($scope.regEsfuerzoHoras.listaCategorias[0].listaRespuestas.length != 0)
                $scope.regHorasIngresado = true;
            if ($scope.regEsfuerzoHoras.listaCategorias[0].listaRespuestas.length == 0)
                $scope.hayRegHorasHorario = true;
        })
    }


    //Como profesor: Llamar al modal de crear categorias
    $scope.btnCrearRegistroHoras = function () {
        $('#mdRegistroCategorias').appendTo("body").modal('show');
    }

    //Como profesor: Llamar al modal de ver registro horas
    $scope.btnVerRegistroHoras = function () {
        $('#mdVerRegHoras').appendTo("body").modal('show');
    }

    //Como alumno: Llamar al modal de registrar horas
    $scope.btnRegistrarHoras = function () {
        $('#mdRegHoras').appendTo("body").modal('show');
    }

    $scope.btnVerRegistroHorasAlumno = function () {
        $('#mdVerRegHorasAlumno').appendTo("body").modal('show');
    }

    //Como profesor: Agregar una categoria
    $scope.btnAgregarCategoria = function () {
        $scope.showAlert4 = false;
        $scope.regEsfuerzo.listaCategorias.push({
            descripcion: ''
        });
    }

    //Como profesor: Quitar una categoria
    $scope.btnQuitarCategoria = function (categoria) {
        var pos = $scope.regEsfuerzo.listaCategorias.indexOf(categoria)
        $scope.regEsfuerzo.listaCategorias.splice(pos, 1)
    }

    //Como alumno puedo agregar una respuesta a una categoria
    $scope.btnAgregarRespuesta = function (categoria) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.push({
            descripcion: '',
            horasPlanificadas: null,
            horasReales: null
        })
    }

    //Como alumno: Quitar una respuesta de una categoria
    $scope.btnQuitarRespuesta = function (categoria, respuesta) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        var pos2 = $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.indexOf(respuesta);
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.splice(pos2, 1)
    }

    function ListarAlumnos() {
        var params = { idHorario: $scope.curso.idhorario }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            $scope.listaAl = res.data;
        })
    }

    $scope.btnCargarAlu = function () {
        $('#mdCargaAlumni').appendTo("body").modal('show');
    }

    $scope.cargarAlumnos = function () {
        file = document.getElementById('fileAl').files;
        var datos = new FormData();
        datos.append('idEspecialidad', $scope.curso.idEspecialidad);
        datos.append('idCurso', $scope.curso.idcurso);
        datos.append('arch', file[0]);

        serviceCRUD.TypePostFile('carga-masiva/horarios', datos).then(function (res) {
            $('#mdCargaHorarios').modal('hide');
            Toast.fire({
                type: 'success',
                title: 'Carga exitosa'
            })
        })
    }

    $scope.btnVerObtenerRevisiones = function () {
        $('#mdObtenerRevisiones').appendTo("body").modal('show');
        ObtenerRevisiones();
    }

    function ObtenerRevisiones(){
        if($scope.listaFeedbacks.length > 0)
            return;
        var params  = {
            idProfesor: $scope.usuario.idUser
        }   
        serviceCRUD.TypePost('publicar-notas/obtener_revisiones_profesor', params).then(function (res) {
            console.dir('Lo que devuelve el servicio obtener revisiones profesor')
            console.dir(res)
            if(res.data.succeed == false){
                console.dir('no se encontro')
                return;
            }
            $scope.listaFeedbacks = res.data.listaFeedbacks;

            //Tengo que sacar los datos de la actividad usando el id
            for (let i = 0; i < $scope.listaFeedbacks.length; i++){
                let idActFeedback = $scope.listaFeedbacks[i].idActividad;
                console.dir($scope.lstActividad)
                for (let j = 0; j < $scope.lstActividad.length; j++){
                    console.dir($scope.lstActividad[j].idActividad);
                    if (idActFeedback == $scope.lstActividad[j].idActividad){
                        let todoActividad = $scope.lstActividad[j];
                        $scope.listaActividadesFeedback.push(todoActividad);
                    }
                }
            }
            console.dir($scope.listaActividadesFeedback)
        })
    }

    $scope.irActividad = function(feedback){
        let idact = feedback.idActividad;
        //Iterar por la lista de actividades hasta encontrar
        //la que haga match con el idActividad
        for (let i = 0; i < $scope.lstActividad.length; i++){
            if(idact == $scope.lstActividad.idActividad) {
                let act = $scope.lstActividad[i];
                break;
            }
        }
        $cookies.putObject('actividadActual', act)
        $location.path("actividad");

    }   



    function init() {
        ListarActividades();
        ListarAgrupaciones();
        hayAgrupaciones();
        obtenerRegistroHorasSoloCategorias();
        ListarAlumnos();
        

        if (!$scope.esProfesor)
            obtenerRegHorasComoAlumno();
    }

    init();

    $scope.btnMostrarAgrupaciones = function () {
        var params = {
            idHorario: $scope.curso.idhorario
        }

        serviceCRUD.TypePost('grupo/listar-general', params).then(function (res) {
            if (res.length == null) {

            } else {

            }
        })

    }





})
