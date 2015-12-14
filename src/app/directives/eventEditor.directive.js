(function () {
    'use strict';   
    
    angular
        .module('app')
        .directive('eventEditor', eventEditor);
    
    eventEditor.$inject = ['CONST'];

    function eventEditor(CONST){
        var directive = {
            templateUrl : CONST.APP_ROOT + '/templates/eventEditor.html',
            restrict : 'EA'
        };
        return directive;
    }
 
})();