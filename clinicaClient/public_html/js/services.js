angular.module("myApp.services",[])
        .factory("tipoCentroFactory",["$http",function($http){
                var dataFactory = {};
                var url = "http://chrisjcom:8080/clinica-war/ws/";
                var entity = "TipoCentro";
                
                dataFactory.getTiposCentro = function (){
                    return $http.get(url+entity);
                };
                dataFactory.createTipoCentro = function(tc){
                    return $http.post(url+entity, tc);
                };
                dataFactory.updateTipoCentro = function(tc){
                    return $http.put(url+entity,tc);
                };
                dataFactory.deleteTipoCentro = function(id) {
                    return $http.delete(url+entity+'/'+id);
                }
                return dataFactory;
}]).factory('websocketFactory',["$log",function($log){
            var service = {};
            service.connect = function(url, callback){
                if(service.ws) { return; }
                var ws = new WebSocket(url);
                ws.onopen = function() {
                    $log.log("Websocket connection was opened");
                };
                ws.onclose =  function() {
                    $log.log("Websocket connection was closed");
                };
                ws.onerror = function() {
                    $log.log("Websocket connection failure");
                }
                ws.onmessage = function(message) {
                    callback(message);
                };
                service.ws = ws;
            }
            service.send = function(message){ 
                service.ws.send(JSON.stringify(message));
            }
            return service;
    }]);