app.controller('CursoController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.nuevo = true; // true->crear false->editar
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.showAlert1 = false;

    function ListarActividades() {
        var params = { idhorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('actividad/lista', params).then(function (res) {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].fechaInicio = serviceUtil.ddmmyyyy(new Date(res.data[i].fechaInicio));
                res.data[i].fechaFin = serviceUtil.ddmmyyyy(new Date(res.data[i].fechaFin));
            }
            $scope.lstActividad = res.data;
        })
    }

    $scope.regAct = {
        nombre: '',
        desc: '',
        tipo: 'I',
        entregable: true,
        nota: null,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        flgConfianza : true,
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
            desc: '',
            tipo: 'I',
            entregable: true,
            flgConfianza: true,
            fechaInicio: new Date(),
            fechaFin: new Date(),
            horaInicio: '8',
            horaFin: '10',
            minInicio: '00',
            minFin: '00'
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnGuardarActividad = function () {
        $("#formAct").addClass("was-validated");
        if($scope.regAct.fechaInicio > $scope.regAct.fechaFin){
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

                console.dir($scope.regAct.fechaInicio);
                console.dir($scope.regAct.fechaFin);


                var params = {
                    idHorario: $scope.curso.idhorario,
                    nombre: $scope.regAct.nombre,
                    tipo: $scope.regAct.tipo,
                    descripcion: $scope.regAct.desc,
                    fechaInicio: $scope.regAct.fechaInicio,
                    fechaFin: $scope.regAct.fechaFin,
                    flgEntregable: $scope.regAct.entregable ? 1 : 0,
                    flgConfianza: $scope.regAct.flgConfianza ? 1 : 0,
                    idUsuarioCreador: $scope.usuario.idUser
                } 

                serviceCRUD.TypePost('actividad/crear_actividad', params).then(function(res){
                    $("#mdAgregarActividad").modal('hide');
                    ListarActividades();               
                })
            }
        } else {
            if (formAct.checkValidity()) {                
                $("#mdAgregarActividad").modal('hide');
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
            desc: act.desc,
            tipo: act.tipo,
            entregable: act.entregable,
            fechaInicio: serviceUtil.convertToDate(act.fechaInicio),
            fechaFin: serviceUtil.convertToDate(act.fechaFin),
            flgConfianza : act.flgConfianza
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnPublicarActividad = function () {
        $('#mdPublicarActividad').appendTo("body").modal('show');
    }

    $scope.btnConfirmarPublicacion = function () {
        $("#mdPublicarActividad").modal('hide');
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
    }

    init();
})