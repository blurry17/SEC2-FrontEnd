(function(){
    var serviceCRUD = function($http){
        var baseURL = "http://localhost:1234/api/";

        var TypeGet = function(Api, Method, Params){
            var url = baseURL + Api + "/" + Method;
            return $http.get(url, {params: Params});
        }

        var TypePost = function (Api, Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Api + "/" + Method,
                data: $.param(Params),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).success(function(response){
                return response;
            });
        }

        return {
            TypeGet : TypeGet,
            TypePost : TypePost
        }
    }

    angular.module('ServiceCRUD', []).factory("serviceCRUD", serviceCRUD)
})();