app.controller('RubricaController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.regAct = {
        nombre : '',
        desc : '',
        fecha : null,
        horario : '',
        tipo : "0"        
    }

    $scope.lstRubrica = [
        {
            familia: 'Familia 1',
            lstCriterios: [
             {
                nombre: 'Familia 1 - Criterio 1',
                puntajeAsignado: '10',
                puntajeMaximo: '10',
                comentario: 'Ninguno'
             },
             {
                nombre: 'Familia 1 - Criterio 2',
                puntajeAsignado: '3',
                puntajeMaximo: '5',
                comentario: 'Todo ok'
            },
            {
                nombre: 'Familia 1 - Criterio 3',
                puntajeAsignado: '2',
                puntajeMaximo: '5',
                comentario: 'Ninguno'
            },
            ]
        },
        {
            familia: 'Familia 2',
            lstCriterios: [
             {
                nombre: 'Familia 1 - Criterio 1',
                puntajeAsignado: '10',
                puntajeMaximo: '10',
                comentario: 'Ninguno'
             },
             {
                nombre: 'Familia 2 - Criterio 2',
                puntajeAsignado: '3',
                puntajeMaximo: '5',
                comentario: 'Todo ok'
            },
            {
                nombre: 'Familia 2 - Criterio 3',
                puntajeAsignado: '2',
                puntajeMaximo: '5',
                comentario: 'Ninguno'
            },
            ]
        },
        {
            familia: 'Familia 3',
            lstCriterios: [
             {
                nombre: 'Familia 3 - Criterio 1',
                puntajeAsignado: '10',
                puntajeMaximo: '10',
                comentario: 'Ninguno'
             },
             {
                nombre: 'Familia 3 - Criterio 2',
                puntajeAsignado: '3',
                puntajeMaximo: '5',
                comentario: 'Todo ok'
            },
            {
                nombre: 'Familia 3 - Criterio 3',
                puntajeAsignado: '2',
                puntajeMaximo: '5',
                comentario: 'Ninguno'
            },
            ]
        }
    ]



    $scope.crearRubrica = function(){
        $scope.regAct = {
            familia: '',
            lstCriterios: []   
        }

        $('#mdCrearRubrica').appendTo("body").modal('show');
    }

    $scope.formCriterio = [];

    $scope.agregarCriterio = function() {
        $scope.formCriterio.push({
            nombre: '',
            puntajeMaximo: ''
        });
     }

    $scope.usarRubrica = function(){
        console.dir('Uso usar rubrica')
    }
})