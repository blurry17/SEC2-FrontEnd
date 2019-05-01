app.controller('EstadisticasController',function($scope, $location, $cookieStore, serviceUtil){ 
    $scope.curso=$cookieStore.get("cursoActual")
    $scope.actividad=$cookieStore.get("actividadActual")

    $scope.irActividad = function(){
        $location.path("actividad")
    }
    $scope.irCurso = function(){
        $location.path("curso")
    }


    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

  function drawChart() {

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
})