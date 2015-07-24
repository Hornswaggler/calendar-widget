(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap'])
        .constant("CONST",{
            DAYS_OF_WEEK : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            MONTHS : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        })
        .config(function (datepickerConfig) {
            //Configure ui-bootstrap calendar control
            datepickerConfig.showWeeks = false;
            datepickerConfig.datepickerMode='month';
            datepickerConfig.minMode='month';
            datepickerConfig.maxMode='month';
		})
})();