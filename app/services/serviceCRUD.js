(function(){
    var serviceCRUD = function($http){
        var baseURL = "http://localhost:5500/api/";

        var TypeGet = function(Method, Params){
            var url = baseURL + Method;
            return $http.get(url, {params: Params});
        }

        var TypePost = function (Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data: $.param(Params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function(response){
                return response;
            });
        }

        var TypePostFile = function (Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data: $.param(Params),
                headers: {'Content-Type': 'multipart/form-data'}
            }).then(function(response){
                return response;
            });
        }

        return {
            TypeGet : TypeGet,
            TypePost : TypePost,
            TypePostFile : TypePostFile
        }
    }

    angular.module('ServiceCRUD', []).factory("serviceCRUD", serviceCRUD)
})();