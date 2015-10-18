/*
@desc: Radialguage widget that houses the radialguage component
@usage:
<dchart-radialguage-widget
                    data-dchart-value="{{app.actualValue}}"
                    data-dchart-total="{{app.totalValue}}"
                    data-dchart-title="Training"
                    data-dchart-size="90"
                    data-dchart-theme="reclass">
</dchart-radialguage-widget>

@ data-dchart-value : Value for the guage
@ data-dchart-total : Total number (used for percentage calculation)
@ data-dchart-title : the heading
@ data-dchart-size : (optional; default: 100) Width & height in pixels for the radialguage
@ data-dchart-theme : (optional) - any css class name to be added to the component
*/
(function () {
    angular.module('dchart')
        .directive('dchartRadialguageWidget', ['d3', function(d3){
            return{
                restrict: 'E',
                replace: true,
                scope: {
                    value: '@dchartValue',
                    total: '@dchartTotal',
                    title: '@dchartTitle',
                    size: '@dchartSize',
                    themeClass: '@dchartTheme'
                },
                templateUrl: 'js/dchart/dchart-radialguage-widget/dchart-radialguage-widget-template.html',
                link: radialguageWidgetLink
            };
        }]);
    
    function radialguageWidgetLink(scope, element, attrs){
        //sanitizing attributes
        scope.value = dchartUtils.sanitize0to100(scope.value);
        scope.total = dchartUtils.sanitize0to100(scope.total);
        scope.size = dchartUtils.sanitize0to100(scope.size);
    }
}());
