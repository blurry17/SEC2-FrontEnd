app.controller('CursoController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.nuevo = true; // true->crear false->editar
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.showAlert1 = false;
    $scope.lstGrupos = [];

    var idActEdit = null;

    function ListarActividades() {
        var params = { idhorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('actividad/lista', params).then(function (res) {

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
        var params = { idhorario: $scope.curso.idhorario };
        console.dir(params);
        serviceCRUD.TypePost('grupo/listar-general', params).then(function (res) {
            console.dir(res.data);
            $scope.lstGrupos = res.data;
        })
    }

    $scope.regAct = {
        nombre: '',
        descripcion: '',
        tipo: 'I',
        flgEntregable: true,
        nota: null,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        flgConfianza: true,
        horaInicio: '',
        horaFin: '',
        minInicio: '00',
        minFin: '00'
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
        var params = { idActividad: $scope.actividad.idActividad }
        serviceCRUD.TypePost('horario/alumnos', params).then(function (res) {
            console.dir(res.data);
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
            ($scope.regAct.horaInicio > $scope.regAct.horaFin || ($scope.regAct.horaInicio == $scope.regAct.horaFin && $scope.regAct.minInicio > $scope.regAct.minFin))) {
            $("#formAct").removeClass("was-validated");
            $scope.showAlert1 = true;
            return;
        }

        $scope.showAlert1 = false;
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
                    nombre: $scope.regAct.nombre,
                    tipo: $scope.regAct.tipo,
                    descripcion: $scope.regAct.descripcion,
                    fechaInicio: $scope.regAct.fechaInicio,
                    fechaFin: $scope.regAct.fechaFin,
                    flgEntregable: $scope.regAct.flgEntregable ? 1 : 0,
                    flgConfianza: $scope.regAct.flgConfianza ? 1 : 0,
                    idUsuarioCreador: $scope.usuario.idUser
                }

                serviceCRUD.TypePost('actividad/crear_actividad', params).then(function (res) {
                    $("#mdAgregarActividad").modal('hide');
                    ListarActividades();
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
                    flgConfianza: $scope.regAct.flgConfianza ? 1 : 0
                }

                serviceCRUD.TypePost('actividad/editar_actividad', params).then(function (res) {
                    $("#mdAgregarActividad").modal('hide');
                    ListarActividades();
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
            flgConfianza: !!act.flgConfianza
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

    $scope.btnCrearGrupos = function() {
        $scope.creacionGrupos = true;
    }

    $scope.agregarAlu = function(i, al) {
        $scope.lstAluSinGrupos.splice(i, 1);
        $scope.lstNuevoGrupo.push(al);
    }

    $scope.elimAlu = function(i, al) {
        $scope.lstNuevoGrupo.splice(i, 1);
        $scope.lstAluSinGrupos.push(al);        
    }

    $scope.btnGuardarGrupo = function() {
        $scope.showAlert1 = false;
        $scope.showAlert2 = false;

        if (!$scope.Reg.nomGrupo){
            $scope.showAlert1 = true;
            return;
        }
        $scope.showAlert1 = false;

        if ($scope.lstNuevoGrupo.length == 0){
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

    $scope.elimGrupo = function(i, gr) {
        for (let i = 0; i < gr.lstAlumnos.length; i++){
            $scope.lstAluSinGrupos.push(gr.lstAlumnos[i]);
        }
        $scope.lstGrupos.splice(i, 1);
    }

    $scope.verGrupo = function() {

    }

    $scope.btnTerminar = function() {
        var params = {
            idActividad: $scope.actividad.idActividad,
            grupos: $scope.lstGrupos
        }
        serviceCRUD.TypePost('grupo/crear', params).then(function(res){
            console.dir(res.data);
        })
    }

    angular.element(document).ready(function () {
        $(function () {
            $('[data-toggle="tooltip"]').tooltip({
                trigger: 'hover'
            });
        })
    });

    function init() {
        ListarActividades();
        ListarAgrupaciones();
    }

    init();
})