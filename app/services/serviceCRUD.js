(function () {
    var serviceCRUD = function ($http) {
        //var baseURL = "http://localhost:5000/api/";
        var baseURL = "http://200.16.7.185:5000/api/"

        var TypeGet = function (Method, Params) {
            var url = baseURL + Method;
            return $http.get(url, { params: Params });
        }

        var TypePost = function (Method, Params) {
            return $http({
                method: 'POST',
                url: baseURL + Method,
                data: JSON.stringify(Params)
            })
        }

        var TypePostFile = function (Method, Params) {
            return $http({
                url: baseURL + Method,
                method: 'POST',
                data: Params,
                headers: { 'Content-Type': undefined },
                transformRequest: angular.identity
            })
        }

        return {
            TypeGet: TypeGet,
            TypePost: TypePost,
            TypePostFile: TypePostFile
        }
    }

    angular.module('ServiceCRUD', []).factory("serviceCRUD", serviceCRUD)
})();