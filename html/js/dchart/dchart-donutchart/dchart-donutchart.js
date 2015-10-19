(function () {
    angular.module('dchart')
    .directive('dchartDonutchart', ['d3', function(d3){
        return {
            restrict: 'E',
            replace: true,
            scope: {
            },
            compile: donutchartCompile
        };
    }]);
    
    function donutchartCompile(element, attrs, transclude){
        //link function
        return function(scope, element, attrs){
            donutchartLink(scope, element, attrs)
        };
    }
    
    function donutchartLink(scope, element, attrs){
    }
    
    function drawDonutchart(svg, settings, data){
        
    }
    
}());
