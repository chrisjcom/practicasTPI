angular.module('myApp.controllers',[])
        .controller('TipoCentroController',['$scope','tipoCentroFactory',function($scope, tcf){
                $scope.listTipoCentro;
                function getListTipoCentro(){
                    tcf.getTiposCentro().then(function(res){
                        $scope.listTipoCentro = res.data;
                    },function(error){
                        console.log("Error: "+error);
                    });
                }
                getListTipoCentro();
}]);