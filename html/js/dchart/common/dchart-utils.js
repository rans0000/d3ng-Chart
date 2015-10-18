/*utility functions for dchart library*/

(function (window, document, undefined) {
    window.dchartUtils = {
        sanitize0to100: function(val){
            if(!isNaN(val)){
                val = val || 0;
                if(val > 100){val = 100;}
                if(val < 0){val = 0;}
            }
            else{
                val = 0;
            }
            return val;
        }
    };
}(window, document));
