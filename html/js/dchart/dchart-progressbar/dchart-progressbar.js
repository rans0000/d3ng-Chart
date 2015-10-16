/*
@desc: simple progressbar that shows percentage value
@usage:
<dchart-progressbar
    data-dchart-value="someVal">
    data-dchart-theme="someTheme"
</dchart-progressbar>
*/

(function () {
    angular.module('dchart').
    directive('dchartProgressbar', ['d3', function(d3){
        return {
            restrict: 'E',
            replace: true,
            scope: {
                'value': '=dchartValue',
                'theme': '@dchartTheme'
            },
            templateUrl: 'js/dchart/dchart-progressbar/dchart-progressbar-template.html',
            link: function(scope, element, attrs){
                
                switch(scope.theme){
                    case 'red': scope.themeClass = 'theme-red';break;
                    case 'green': scope.themeClass = 'theme-green';break;
                    case 'blue': scope.themeClass = 'theme-blue';break;
                    default: scope.themeClass = 'theme-default';break;
                }
            }
        };
    }]);
}());
