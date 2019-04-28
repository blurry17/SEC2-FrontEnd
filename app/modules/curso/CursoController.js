app.controller('CursoController',function($scope, $location, $cookieStore, serviceUtil){    
    $scope.curso = $cookieStore.get('cursoActual');

    $scope.regAct = {
        nombre : '',
        desc : '',
        fecha : null,
        horario : '',
        tipo : "0"        
    }

    $scope.lstActividad = [
        {
            nombre: 'Laboratorio 1',
            desc: 'Descripción breve',
            nota : '12',
            fecha: '04/05/2019',
            horario: '8:00 - 10:00',
            estado: 'P'
        },
        {
            nombre: 'Casos de uso',
            desc: 'Descripción breve',
            nota : '14',
            fecha: '07/05/2019',
            horario: '12:00 - 14:00',
            estado: 'P'
        },
        {
            nombre: 'Laboratorio 2',
            desc: 'Descripción breve',
            nota : '',
            fecha: '13/05/2019',
            horario: '18:00 - 20:00',
            estado: 'P'
        }
    ]


    $scope.btnAgregarActividad = function(){
        $scope.regAct = {
            nombre : '',
            desc : '',
            fecha : null,
            horario : '',
            tipo : "0"     
        }

        $('#mdAgregarActividad').appendTo("body").modal('show');
    }

    $scope.btnVerActividad = function(act){
        $cookieStore.put('actividadActual',act)
        $location.path("actividad")
        
    }

    $scope.btnGuardarActividad = function(){
        if($scope.ActForm.$valid){
            var obj = {
                nombre: $scope.regAct.nombre,
                descripcion: $scope.regAct.desc,
                fecha: serviceUtil.ddmmyyyy($scope.regAct.fecha),
                horario: $scope.regAct.horario,
                estado: 'P'
            }
            $scope.lstActividad.push(obj);
            $("#mdAgregarActividad").modal('hide');
        }else{
            console.dir('invalid');
        }
    }

    $scope.btnEditarActividad = function(act){
        $scope.regAct = {
            nombre : act.nombre,
            desc : act.desc,
            fecha : serviceUtil.convertToDate(act.fecha),
            horario : act.horario,
            tipo : "0"     
        }
        $('#mdAgregarActividad').appendTo("body").modal('show');

    }
    
})