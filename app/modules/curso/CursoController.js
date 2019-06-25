app.controller('CursoController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.nuevo = true; // true->crear false->editar
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.busy = false;
    $scope.showAlert1 = false;
    $scope.showAlert2 = false;
    $scope.lstGrupos = [];
    $scope.lstVerAgrupacion= [];
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
    
    var idActEdit = null;

    function ListarActividades() {
        var params = { idHorario: $scope.curso.idhorario };
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
        /* var params = { idhorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('grupo/listar-general', params).then(function (res) {
            $scope.lstGrupos = res.data;
        }) */
    }

    function hayAgrupaciones(){
        var params = {
            idHorario : $scope.curso.idhorario
        }
        serviceCRUD.TypePost('existencia/agrupaciones', params).then(function(res){
            console.dir(res);
            if (res.data.message == false){
                $scope.existeAgrupaciones = false;
                $scope.lstAgrupaciones= [];
                
            }else{
                $scope.existeAgrupaciones = true;
                
                serviceCRUD.TypePost('grupo/listar-general',params).then(function(res2){
                    $scope.lstAgrupaciones =res2.data;
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
        var params = { idHorario:  $scope.curso.idhorario }
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
    $scope.btnNocrearGrupos = function(){
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

        if ($scope.lstNuevoGrupo.length == 0 || $scope.lstNuevoGrupo.length==1 ){
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

    $scope.verGrupo = function(grupo) {
        $scope.lstVerAgrupacion = grupo;
        console.dir($scope.lstVerAgrupacion);
        $('#mdVerAgrupaciones').appendTo("body").modal('show');
    }

    $scope.btnTerminar = function () {
        var params = {
            idHorario: $scope.curso.idhorario,
            grupos: $scope.lstGrupos
        }
        //console.dir(params);
        
        serviceCRUD.TypePost('grupo/crear-general', params).then(function(res){
            console.dir(res.data);
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

    function init() {
        ListarActividades();
        ListarAgrupaciones();
        hayAgrupaciones();
    }

    init();

    $scope.btnMostrarAgrupaciones = function(){
        var params ={
            idHorario: $scope.curso.idhorario
        }
        
        serviceCRUD.TypePost('grupo/listar-general', params).then(function(res){
            console.dir(res.data);
            if (res.length == null){
                
            }else{
               
            }
        }) 

    }
})