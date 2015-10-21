/*
@desc: Widget for showing 'Star rating Chart'.
@usage:
<dchart-star-rating-widget
                           data-dchart-value="5.3"
                           data-dchart-title="Viewers"
                           data-dchart-count="1000"
                           data-dchart-type="type1">
</dchart-star-rating-widget>

@ data-dchart-value : Value for the guage (value between 0 - 5. Floting point values are accepted)
@ data-dchart-title : Title for widget
@ data-dchart-count : Value to be shown alonside title
@ data-dchart-type  : (optinal) (default: 'type1') String value either "type1" or "type2". Sets position of star component above or below the title.
*/
(function () {
    angular.module('dchart')
    .directive('dchartStarRatingWidget', ['d3', function(d3){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                value: '@dchartValue',
                title: '@dchartTitle',
                count: '@dchartCount',
                widgetType: '@dchartType'
            },
            templateUrl: 'js/dchart/dchart-star-rating-widget/dchart-star-rating-widget-template.html',
            link: starRatingWidgetLink
        };
    }]);
    
    function starRatingWidgetLink(scope, element, attrs){
        scope.themeClass = (scope.widgetType === 'type2')? 'type2' : 'type1';
        
        scope.$watch('value', function(newValue, oldValue){
            scope.value = parseFloat(scope.value) || 0;
        });
    }
    
}());
