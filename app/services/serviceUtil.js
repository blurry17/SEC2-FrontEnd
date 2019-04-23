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

        return {
            utilitario : utilitario,
            ddmmyyyy : ddmmyyyy
        }

    }

    angular.module('ServiceUtil', []).factory("serviceUtil", serviceUtil)
})();