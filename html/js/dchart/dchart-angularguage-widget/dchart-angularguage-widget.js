/*
@desc: Angularguage Widget that houses angularguage component
@usage:
<dchart-angularguage-widget
                            data-dchart-value="{{app.actualValue}}"
                            data-dchart-title="Overall Delight"
                            data-dchart-size="100"
                            data-dchart-type="type1"
                            data-dchart-theme="dchart-angularguage-theme-default"
                            data-dchart-animspeed="300">
</dchart-angularguage-widget>

@ data-dchart-value : the percentage value (0-100)
@ data-dchart-title : Title for the widget
@ data-dchart-size : (optional; default: 100). if size = 50, then width = 100 and height = 60
@ data-dchart-type : (optional; default: type1). values can be 'type1' & 'type2' corresponding to for centered and left-aligned widgets
@ data-dchart-theme : (optional) - any css class name to be added to the component
@ data-dchart-animspeed : (optional; default: 300) Animation speed in milliseconds
*/
(function () {
    angular.module('dchart')
        .directive('dchartAngularguageWidget', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    value: '@dchartValue',
                    title: '@dchartTitle',
                    size: '@dchartSize',
                    widgetType: '@dchartType',
                    themeClass: '@dchartTheme',
                    animSpeed: '@dchartAnimspeed'
                },
                templateUrl: 'js/dchart/dchart-angularguage-widget/dchart-angularguage-widget-template.html',
                link: angularguageWidgetLink
            };
        }]);

    function angularguageWidgetLink(scope, element, attrs){
        var settings = {};
        scope.size = parseInt(scope.size) || 100;
        scope.animSpeed = parseInt(scope.animSpeed) || 300;
        //scope.value = dchartUtils.sanitize0to100(scope.value);
        scope.value = parseFloat(scope.value) || 0;
        scope.themeClass = scope.themeClass || 'dchart-angularguage-theme-default';
        
        if(scope.widgetType !== 'type2'){
            scope.widgetType = 'type1';
        }
    }
}());
