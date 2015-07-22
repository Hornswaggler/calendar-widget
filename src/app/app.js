(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap'])
        .constant("CONST",{
            DAYS_OF_WEEK : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        })
        .config(function (datepickerConfig) {
            //Configure ui-bootstrap calendar control
            datepickerConfig.showWeeks = false;
            datepickerConfig.datepickerMode='month';
            datepickerConfig.minMode='month';
            datepickerConfig.maxMode='month';
		})
})();