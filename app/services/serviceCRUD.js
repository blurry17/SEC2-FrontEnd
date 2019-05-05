(function(){
    var serviceCRUD = function($http){
        var baseURL = "http://localhost:5000/api/";

        var TypeGet = function(Method, Params){
            var url = baseURL + Method;
            return $http.get(url, {params: Params});
        }

        var TypePost = function (Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data : Params
                //data: $.param(Params),
                //headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
        }

        /* var TypePost = function (Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data : Params
            }).then(function(response){
                console.dir(response.data);
                return response.data;
            });
        } */

        var TypePostFile = function (Method, Params){
            return $http({
                url: baseURL + Method,
                method: 'POST',
                data: Params,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            }).then(function (response) {
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