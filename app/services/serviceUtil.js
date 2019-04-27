(function(){
    var serviceUtil = function(){
        var utilitario = {
            
        }

        var ddmmyyyy = function(date) {
            var d = new Date(date),
                month = '' + (d.getMonth() + 1),
                day = '' + d.getDate(),
                year = d.getFullYear();
        
            if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
        
            return [day, month, year].join('/');
        }

        var convertToDate = function(datestring){
            var dd = parseInt(datestring.substring(0,2));
            var mm = parseInt(datestring.substring(3,5));
            var yyyy = parseInt(datestring.substring(6,10));

            return new Date(yyyy, mm - 1, dd);
        }

        return {
            utilitario : utilitario,
            ddmmyyyy : ddmmyyyy,
            convertToDate : convertToDate
        }

    }

    angular.module('ServiceUtil', []).factory("serviceUtil", serviceUtil)
})();