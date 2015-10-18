/*
@desc: Radialguage component that shows percentage value
@usage:
<dchart-radialguage
                    data-dchart-value="{{app.percentValue}}"
                    data-dchart-size="90"
                    data-dchart-theme="reclass"
                    data-dchart-animspeed="300"
                    data-dchart-radius-outer="80"
                    data-dchart-radius-inner="40">
</dchart-radialguage>

@ data-dchart-value : Value for the guage (0-100)
@ data-dchart-size : (optional; default: 100) Width & height in pixels
@ data-dchart-theme : (optional) - any css class name to be added to the component
@ data-dchart-animspeed : (optional; default: 300) Animation speed in milliseconds
@ data-dchart-radius-outer : (optional; default: chart-size)
@ data-dchart-radius-inner : (optional; default: chart-size)
*/

(function () {
    angular.module('dchart')
        .directive('dchartRadialguage', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    value: '@dchartValue',
                    size: '@dchartSize',
                    themeClass: '@dchartTheme',
                    outerRadius: '@dchartRadiusOuter',
                    innerRadius: '@dchartRadiusInner',
                    animSpeed: '@dchartAnimspeed'
                },
                templateUrl: 'js/dchart/dchart-radialguage/dchart-radialguage-template.html',
                compile: radialguageCompile
            };
        }]);

    function drawRadialguage(svg, settings, data){
        svg
            .attr('width', settings.width)
            .attr('height', settings.height)
            .attr('class', settings.themeClass)
            .select('g')
            .remove();

        var radialGroup = svg.append('g')
        .attr('class', 'dchart-radialguage-group');


        //render the background arc
        var innerRadius = settings.innerRadius / 2,
            outerRadius = settings.outerRadius / 2,
            posX = outerRadius,
            posY = outerRadius,
            PiValue = 2 * data * Math.PI / 100;

        var arcBg = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(360);

        var shapeBg = radialGroup.append('path')
        .attr('class', 'dchart-radialguage-bgarc')
        .attr('d', arcBg)
        .attr('transform', 'translate(' + posX + ', ' + posY + ')');

        if(PiValue === 0){
            return;
        }
        //render the value arc
        var arcValue = d3.svg.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius)
        .startAngle(0)
        .endAngle(PiValue);

        var shapeValue = radialGroup.append('path')
        .attr('class', 'dchart-radialguage-valarc')
        .attr('transform', 'translate(' + posX + ', ' + posY + ')')
        //.attr('d', arcValue);
        .transition()
        .duration(settings.animSpeed)
        .attrTween('d', function(){
            var interpolate = d3.interpolate(0, PiValue);
            return function(t){
                return arcValue.endAngle(interpolate(t))();
            };
        });
    }

    function radialguageCompile(element, attrs, transclude){


        //sanitizing attributes
        /*var settings = {};
        settings.width = parseInt(attrs.dchartSize) || 100;
        settings.height = settings.width;
        settings.themeClass = attrs.dchartTheme || 'dchart-radialguage-theme-default';
        settings.outerRadius = attrs.dchartRadiusOuter || settings.width;
        settings.innerRadius = attrs.dchartRadiusInner || (settings.width - 10);
        settings.animSpeed = attrs.animspeed || 300;*/

        //creating the element
        var svg = d3.select(element[0]).select('.dchart-radialguage-svg');

        //link function
        return function(scope, element, attrs){
            radialguageLink(svg, scope, element, attrs);
        };
    }

    function radialguageLink(svg, scope, element, attrs){
        //sanitizing attributes
        var settings = {};
        settings.width = parseInt(scope.size) || 100;
        settings.height = settings.width;
        settings.themeClass = scope.theme || 'dchart-radialguage-theme-default';
        settings.outerRadius = scope.outerRadius || settings.width;
        settings.innerRadius = scope.innerRadius || (settings.width - 10);
        settings.animSpeed = scope.animSpeed || 300;

        //sanitizing value
        scope.value = dchartUtils.sanitize0to100(scope.value);
        drawRadialguage(svg, settings, scope.value)

        scope.$watch('value', function(newValue, oldValue){
            scope.value = dchartUtils.sanitize0to100(scope.value)
            drawRadialguage(svg, settings, scope.value)
        });
    }
}());
