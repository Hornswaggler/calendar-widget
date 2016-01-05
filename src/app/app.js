(function () {
    'use strict';

    angular.module('app', ['ui.bootstrap','ngAnimate'])
        .constant("CONST",{
            APP_ROOT : scriptSource(),
            DAYS_OF_WEEK : ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            MONTHS : ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
            
            //EVENTS
            EVT_EVENTS_LOADED : "EVT_EVENTS_LOADED",
            EVT_EVENTS_UPDATED : "EVT_EVENTS_UPDATED",
            
            //DATES
            ONE_DAY : (1000 * 60 * 60 * 24),
            
            //MISC
            DEFAULT_CELL_HEIGHT : 170,
            DEFAULT_VISIBLE_EVENTS : 4
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