(function () {
    angular.module('dchart')
        .directive('dchartLinechart', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    data: '=dchartData'
                },
                templateUrl: 'js/dchart/dchart-linechart/dchart-linechart-template.html',
                compile: linechartCompile
            };
        }]);

    function linechartCompile(element, attrs, transclude){

        //settingup defaults
        var settings = {};
        settings.width = parseInt(attrs.dchartWidth) || 200;
        settings.height = parseInt(attrs.dchartHeight) || 200;
        settings.animSpeed = parseInt(attrs.animSpeed) || 300;
        settings.margin = 30;

        //---------------------------------------
        //preparing the svg
        var svg = d3.select(element[0]).select('svg')
        .attr('width', settings.width)
        .attr('height', settings.height);

        svg.append('g').attr('class', 'dchart-linechart-xaxisgroup')
            .attr('transform', 'translate(' + settings.margin + ', ' + (settings.height - settings.margin) + ')');
        svg.append('g').attr('class', 'dchart-linechart-gridgroup')
            .attr('transform', 'translate(0, ' + settings.margin + ')');
        var linechartCursorGroup = svg.append('g').attr('class', 'dchart-linechart-cursorgroup')
        .attr('transform', 'translate(' + settings.margin + ', ' + settings.margin + ')');
        svg.append('g').attr('class', 'dchart-linechart-linegroup')
            .attr('transform', 'translate(' + settings.margin + ', ' + settings.margin + ')');
        svg.append('g').attr('class', 'dchart-linechart-dotgroup')
            .attr('transform', 'translate(' + settings.margin + ', ' + settings.margin + ')');

        //preparing the cursor elements
        linechartCursorGroup.append('line')
            .attr('class', 'dchart-linechart-cursor-x');
        linechartCursorGroup
            .append('g')
            .attr('class', 'dchart-linechart-triangle')
            .append('path')
            .attr('d', 'M0 0, l5 -5, 5 5z');

        //preparing the label
        var linechartLabelGroup = svg.append('g')
        .attr('class', 'dchart-linechart-labelgroup')
        .attr('transform', 'translate(0, 0)');
        linechartLabelGroup
            .append('rect')
            .attr(
            {
                'class': 'dchart-linechart-labelbg',
                'x': 0,
                'y': 0,
                'width': 40,
                'height': 25,
                'rx': 3,
                'ry': 3
            });
        linechartLabelGroup
            .append('path')
            .attr('class', 'dchart-linechart-labeldip')
            .attr('d', 'M15 25 l5 5, 5 -5z');

        linechartLabelGroup
            .append('text')
            .attr(
            {
                'class': 'dchart-linechart-labeltext',
                'x': 12,
                'y': 16
            });

        //---------------------------------------
        //link function
        return function(scope, element, attrs){
            linechartLink(scope, svg, settings, attrs);
        };
    }

    function linechartLink(scope, svg, settings, attrs){
        //data
        /*var data = [
            {date: '2015-01-01', value: 4},
            {date: '2015-01-02', value: 1},
            {date: '2015-01-03', value: 2.3},
            {date: '2015-01-04', value: 1.1},
            {date: '2015-01-05', value: 1.8},
            {date: '2015-01-06', value: 1.1},
            {date: '2015-01-07', value: 3.1}
        ];*/

        scope.$watch('data', function(newValue, oldValue){

            //call the drawing function
            drawLinechart(svg, settings, scope.data);
        });
    }

    function drawLinechart(svg, settings, data){

        //using timeformat function of D3.js as native Date object is buggy in D3.
        var timeFormat = d3.time.format('%Y-%m-%d');

        //---------------------------------------
        //scalingup
        var xScale = d3.time.scale()
        .domain(d3.extent(data, function(d){
            var t = timeFormat.parse(d.date);
            return t;
        }))
        .range([0, settings.width - (settings.margin * 2)]);

        var yScale = d3.scale.linear()
        .domain([0, d3.max(data, function(d){return d.value;})])
        .range([settings.height - (settings.margin * 2), 0]);

        //---------------------------------------
        //saving the value bounds for grid calculations, statistics etc
        var xMax = d3.max(data, function(d){return xScale(timeFormat.parse(d.date));});
        var xMin = d3.min(data, function(d){return xScale(timeFormat.parse(d.date));});
        var yMax = d3.max(data, function(d){return yScale(d.value);});
        var yMin = yScale(0);

        //draw the line
        var line = d3.svg.line()
        .x(function(d){return xScale(timeFormat.parse(d.date));})
        .y(function(d){return yScale(d.value);})

        var path = svg.select('.dchart-linechart-linegroup').selectAll('path').data(data);
        path
            .datum(data)
            .attr('d', line);
        path
            .enter()
            .append('path')
            .datum(data)
            .attr('d', line);
        path.exit().remove();

        //---------------------------------------
        //draw the dots
        var dots = svg.select('.dchart-linechart-dotgroup').selectAll('circle').data(data);
        dots
            .enter()
            .append('circle')
            .on('mouseenter', onMouseEnterDot)
            .on('mouseleave', onMouseLeaveDot);
        dots
            .attr('cx', function(d, i){return xScale(timeFormat.parse(d.date));})
            .attr('cy', function(d, i){return yScale(d.value);})
            .attr('r', 4);

        dots.exit().remove();

        //---------------------------------------
        //draw the background grid
        var gridGroup = svg.select('.dchart-linechart-gridgroup').selectAll('line.horizontalGrid').data(yScale.ticks(4));

        gridGroup
            .enter()
            .append('line')
            .attr(
            {
                'class': 'horizontalGrid',
                'x1': settings.margin,
                'x2': (settings.width - (settings.margin)),
                'y1': function(d){return yScale(d);},
                'y2': function(d){return yScale(d);},
                'fill': 'none',
                'stroke': 'black'
            });

        //---------------------------------------
        //draw the axis
        var xAxis = d3.svg.axis()
        .scale(xScale)
        .orient('bottom')
        .ticks(7)
        .tickFormat(d3.time.format('%a'));

        svg.select('.dchart-linechart-xaxisgroup')
            .call(xAxis);

        //---------------------------------------
        //set triangle to starting position
        svg.select('.dchart-linechart-triangle')
            .attr('transform', 'translate(' + (xMin-5) + ', ' + (yMin+5) + ')');

        //---------------------------------------
        //draw the xaxis cursor
        function onMouseEnterDot(){
            var event = d3.event;
            var pos = d3.mouse(this);
            var triangle = svg.select('.dchart-linechart-triangle');
            var cursorX = svg.select('.dchart-linechart-cursor-x');
            var posX = parseFloat(d3.select(this).attr('cx'));
            var posY = parseFloat(d3.select(this).attr('cy'));

            //show label & cursor groups
            svg.select('.dchart-linechart-cursorgroup')
                .transition()
                .duration(50)
                .style('opacity', 1);
            svg.select('.dchart-linechart-labelgroup')
                .transition()
                .duration(50)
                .style('opacity', 1);

            //draw vertical line
            cursorX
            //.transition()
            //.duration(settings.animSpeed)
                .attr({
                'x1': posX,
                'y1': posY,
                'x2': posX,
                'y2': yMin
            });

            //draw the triangle
            triangle
            //.transition()
            //.duration(settings.animSpeed)
                .attr('transform', 'translate(' + (posX - 5) + ', ' + (yMin + 5) + ')');

            //update the label text
            svg.select('.dchart-linechart-labeltext')
                .text(d3.format('.3n')(yScale.invert(posY)));
            //position the label group
            svg.select('.dchart-linechart-labelgroup')
                .attr('transform', 'translate(' + (posX + 10) + ', ' + (posY - 5) + ')');

        }

        //removing the xaxis cursor
        function onMouseLeaveDot(){
            svg.select('.dchart-linechart-cursorgroup')
                .transition()
                .duration(50)
                .style('opacity', 0);
            svg.select('.dchart-linechart-labelgroup')
                .transition()
                .duration(50)
                .style('opacity', 0);
        }
    }

}());
