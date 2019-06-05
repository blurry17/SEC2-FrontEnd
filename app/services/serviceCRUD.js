(function(){
    var serviceCRUD = function($http){
        var baseURL = "http://localhost:5000/api/";
<<<<<<< HEAD
        //var baseURL = "http://localhost:5500/api/"
=======
>>>>>>> 3b013f38948ce31433a00bd49556942d0924a88f
        //var baseURL = "http://200.16.7.185:5000/api/"

        var TypeGet = function(Method, Params){
            var url = baseURL + Method;
            return $http.get(url, {params: Params});
        }

        var TypePost = function (Method, Params){
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data : JSON.stringify(Params)
            })
        }

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