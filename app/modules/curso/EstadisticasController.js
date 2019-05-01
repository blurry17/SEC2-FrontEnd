app.controller('EstadisticasController',function($scope, $location, $cookieStore, serviceUtil){ 
    $scope.curso=$cookieStore.get("cursoActual")
    $scope.actividad=$cookieStore.get("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }


    $scope.gc=true;
    $scope.gb=false;

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






  google.charts.load('current', { 'packages': ['bar'] });
  google.charts.setOnLoadCallback(drawChartB);

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
})