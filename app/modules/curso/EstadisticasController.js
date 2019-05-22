app.controller('EstadisticasController',function($rootScope, $scope, $location, $cookies, serviceUtil){ 
    $scope.usuario = $cookies.getObject('usuario');
    if ($scope.usuario == undefined) $location.path('/');
    $rootScope.lstCursos = $cookies.getObject('cursos');
    $scope.curso=$cookies.getObject("cursoActual")
    $scope.actividad=$cookies.getObject("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }


    $scope.gc=false;
    $scope.gb=false;
    $scope.seleccion = 'gc';

    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChartC);

  function drawChartC() {
    $scope.gc=true;
    $scope.gb=false;
    var data = google.visualization.arrayToDataTable([
      ['Task', 'Percent'],
      ['Aprobados',     60],
      ['Desaprobados',      40]
    ]);

    var options = {
      title: 'Resultados:'
    };

    var chart = new google.visualization.PieChart(document.getElementById('piechart'));

    chart.draw(data, options);
  }

  

  function drawChartB() {
    $scope.gb=true;
    $scope.gc=false;
    var data = google.visualization.arrayToDataTable([
      ['Notas', 'Aprobados ', 'Desaprobados'],
      ['0-5', 0, 3],
      ['6-10', 0, 4],
      ['11-15', 10, 0],
      ['16-20', 3, 0]
    ]);

    var options = {
      chart: {
        title: 'Resultados:'
      },
      bars: 'vertical' // Required for Material Bar Charts.
    };

    var chart = new google.charts.Bar(document.getElementById('barchart_material'));
    chart.draw(data, google.charts.Bar.convertOptions(options));
  }


  $scope.TipoGrafico = function(){
    if($scope.seleccion == 'gc') {
      $scope.gc=true;
      $scope.gb = false;
      google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChartC);
    }else{
      google.charts.load('current', { 'packages': ['bar'] });
      google.charts.setOnLoadCallback(drawChartB);
      $scope.gc=false;
      $scope.gb = true;
    }
  }
})