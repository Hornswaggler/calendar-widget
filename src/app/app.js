(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap','ngAnimate'])
        .constant("CONST",{
            APP_ROOT : scriptSource(),
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

    function scriptSource() {
        var scripts = document.getElementsByTagName('script'),
        script = scripts[scripts.length - 1];

        if (script.getAttribute.length !== undefined) {
            return script.getAttribute('src').replace("/app.js","")
        }

        return script.getAttribute('src', 2).replace("/app.js","");
    }
    
    
})();