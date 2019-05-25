app.controller('CursoController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.nuevo = true; // true->crear false->editar
    $scope.hoy = serviceUtil.yyyymmdd(new Date());
    $scope.showAlert1 = false;
    console.dir($scope.hoy);

    console.dir(serviceUtil.formatSQL(new Date()));

    console.dir($scope.curso);

    function ListarActividades() {
        var params = { idhorario: $scope.curso.idhorario };
        serviceCRUD.TypePost('actividad/lista', params).then(function (res) {
            for (let i = 0; i < res.data.length; i++) {
                res.data[i].fechaInicio = serviceUtil.ddmmyyyy(new Date(res.data[i].fechaInicio));
                res.data[i].fechaFin = serviceUtil.ddmmyyyy(new Date(res.data[i].fechaFin));
            }
            console.dir(res.data);
            $scope.lstActividad = res.data;
        })
    }

    

    $scope.regAct = {
        nombre: '',
        desc: '',
        tipo: "I",
        entregable: true,
        nota: null,
        fechaInicio: new Date(),
        fechaFin: new Date(),
        etapa: 'I'
    }

    $scope.btnAgregarActividad = function () {
        $scope.nuevo = true;
        $("#formAct").removeClass("was-validated");
        $scope.regAct = {
            nombre: '',
            desc: '',
            tipo: 'I',
            entregable: true,
            fechaInicio: new Date(),
            fechaFin: new Date(),
            etapa: ''
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnGuardarActividad = function () {
        $("#formAct").addClass("was-validated");
        if($scope.regAct.fechaInicio > $scope.regAct.fechaFin){
            $scope.showAlert1 = true;
            return;
        }
        $scope.showAlert1 = false;
        if ($scope.nuevo) {
            if (formAct.checkValidity()) {
                var params = {
                    idHorario: $scope.curso.idhorario,
                    nombre: $scope.regAct.nombre,
                    tipo: $scope.regAct.tipo,
                    descripcion: '',
                    fecha: '2019-12-20 12:00:00',
                    flg_entregable: $scope.regAct.entregable,
                    etapa: ''
                } 

                serviceCRUD.TypePost('actividad/crear_actividad', params).then(function(res){                               
                    console.dir(res.data);
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
        $cookies.putObject('actividadActual',act)
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
            etapa: act.etapa
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