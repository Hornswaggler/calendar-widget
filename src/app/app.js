(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap'])
        .config(function (datepickerConfig) {
            //Configure ui-bootstrap calendar control
            datepickerConfig.showWeeks = false;
            datepickerConfig.datepickerMode='month';
            datepickerConfig.minMode='month';
            datepickerConfig.maxMode='month';
		})
})();