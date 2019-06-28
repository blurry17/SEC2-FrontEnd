app.controller('EncuestaController', function ($rootScope, $scope, $location, $cookies, serviceCRUD, serviceUtil) {
    $scope.usuario = $cookies.getObject('usuario');
    $rootScope.user = $scope.usuario;
    $scope.esProfesor = $scope.usuario.profesor;
    if ($scope.usuario == undefined) $location.path('/');
    $scope.curso = $cookies.getObject("cursoActual");
    $scope.actividad = $cookies.getObject("actividadActual");
    $scope.vistaAlumno = $scope.usuario.alumno;
    $scope.listaAl = null;
    $scope.esActGrupal = false;
    $scope.idRub = 0;
    $scope.coTieneNota = false;
    $scope.idActividadUHorario = null;
    $scope.notaAuto=null;
    $scope.auTieneNota=false;
    //Como me encuentro en la actividad, el tipo es 1 y el idActividadUHorario es idActividad
    $scope.regEsfuerzo = {
        tipo: 1,
        idActividadUHorario: $scope.actividad.idActividad,
        idUsuarioCreador: $scope.usuario.idUser,
        listaCategorias: []
    };

    $scope.regEsfuerzoHoras = {
        idRegistroEsfuerzo: $scope.regEsfuerzo.idRegistroEsfuerzo,
        idAlumno: null,
        listaCategorias: $scope.regEsfuerzo.listaCategorias
    }

    $scope.hayRegHorasActividad = false;
    $scope.hayRegCategoriasActividad = false;


    //console.dir($scope.usuario );

    if ($scope.actividad.tipo == "G") {
        $scope.esActGrupal = true;
    } else {
        $scope.esActGrupal = false;
    }

    $scope.btnListarGrupo = function () {
        //console.dir("hola");
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario: $scope.usuario.idUser
        }
        //console.dir(params);
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion', params).them(function (res) {
            $scope.listaAl = res.data.lista;
        })
    }

    $scope.btnEvaluacionE = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            idUsuario: $scope.usuario.idUser,
            tipo: tipo
        }

        serviceCRUD.TypePost('actividad/obtener_calificacion_otra_rubrica', params).then(function (res) {
            $scope.rubrica = res.data;
            if (tipo == 2) {
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null;
            } else {
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;

            }
            //console.dir('Esta es la rubricaCoAuto');
            //console.dir(res);
        })
    }

    $scope.btnEvaluacion = function (tipo) {
        var params = {
            idActividad: $scope.actividad.idActividad,
            tipo: tipo
        }

        serviceCRUD.TypePost('actividad/obtener_rubrica', params).then(function (res) {
            if (res.data.succeed == false) {
                window.alert('No existe esta evaluación');
                return;
            }
            $scope.rubrica = res.data;
            $scope.idRub=res.data.idRubrica;
            //console.dir('Leer la rubricaa');
            //console.dir($scope.rubrica);
            if (tipo == 2) {
                $scope.rubricaAuto = $scope.rubrica;
                $scope.rubricaCoauto = null;
            } else {
                $scope.rubricaAuto = null;
                $scope.rubricaCoauto = $scope.rubrica;

            }
        })
    }

    $scope.listarGrupo = function () {
        let params = {
            idUsuario: $scope.usuario.idUser,
            idActividad: $scope.actividad.idActividad,
        }
        serviceCRUD.TypePost('actividad/grupo/lista-integrantes/coevaluacion', params).then(function (res) {
            //console.dir("ESTOOOOO")
            //console.dir(res.data);
            $scope.listaAl = res.data;
        })
    }

    $scope.obtenerCo = function () {
        let params = {
            idActividad: $scope.actividad.idActividad,
            idCalificado: $scope.idalumno,
            idCalificador: $scope.usuario.idUser,

        }
        console.dir('este es el yeison');
        console.dir(params);
        serviceCRUD.TypePost('coevaluacion/obtener_coevaluacion', params).then(function (res) {
            $scope.rubricaCoauto = res.data;
            if (res.data.nota == null) {
                $scope.coTieneNota = false;
            } else {
                $scope.coTieneNota = true;
            }
            console.dir('LA RES');
            console.dir(res.data);

        })
    }

    $scope.btnGuardarCo = function () {
        if (formCo.checkValidity()) {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn btn-success',
                    cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false,
            })

            swalWithBootstrapButtons.fire({
                title: 'Está seguro que quiere continuar?',
                text: "No podrá modificar la nota luego",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, continuar',
                cancelButtonText: 'No, cancelar',

            }).then((result) => {
                if (result.value) {
                    swalWithBootstrapButtons.fire(
                        'Listo!',
                        'Se calificó a tu compañero.',
                        'success'
                    )
                    let params = {
                        idActividad: $scope.actividad.idActividad,
                        idAlumno: $scope.idalumno,
                        idCalificador: $scope.usuario.idUser,
                        nota: 0,
                        idRubrica: $scope.idRub,
                        flgFalta: 0,
                        listaNotaAspectos: $scope.rubricaCoauto.listaNotaAspectos,
                        flgCompleto: 0,
                    }
                    console.dir('LEEEE ESTO');
                    console.dir(params);
                    serviceCRUD.TypePost('coevaluacion/calificar_coevaluacion', params).then(function (res) {

                    })
                    $scope.coTieneNota = true;
                } else if (
                    // Read more about handling dismissals
                    result.dismiss === Swal.DismissReason.cancel
                ) {
                    swalWithBootstrapButtons.fire(
                        'Se canceló la calificación',

                    )
                }
            })

        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Debe llenar todos los puntajes',
                type: 'error',
                confirmButtonText: 'Ok'
            })
            /*  $('#mdCompletar').appendTo("body").modal('show'); */
        }
    }


    $scope.obtenerAuto = function () {
        let params = {
            idActividad: $scope.actividad.idActividad,
            idAlumno: $scope.usuario.idUser,
        }
        serviceCRUD.TypePost('autoevaluacion/obtener_autoevaluacion',params).then(function(res){
            $scope.rubricaAuto=res.data;
            if(res.data.nota==null){
                $scope.auTieneNota=false;
            }else {
                $scope.auTieneNota=true;
            }
        })
    }

    $scope.btnGuardarAutoEvaluacion = function () {
        if(formCo.checkValidity()){
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                  confirmButton: 'btn btn-success',
                  cancelButton: 'btn btn-danger'
                },
                buttonsStyling: false,
              })
              
              swalWithBootstrapButtons.fire({
                title: 'Está seguro que quiere continuar?',
                text: "No podrá modificar la nota luego",
                type: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Si, continuar',
                cancelButtonText: 'No, cancelar',
                
              }).then((result) => {
                if (result.value) {
                  swalWithBootstrapButtons.fire(
                    'Listo!',
                    'success'
                  )
                  let params={
                    idActividad:$scope.actividad.idActividad,
                    idAlumno:$scope.usuario.idUser,
                    idCalificador:$scope.usuario.idUser,
                    nota:0,
                    idRubrica:$scope.rubricaAuto.idRubrica,
                    flgFalta:0,
                    listaNotaAspectos:$scope.rubricaAuto.listaNotaAspectos,
                    flgCompleto:0,
                }
                serviceCRUD.TypePost('autoevaluacion/calificar_autoevaluacion',params).then(function(res){
                
                })
                $scope.auTieneNota=true;
                } else if (
                  result.dismiss === Swal.DismissReason.cancel
                ) {
                  swalWithBootstrapButtons.fire(
                    'Se canceló la calificación',
                    
                  )
                }
              })
            
        }
        else{
            Swal.fire({
                title: 'Error!',
                text: 'Debe llenar todos los puntajes',
                type: 'error',
                confirmButtonText: 'Ok'
              })
           /*  $('#mdCompletar').appendTo("body").modal('show'); */
        }
    }
    
    //Como profesor: Crear Registro Horas
    $scope.btnCrearRegistroHoras = function () {
        console.dir($scope.regEsfuerzo)
        console.dir(JSON.stringify($scope.regEsfuerzo))
        serviceCRUD.TypePost('registro_horas/crear_registro_horas', $scope.regEsfuerzo).then(function (res) {
            console.dir(res)
        })
    }

    //Como alumno: Registrar Horas
    $scope.btnRegistrarHoras = function () {
        console.dir('regEsfuerzoHoras cuando presiono el boton')
        console.dir($scope.regEsfuerzoHoras)

        serviceCRUD.TypePost('registro_horas/registrar_horas', $scope.regEsfuerzoHoras).then(function (res) {
            console.dir(res)
        })
    }

    //Como profesor y alumno: Obtener registro horas x alumno
    $scope.obtenerRegistroHorasXAlumno = function () {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.idalumno
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.idalumno
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasActividad = true;
        })
    }

    $scope.obtenerRegHorasComoAlumno = function () {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad,
            //esto lo saco del select alumno
            idAlumno: $scope.usuario.idUser
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas_alumno', params).then(function (res) {
            $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
            $scope.regEsfuerzoHoras.tipo = res.data.tipo;
            $scope.regEsfuerzoHoras.idAlumno = $scope.usuario.idUser
            $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
            $scope.hayRegHorasActividad = true;
        })
    }

    //Como profesor y alumno: Obtener registro horas (solo categorias)
    function obtenerRegistroHorasSoloCategorias() {
        var params = {
            tipo: 1,
            idActividadUHorario: $scope.actividad.idActividad
        }
        serviceCRUD.TypePost('registro_horas/obtener_registro_horas', params).then(function (res) {
            if (res.data.succeed == false) {
                return;
            }
            else {
                //Asigno el objeto registro horas categoria al registro horas con respuestas
                $scope.regEsfuerzoHoras.idRegistroEsfuerzo = res.data.idRegistroEsfuerzo;
                $scope.regEsfuerzoHorasidAlumno = $scope.usuario.idUser;
                $scope.regEsfuerzoHoras.listaCategorias = res.data.listaCategorias;
                for (let i = 0; i < $scope.regEsfuerzoHoras.listaCategorias.length; i++) {
                    $scope.regEsfuerzoHoras.listaCategorias[i].listaRespuestas = []
                }
                $scope.hayRegCategoriasActividad = true;
            }

        })
    }

    //Como profesor: Agregar una categoria
    $scope.btnAgregarCategoria = function () {
        $scope.regEsfuerzo.listaCategorias.push({
            descripcion: ''
        });
    }

    //Como profesor: Quitar una categoria
    $scope.btnQuitarCategoria = function (categoria) {
        var pos = $scope.regEsfuerzo.listaCategorias.indexOf(categoria)
        $scope.regEsfuerzo.listaCategorias.splice(pos, 1)
    }

    //Como alumno puedo agregar una respuesta a una categoria
    $scope.btnAgregarRespuesta = function (categoria) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)

        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.push({
            descripcion: '',
            horasPlanificadas: null,
            horasReales: null
        })
    }

    //Como alumno: Quitar una respuesta de una categoria
    $scope.btnQuitarRespuesta = function (categoria, respuesta) {
        var pos = $scope.regEsfuerzoHoras.listaCategorias.indexOf(categoria)
        var pos2 = $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.indexOf(respuesta);
        $scope.regEsfuerzoHoras.listaCategorias[pos].listaRespuestas.splice(pos2, 1)
    }

    function ListarAlumnos() {
        //Si es una actividad grupal
        if ($scope.actividad.tipo == "G") {
            $scope.esActIndividual = false;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaGrupal = res.data;
            })
            $scope.mostrar = true;
        }
        else { //Si es una actividad individual
            $scope.esActIndividual = true;
            var params = { idActividad: $scope.actividad.idActividad }
            serviceCRUD.TypePost('actividad/alumnos/entregables', params).then(function (res) {
                $scope.listaAl = res.data.lista;
            })
            $scope.mostrar = true;
        }
    }

    function init() {
        if ($scope.esProfesor) {
            ListarAlumnos();
            obtenerRegistroHorasSoloCategorias();
            $scope.obtenerRegistroHorasXAlumno();
        }
        if (!$scope.esProfesor) {
            $scope.listarGrupo();
            $scope.obtenerRegHorasComoAlumno();
        }




    }

    init();
})