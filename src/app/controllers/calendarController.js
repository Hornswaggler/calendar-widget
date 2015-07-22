(function () {
    'use strict';   
    
    angular
        .module('app')
        .controller('Calendar', Calendar);
    
    Calendar.$inject = ['spService'];
    
    function Calendar(spService){
        var vm = this;
        
        console.log("Initializing Calendar");
    }
    
})();