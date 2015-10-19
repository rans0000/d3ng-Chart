/*
@desc: Angularguage component for showing percentage value
@usage:
<!--<dchart-angularguage
                     data-dchart-value="{{app.percentValue}}"
                     data-dchart-size="100"
                     data-dchart-theme="dchart-angularguage-theme-default"
                     data-dchart-animspeed="1000">
</dchart-angularguage>-->

@ data-dchart-value : Value for the guage (shown as a percentage value)
@ data-dchart-size : (optional; default: 100). if size = 50, then width = 100 and height = 60
@ data-dchart-theme : (optional) - any css class name to be added to the component
@ data-dchart-animspeed : (optional; default: 300) Animation speed in milliseconds
*/
(function () {
    angular.module('dchart')
        .directive('dchartAngularguage', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    value: '@dchartValue',
                    size: '@dchartSize',
                    animSpeed: '@dchartAnimspeed',
                    themeClass: '@dchartTheme'
                },
                templateUrl: 'js/dchart/dchart-angularguage/dchart-angularguage-template.html',
                compile: angularguageCompile
            };
        }]);

    function drawAngularguage(svg, settings, data){
        var startAngle = -90 * Math.PI / 180,
            degValue = (data / 100 * 180) - 90;
            PiValue = (data * Math.PI / 100) + startAngle,
            posX = (settings.size),
            posY = settings.height;

        //reset the svg element
        svg
            .attr('width', settings.width)
            .attr('height', settings.height)
            .attr('class', settings.themeClass)
            .select('g')
            .remove();
        var angularguageGroup = svg.append('g')
        .attr('class', 'dchart-angularguage-group');
        
        //render the background arc
        var arcBg = d3.svg.arc()
        .innerRadius(settings.innerRadius)
        .outerRadius(settings.outerRadius)
        .startAngle(startAngle)
        .endAngle(Math.PI / 2);
        
        var shapeBg = angularguageGroup.append('path')
        .attr('class', 'dchart-angularguage-bgarc')
        .attr('d', arcBg)
        .attr('transform', 'translate(' + posX + ', ' + (posY + 10) + ')');
        
        //render the left arc
        var arcLeft = d3.svg.arc()
        .innerRadius(settings.innerRadius)
        .outerRadius(settings.outerRadius)
        .startAngle(startAngle)
        .endAngle(PiValue);

        var shapeLeft = angularguageGroup.append('path')
        .attr('class', 'dchart-angularguage-leftarc')
        .attr('transform', 'translate(' + posX + ', ' + (posY + 10) + ')')
        //.attr('d', arcLeft);
        .transition()
        .duration(settings.animSpeed)
        .attrTween('d', function(){
            var interpolate = d3.interpolate(startAngle, PiValue);
            return function(t){
                return arcLeft.endAngle(interpolate(t))();
            };
        });
        
        //building the needle
        var points = [[0, 0], [5, -settings.size], [10, 0]];
        var line = d3.svg.line();
        var needle = angularguageGroup.append('path')
        .attr('class', 'dchart-angularguage-needle')
        .datum(points)
        .attr('d', line)
        .attr('transform', 'translate(' + (posX-5) + ', ' + (posY) + ') rotate(-90)')
        .attr('transform-origin', '5 ' + settings.size)
        .transition()
        .duration(settings.animSpeed)
        .attr('transform', 'translate(' + (posX-5) + ', ' + (posY) + ') rotate(' + degValue + ')');
    }

    function angularguageCompile(element, attrs, transclude){
        var svg = d3.select(element[0]).select('svg');
        var group = svg.append('g')
        .attr('class', 'dchart-angularguage');

        //linking function
        return function(scope, element, attrs){
            angularguageLink(svg, scope, element, attrs);
        };
    }

    function angularguageLink(svg, scope, element, attrs){

        //sanitizing attributes
        var settings = {};
        settings.size = parseInt(scope.size) || 100;
        settings.width = settings.size * 2;
        settings.height = parseInt(settings.width / 2) + 10;
        settings.innerRadius = settings.size;
        settings.outerRadius = settings.size - 25;
        settings.animSpeed = parseInt(scope.animSpeed) || 300;
        scope.value = dchartUtils.sanitize0to100(scope.value);
        scope.themeClass = scope.themeClass || 'dchart-angularguage-theme-default';
        settings.themeClass = scope.themeClass;

        //start animating the guage
        drawAngularguage(svg, settings, scope.value)
        
        scope.$watch('value', function(newValue, oldValue){
            scope.value = parseFloat(scope.value) || 0;
            drawAngularguage(svg, settings, scope.value)
        });
    }

}());
