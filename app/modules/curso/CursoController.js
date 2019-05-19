app.controller('CursoController', function ($scope, $location, $cookies, serviceUtil, serviceCRUD) {
    $scope.usuario = $cookies.getObject('usuario');
    //if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject('cursoActual');
    $scope.nuevo = true; // true->crear false->editar

    $scope.regAct = {
        nombre: '',
        desc: '',
        tipo: "0",
        entregable: true,
        nota: null,
        fechaEntrega: new Date(),
        estado: 'I'
    }

    $scope.lstActividad = [
        {
            nombre: 'Laboratorio 1',
            desc: 'Una descripción muy larga para una actividad tan corta',
            tipo: "1",
            entregable: true,
            nota: 12,
            fechaEntrega: '04/05/2019',
            estado: 'I'
        },
        {
            nombre: 'Casos de uso',
            desc: 'Esta es una descripción regular',
            tipo: "0",
            entregable: true,
            nota: 14,
            fechaEntrega: '07/05/2019',
            estado: 'I'
        },
        {
            nombre: 'Laboratorio 2',
            desc: 'Esta actividad no tiene entregable y por eso no tiene fecha de entrega',
            tipo: "0",
            entregable: false,
            nota: null,
            fechaEntrega: null,
            estado: 'I'
        }
    ]

    $scope.btnAgregarActividad = function () {
        $scope.nuevo = true;
        $("#formAct").removeClass("was-validated");
        $scope.regAct = {
            nombre: '',
            desc: '',
            tipo: "0",
            entregable: true,
            fechaEntrega: new Date(),
            estado: 'I'
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnGuardarActividad = function () {
        $("#formAct").addClass("was-validated");
        if ($scope.nuevo) {
            if (formAct.checkValidity()) {
                var obj = {
                    nombre: $scope.regAct.nombre,
                    desc: $scope.regAct.desc,
                    tipo: $scope.regAct.tipo,
                    entregable: $scope.regAct.entregable,
                    fechaEntrega: $scope.regAct.entregable ? serviceUtil.ddmmyyyy($scope.regAct.fechaEntrega) : '',
                    estado: 'P'
                }
                $scope.lstActividad.push(obj);
                $("#mdAgregarActividad").modal('hide');
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
            fechaEntrega: act.fechaEntrega == null ? null : serviceUtil.convertToDate(act.fechaEntrega),
            estado: act.estado
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
    }

    init();
})