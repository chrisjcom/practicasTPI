angular.module("myApp",["ngRoute","myApp.controllers","myApp.services"]).
            config(["$routeProvider","$httpProvider",function($routeProvider, $httpProvider){ 
                   $routeProvider.when("/",{
                        controller: "tipoCentroController"
                    }).otherwise({redirectTo:"/"});
            }]);