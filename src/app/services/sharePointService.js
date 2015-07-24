(function () {
    'use strict';   
    //TODO: Make this a factory instead of a "Service"
    angular
        .module('app')
        .service('spService', spService);
    
    function spService(){
        var service = {
            doStuff : doStuff
        };
        return service;
    
        //////////
        
        function doStuff(){
            console.log("Stuff is being done!");
        }
    }
    
})();