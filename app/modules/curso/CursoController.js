app.controller('CursoController',function($rootScope, $scope, $location, serviceUtil){
    $scope.curso = JSON.parse(sessionStorage['cursoActual']);
    
    $scope.regAct = {
        regNombre : '',
        regDesc : '',
        regFecha : null,
        regHorario : ''
    }

    $scope.lstActividad = [
        {
            nombre: 'Laboratorio 1',
            descripcion: 'Descripción breve',
            nota : '12',
            fecha: '04/05/19',
            horario: '8:00 - 10:00',
            estado: 'P'
        },
        {
            nombre: 'Casos de uso',
            descripcion: 'Descripción breve',
            nota : '14',
            fecha: '07/05/19',
            horario: '12:00 - 14:00',
            estado: 'P'
        },
        {
            nombre: 'Laboratorio 2',
            descripcion: 'Descripción breve',
            nota : '',
            fecha: '13/05/19',
            horario: '18:00 - 20:00',
            estado: 'P'
        }
    ]


    $scope.btnAgregarActividad = function(){
        $scope.regAct = {
            nombre : '',
            desc : '',
            fecha : null,
            horario : ''
        }

        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnGuardarActividad = function() {
        var obj = {
            nombre: $scope.regAct.nombre,
            descripcion: $scope.regAct.desc,
            fecha: serviceUtil.ddmmyyyy($scope.regAct.fecha),
            horario: $scope.regAct.horario,
            estado: 'P'
        }

        $scope.lstActividad.push(obj);

        $("#mdAgregarActividad").modal('hide');
    }

    
})

