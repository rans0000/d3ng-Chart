/*
@desc: Progressbar Widget that houses progressbar component
@usage:
<dchart-progressbar-widget
                           data-dchart-value="60"
                           data-dchart-theme="red"
                           data-dchart-title="Training 2"
                           data-dchart-type="typse1"
                           data-dchart-iconclass="my-icon-class">
</dchart-progressbar-widget>

@ data-dchart-value: the percentage value (0-100)
@ data-dchart-theme: theme type expected by progressbar. Can be (red, green,blue). leave for default black color
@ data-dchart-title: The heading
@ data-dchart-type: Displays widget with the value either at the side of the progressbar or above it. Values can be (type1 & type2)
@ data-dchart-iconclass: if a classname is given, the icon will be displayed at left side with this class
*/

(function () {
    angular.module('dchart')
        .directive('dchartProgressbarWidget', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    'value': '@dchartValue',
                    'theme': '@dchartTheme',
                    'title': '@dchartTitle',
                    'iconClass': '@dchartIconclass',
                    'widgetType': '@dchartType'
                },
                templateUrl: 'js/dchart/dchart-progressbar-widget/dchart-progressbar-widget-template.html',
                link: function(scope, element, attr){

                    scope.$watch('value', sanitizeValue);

                    switch(scope.theme){
                        case 'red': scope.themeClass = 'theme-red';break;
                        case 'green': scope.themeClass = 'theme-green';break;
                        case 'blue': scope.themeClass = 'theme-blue';break;
                        default: scope.themeClass = 'theme-default';break;
                    }

                    switch(scope.widgetType){
                        case 'type2': break;
                        case 'type1': break;
                        default: scope.widgetType = 'type1'; break;
                    }

                    function sanitizeValue(oldValue, newValue){
                        if(!scope.value){
                            scope.value = 0;
                        }
                        else{
                            if(parseFloat(scope.value) > 100){
                                scope.value = 100;
                            }
                        }
                    }
                }
            };
        }]);
}());
