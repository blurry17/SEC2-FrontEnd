(function(){
    var serviceUtil = function(){
        var utilitario = {
            cursoActual : null
        }

        return {
            utilitario : utilitario
        }

    }

    angular.module('ServiceUtil', []).factory("serviceUtil", serviceUtil)
})();