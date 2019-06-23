app.controller('EstadisticasController', function ($rootScope, $scope, $location, $cookies, serviceUtil, serviceCRUD) {
  $scope.usuario = $cookies.getObject('usuario');
  $rootScope.user = $scope.usuario;
  if ($scope.usuario == undefined) $location.path('/');
  $rootScope.lstCursos = $cookies.getObject('cursos');
  $scope.curso = $cookies.getObject("cursoActual");
  $scope.actividad = $cookies.getObject("actividadActual");
  $scope.esProfesor = $scope.usuario.profesor;

  $scope.irActividad = function () {
    $location.path("actividad")
  }
  $scope.irCurso = function () {
    $location.path("curso")
  }

  $scope.listaFrec = [];
  $scope.gc = false;
  $scope.gb = false;
  $scope.seleccion = 'g';


  var params = { idActividad: $scope.actividad.idActividad }
  function listarRanking() {
    serviceCRUD.TypePost('actividad/alumnos_destaca', params).then(function (res) {
      //console.dir(res.data);
      $scope.listaR = res.data.lista5Alumnos;
    })
  }

  function tablaPorcentajes() {
    serviceCRUD.TypePost('actividad/estadistica', params).then(function (res) {
      console.dir(res.data);
      $scope.mediaS = res.data.media;
      $scope.desv = res.data.desviacionEstandar;
      $scope.porcentaje = res.data.porcentajeAprobados;
      $scope.notaMaxS = res.data.notaMax;
      $scope.notaMinS = res.data.notaMin;
      $scope.numNotasS = res.data.numNotas;
    })
  }

  function tablaNotas() {
    serviceCRUD.TypePost('alumnos/notas', params).then(function (res) {
      console.dir("VER ACA");
      console.dir(res.data);
      $scope.listaN = res.data.listaNotas;
      $scope.listaFrec = res.data.notaFrecuencia;

      $scope.cantidadN = res.data.cantidadNotas;
      $scope.cantidadF = res.data.cantidadFalta;
      $scope.cantidadT = res.data.cantidadTotal;
      //console.dir($scope.cantidadF);
      console.dir("CANTIDAD FALTAS:");
      console.dir(res.data.cantidadFalta);
    })

  }

  function drawChartC() {

    $scope.gc = true;
    $scope.gb = false;
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Percent'],
      ['Aprobados', $scope.porcentaje],
      ['Desaprobados', 100 - $scope.porcentaje]
    ]);

    var options = {
      title: 'Resultados:'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  function drawChartB() {
    $scope.gb = true;
    $scope.gc = false;

    var arregloFrec = [];
    arregloFrec.push(['Notas', 'Cantidad de Alumnos'])
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'Notas');
    data.addColumn('number', 'Cantidad de Alumnos');
    data.addColumn({ type: 'string', role: 'style' });
    for (let i = 0; i < $scope.listaFrec.length; i++) {
      var auxnota = $scope.listaFrec[i].nota;

      var colorNota;
      if (auxnota <= 10) colorNota = 'color: red';
      else colorNota = 'color: blue';
      data.addRow([$scope.listaFrec[i].nota, $scope.listaFrec[i].frecuencia, colorNota])
    }

    //console.dir(arregloFrec);

    var options = {
      chart: {
        title: 'Estadisticas de notas'
      },
      bars: 'vertical',
      backgroundColor: '#E4E4E4',
      opacity: 0.7
      // Required for Material Bar Charts.
    };

    //var chart = new google.charts.Bar(document.getElementById('barchart_material'));
    var chart = new google.visualization.ColumnChart(document.getElementById('barchart_material'));
    chart.draw(data, options);
  }

  $scope.TipoGrafico = function () {
    if ($scope.seleccion == 'gc') {
      $scope.gc = true;
      $scope.gb = false;
      google.charts.load('current', { 'packages': ['corechart'] });
      google.charts.setOnLoadCallback(drawChartC);
    } else if ($scope.seleccion == 'gb') {
      google.charts.load('visualization', 'current', { 'packages': ['corechart'], callback: drawChartB }); // corechart
      //google.charts.setOnLoadCallback(drawChartB);
      $scope.gc = false;
      $scope.gb = true;
    }
  }


  function init() {
    tablaPorcentajes()
    tablaNotas();
    listarRanking();
  }

  init();

})


