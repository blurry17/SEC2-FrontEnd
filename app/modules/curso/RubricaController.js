

app.controller('RubricaController',function($scope, $location, $cookieStore, serviceUtil){ 

    $scope.regAct = {
        nombre : '',
        desc : '',
        fecha : null,
        horario : '',
        tipo : "0"        
    }

    $scope.lstIndicadores = [
        [
            [
                {
                    descripcion: 'Indicador 1 del Aspecto 1 de la Rubrica 1',
                    informacion: 'Hola',
                    puntajeMax: 1
                },
                {
                    descripcion: 'Indicador 2 del Aspecto 1 de la Rubrica 1',
                    informacion: 'Hola',
                    puntajeMax: 1
                }
            ],
            [
                {
                    descripcion: 'Indicador 1 del Aspecto 2 de la Rubrica 1',
                    informacion: 'Hola',
                    puntajeMax: 1
                },
                {
                    descripcion: 'Indicador 2 del Aspecto 2 de la Rubrica 1',
                    informacion: 'Hola',
                    puntajeMax: 1
                }
            ]
        ],
        [
            [
                {
                    descripcion: 'Indicador 1 del Aspecto 1 de la Rubrica 2',
                    informacion: 'Hola',
                    puntajeMax: 1
                },
                {
                    descripcion: 'Indicador 2 del Aspecto 1 de la Rubrica 2',
                    informacion: 'Hola',
                    puntajeMax: 1
                }
            ],
            [
                {
                    descripcion: 'Indicador 1 del Aspecto 2 de la Rubrica 2',
                    informacion: 'Hola',
                    puntajeMax: 1
                },
                {
                    descripcion: 'Indicador 2 del Aspecto 2 de la Rubrica 2',
                    informacion: 'Hola',
                    puntajeMax: 1
                }
            ]
        ]
    ]

    $scope.lstAspectos = [
        [
            {
                descripcion: 'Aspecto 1 de la Rubrica 1',
                informacion: 'Informacion 1 1',
                puntajeMax: 10,
                tipoClasificacion: 'Grupal',
                lstIndicadores: $scope.lstIndicadores[0][0]
            },
            {
                descripcion: 'Aspecto 2 de la Rubrica 1',
                informacion: 'Informacion 1 2',
                puntajeMax: 10,
                tipoClasificacion: 'Grupal',
                lstIndicadores: $scope.lstIndicadores[0][1]
            }
        ],
        [
            {
                descripcion: 'Aspecto 1 de la Rubrica 2',
                informacion: 'Informacion 2 1',
                puntajeMax: 4,
                tipoClasificacion: 'Grupal',
                lstIndicadores: $scope.lstIndicadores[1][0]
            },
            {
                descripcion: 'Aspecto 2 de la Rubrica 2',
                informacion: 'Informacion 2 2',
                puntajeMax: 16,
                tipoClasificacion: 'Grupal',
                lstIndicadores: $scope.lstIndicadores[1][1]
            }
        ]
    ]

    $scope.lstRubricaOficial = [
        {
            estado: 1,
            fechaRegistro: '25/04/2019',
            fechaValidacion: '27/04/2019',
            flgRubricaEspecial: 0,
            lstAspectos: $scope.lstAspectos[0]
        },
        {
            estado: 1,
            fechaRegistro: '25/04/2019',
            fechaValidacion: '27/04/2019',
            flgRubricaEspecial: 0,
            lstAspectos: $scope.lstAspectos[1]
        }
    ]

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

    $scope.btnCrearRubrica = function(){
        $scope.regAct = {
            familia: '',
            lstCriterios: []   
        }

        $('#mdCrearRubrica').appendTo("body").modal('show');
    }

    $scope.formCriterio = [];

    $scope.btnAgregarCriterio = function() {
        $scope.formCriterio.push({
            nombre: '',
            puntajeMaximo: ''
        });
     }

    $scope.nuevaRubrica = []

    $scope.btnGuardarRubrica = function(){
        if($scope.ActForm.$valid){
            var obj = {
                familia: $scope.regAct.familia,
                lstCriterios: []
            }
            $scope.nuevaRubrica.push(obj);
            $("#mdCrearRubrica").modal('hide');
        }else{
            console.dir('invalid');
        }
    }




    $scope.usarRubrica = function(){
        console.dir('Uso usar rubrica')
    }
})