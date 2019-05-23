
app.controller('ActividadController',function($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")
    $scope.mostrarFila=false;
    $scope.mostrarPreg=false
    $scope.listaFam=[];

    $scope.ejemplo = [/*{
        familia:"Preparacion",
        listaPreg:[
            {
                pregunta:"¿Dedicaste una cantidad adecuada de horas para la actividad?",
                editar:false,
            },
            {
                pregunta:"¿Vio los videos mencionados en la 1ra clase en el min 34 por el profesor?",
                editar:false,
            }],
    },{
        familia:"Aprendizaje",
        listaPreg:[
            {
                pregunta:"¿Lograste aprender los conceptos clave para esta actividad?",
                editar:false,
            }
        ],
    },{
        familia:"Responsabilidad",
        listaPreg:[
            {
                pregunta:"¿Organizaste bien tu tiempo para lograr los objetivos de la actividad?",
                editar:false,
            }
        ],
    },{
        familia:"Interiorizacion",
        listaPreg:[
            {
                pregunta:"¿Crees que lo aprendido te servira en un futuro?",
                editar:false,
            }
        ],
    }*/];

    $scope.btnAgregarComentario= function() {
     }

    $scope.btnCalificaciones = function(){
        $location.path('calificaciones');
    }

    $scope.btnGrupos = function () {
        $location.path('grupos');
    }

    $scope.btnAutoEvaluacion = function () {
        $('#mdCrearAutoEval').appendTo("body").modal('show');
    }

    $scope.btnVerAutoEval = function () {
        params = {
            idActividad: 1,
        };
        serviceCRUD.TypePost("auto-evaluacion/listarPreguntas", params).then(function (response) {
            console.dir(response.data);
            $scope.ejemplo = response.data.listaFamilia;
        })

        $('#mdVerAuto').appendTo("body").modal('show');
    }
    $scope.showFila = function () {
        $scope.mostrarFila = true;
        let auxLista = {
            familia: "",
            listaPregunta: [],
        };
        $scope.listaFam.push(auxLista);
    }

    $scope.showPreg = function (fam) {
        $scope.mostrarPreg = true;
        let auxPreg = {
            pregunta: "",
        };
        fam.listaPregunta.push(auxPreg);
    }

    $scope.btnRubrica = function () {
        $location.path("rubrica")
    }

    $scope.irCurso = function () {
        $location.path("curso")
    }

    $scope.btnEstadisticas = function () {
        $location.path("estadisticas")
    }

    $scope.btnComentarios = function () {
        $location.path("comentarios")
    }

    $scope.deleteFam = function (fam) {
        let pos = $scope.listaFam.indexOf(fam);
        $scope.listaFam.splice(pos, 1);
    }

    $scope.deleteRow = function (fam, preg) {
        let posFam = $scope.listaFam.indexOf(fam);
        let posPreg = $scope.listaFam[posFam].listaPregunta.indexOf(preg);
        fam.listaPregunta.splice(posPreg, 1);
    }
    $scope.habilitarCampos = function (preg) {
        if (!preg.editar)
            preg.editar = !(preg.editar);
    }
    $scope.btnGuardarAutoEval = function () {
        //console.log($scope.listaFam);
        /*let params={
            idActividad:1,
            listaFamilia:[{
                familia:"Matematica",
                listaPregunta:[{
                    pregunta:"Sabe Sumar"
                },
                {
                    pregunta:"Sabe Restar"
                }]
            },
            {
                familia:"Puntualidad",
                listaPregunta:[{
                    pregunta:"Entrega a tiempo"
                }]
            }]
        }*/
        let params = {
            idActividad: 1,
            listaFamilia: $scope.listaFam,
        }
        console.dir(params)
        serviceCRUD.TypePost("auto-evaluacion/creacion", params).then(function (response) {
            console.dir(response);

        })
    }

    $scope.btnGuardarAutoEval1 = function () {
        console.log($scope.ejemplo);
    }
})
