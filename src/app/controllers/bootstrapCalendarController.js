(function () {
    'use strict';   
    
    angular
        .module('app')
        .controller('BootstrapCalendar', BootstrapCalendar);
    
    BootstrapCalendar.$inject = ['$scope'];

    function BootstrapCalendar($scope){
        var vm = this;
        
        $scope.dt = new Date();
				
        $scope.dateOptions = {
            'datepicker-mode'	: 'month',
            'show-weeks'			: false
        };
    }

})();