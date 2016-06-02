angular.module("myApp.services",[])
        .factory("tipoCentroFactory",["$http",function($http){
                var dataFactory = {};
                var url = "http://chrisjcom:8080/clinica-war/ws/";
                var entity = "TipoCentro";
                
                dataFactory.getTiposCentro = function (){
                    return $http.get(url+entity);
                };
                return dataFactory;
}]);