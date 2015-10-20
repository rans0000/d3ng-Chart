/*
@desc: DonutChart component
@usage:
<dchart-donutchart
                   data-dchart-data="data"
                   data-dchart-radius-outer="70"
                   data-dchart-radius-inner="45"
                   data-dchart-animspeed="300">
</dchart-donutchart>

@ data-dchart-data : Array of objects with format:- {name: 'name', value: 20, color: '#8899cc'}
@ data-dchart-animspeed : (optional; default: 300) Animation speed in milliseconds
@ data-dchart-radius-outer : (optional; default: 75)
@ data-dchart-radius-inner : (optional; default: 25px less than outer-radius if not specified)
*/
(function () {
    angular.module('dchart')
        .directive('dchartDonutchart', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=dchartData'
                },
                templateUrl: 'js/dchart/dchart-donutchart/dchart-donutchart-template.html',
                compile: donutchartCompile
            };
        }]);

    function donutchartCompile(element, attrs, transclude){

        //settings
        var settings = {};
        settings.outerRadius = parseInt(attrs.dchartRadiusOuter) || 75;
        settings.innerRadius = parseInt(attrs.dchartRadiusInner) || (settings.outerRadius - 25);
        settings.size = settings.outerRadius * 2;
        settings.animSpeed = parseInt(attrs.dchartAnimspeed) || 300;

        //creating initial svg structure
        var svg = d3.select(element[0]).select('svg')
        .attr('class', 'dchart-donutchart-svg')
        .attr('width', settings.size)
        .attr('height', settings.size);

        //link function
        return function(scope, element, attrs){
            donutchartLink(svg, scope, settings)
        };
    }

    function donutchartLink(svg, scope, settings){
        //mapping to native object
        var data = mapToNativeObject(scope.data);

        //setting the style properties
        scope.styleProperties = {};
        scope.styleProperties.margin = (settings.outerRadius - settings.innerRadius);
        scope.styleProperties.size = (settings.size - ( 2 * scope.styleProperties.margin)) + 'px';
        scope.styleProperties.margin += 'px';

        //initial setup


        //drawing the chart
        scope.total = d3.sum(data, function(d){return d.value;});
        drawDonutchart(svg, settings, data);

        scope.$watch('data', function(newValue, oldValue){
            data = mapToNativeObject(scope.data);
            scope.total = d3.sum(data, function(d){return d.value;});
            drawDonutchart(svg, settings, data);
        }, true);
    }

    function drawDonutchart(svg, settings, data){
        svg.select('g').remove();

        var donutchartGroup = svg.append('g')
        .attr('class', 'dchart-donutchart-group')
        .attr('transform', 'translate(' + settings.outerRadius + ', ' + settings.outerRadius + ')');

        var arc = d3.svg.arc()
        .innerRadius(settings.innerRadius)
        .outerRadius(settings.outerRadius);

        var pie = d3.layout.pie()
        .padAngle(.02)
        .value(function(d){return d.value;});

        var pieArcs = donutchartGroup.selectAll('path');
        pieArcs.data(pie(data))
            .enter()
            .append('path')
            .style('fill', function(d){return d.data.color;})
            .attr('d', arc)
            .on('click', function(){ console.log(d3.select(this).data()[0].value); })
        pieArcs.data(pie(data)).exit()
            .remove();

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
