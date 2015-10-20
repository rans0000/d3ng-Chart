(function () {
    angular.module('dchart')
        .directive('dchartDonutchartWidget', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=dchartData',
                    radiusInner: '@dchartRadiusInner',
                    radiusOuter: '@dchartRadiusOuter',
                    animSpeed: '@dchartAnimspeed'
                },
                templateUrl: 'js/dchart/dchart-donutchart-widget/dchart-donutchart-widget-template.html',
                link: donutchartWidgetLink
            };
        }]);

    function donutchartWidgetLink(scope, element, attrs){
        //sanitize attributes
        scope.radiusOuter = parseInt(scope.radiusOuter) || 70
        scope.radiusInner = parseInt(scope.radiusInner) || (scope.radiusOuter - 25);

        scope.widgetData = mapToNativeObject(scope.data);
        scope.total = d3.sum(scope.widgetData, function(d){return d.value;});

        scope.$watch('data', function(newValue, oldValue){
            scope.widgetData = mapToNativeObject(scope.data);
            scope.total = d3.sum(scope.widgetData, function(d){return d.value;});
        }, true);
    }

    function mapToNativeObject(array){
        return array.map(function(d, i){
            return {
                'key': d.name,
                'value': d.value,
                'color': d.color
            };
        });
    }

}());
