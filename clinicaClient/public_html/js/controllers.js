angular.module('myApp.controllers',[])
        .controller('TipoCentroController',['$scope','tipoCentroFactory','websocketFactory',
    function($scope, tcf, wsf){
                $scope.listTipoCentro;
                $scope.seleccionado = {};
                $scope.tcTemporal = {};
                $scope.options = [
                    {value: false, label: 'Inactivo'},
                    {value: true, label: 'Activo'}
                ];
                
                wsf.connect('ws://localhost:8080/clinica-war/TipoCentroWs', function(msg){
                   var obj = JSON.parse(msg.data);
                   var nuevo = true;
                   
                   $scope.$apply(function(){
                       for( var i = 0; i < $scope.listTipoCentro.length; i++){
                           var tc = $scope.listTipoCentro[i];
                           if(tc.idTipoCentro == obj.idTipoCentro){
                               if(tc.nombre != obj.nombre) {
                                   tc.nombre = obj.nombre;
                               }
                               if(tc.activo != obj.activo) {
                                   tc.activo = obj.activo;
                               }
                               nuevo = false;
                               break;
                           }
                       }
                       if(nuevo){
                           $scope.listTipoCentro.push(obj);
                       }
                       $scope.tcTemporal = {};
                       $scope.limpiar();
                   });
                });
                
                function getListTipoCentro(){
                    tcf.getTiposCentro().then(function(res){
                        $scope.listTipoCentro = res.data;
                    },function(error){
                        console.log("Error: "+error);
                    });
                }
                
                getListTipoCentro();
                
                $scope.createTipoCentro = function(tc) {
                    if(typeof tc.activo == "undefined") {
                        tc.activo = true;
                    }
                    wsf.send(tc);
//                    tcf.createTipoCentro(tc).then(function(res){
//                        getListTipoCentro();
//                        $scope.limpiar();
//                    },function(err){
//                        $scope.limpiar();
//                    })
                };
                
                $scope.updateTipoCentro = function(tc) {
                    wsf.send(tc);
//                    tcf.updateTipoCentro(tc).then(function(res){
//                        $scope.tcTemporal = {};                       
//                        $scope.limpiar();
//                    },function(err){
//                        $scope.limpiar();
//                    });
                };
               
                $scope.deleteTipoCentro = function(tc){
//                  tcf.deleteTipoCentro(tc.idTipoCentro).then(
//                    function(res){
//                      getListTipoCentro();
//                      $scope.tcTemporal = {};
//                      $scope.limpiar();
//                  },function(err){
//                      $scope.limpiar();
//                  });
                };
                
                $scope.seleccionar = function(tc) {
                    $scope.seleccionado = tc;
                    $scope.tcTemporal.idTipoCentro = $scope.seleccionado.idTipoCentro;
                    $scope.tcTemporal.nombre = $scope.seleccionado.nombre;
                    $scope.tcTemporal.activo = $scope.seleccionado.activo;
                    document.querySelector("#myForm").classList.remove('hidden');
                    document.querySelector("#btnEditar").classList.remove('hidden');
                    document.querySelector("#btnEliminar").classList.remove('hidden');
                    document.querySelector("#btnCancelar").classList.remove('hidden');
                    document.querySelector("#btnNuevo").classList.add('hidden');
                    document.querySelector("#btnCrear").classList.add('hidden');
                };
                
                $scope.limpiar = function() {
                    if(typeof $scope.tcTemporal.idTipoCentro != "undefined"){
                        $scope.seleccionado.idTipoCentro = $scope.tcTemporal.idTipoCentro;
                        $scope.seleccionado.nombre = $scope.tcTemporal.nombre;
                        $scope.seleccionado.activo = $scope.tctemporal.activo;
                        $scope.seleccionado = {};
                    } else {
                        $scope.seleccionado = {};
                    }
                    document.querySelector("#myForm").classList.add('hidden');
                    document.querySelector("#btnEditar").classList.add('hidden');
                    document.querySelector("#btnEliminar").classList.add('hidden');
                    document.querySelector("#btnCancelar").classList.add('hidden');
                    document.querySelector("#btnNuevo").classList.remove('hidden');
                    document.querySelector("#btnCrear").classList.add('hidden');
                };
                
                $scope.mostrar = function() {
                    document.querySelector("#myForm").classList.remove('hidden');
                    document.querySelector("#btnEditar").classList.add('hidden');
                    document.querySelector("#btnEliminar").classList.add('hidden');
                    document.querySelector("#btnCancelar").classList.remove('hidden');
                    document.querySelector("#btnNuevo").classList.add('hidden');
                    document.querySelector("#btnCrear").classList.remove('hidden');
                }
                
}]);