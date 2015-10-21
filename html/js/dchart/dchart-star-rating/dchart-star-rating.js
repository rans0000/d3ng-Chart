(function () {
    angular.module('dchart')
        .directive('dchartStarRating', ['d3', function(d3){
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    value: '@dchartValue'
                },
                templateUrl: 'js/dchart/dchart-star-rating/dchart-star-rating-template.html',
                link: starRatingLink
            };
        }]);

    function starRatingLink(scope, element, attrs){

        var starArray = [];

        //preparing svg element
        var svg = d3.select(element[0]).select('svg');

        scope.$watch('value', function(newValue, oldValue){
            //sanitizing values
            scope.value = parseFloat(scope.value).toFixed(1) || 0;

            //map value to array
            starArray = getStarArray(scope.value);

            drawStars(svg, starArray);
        });
    }

    function drawStars(svg, data){

        svg.select('g').remove();

        var starRatingGroup = svg.append('g')
        .attr('class', 'dchart-star-rating-group')
        .attr('transform', 'translate(0, 0)');

        var star = starRatingGroup.selectAll('.star').data(data);

        star.enter()
            .append('circle')
            .attr('class', 'dchart-star-rating-star')
            .attr('cx', function(d, i){return (i*20)+10;})
            .attr({cy: 20, r: 10});

        star.exit().remove();

        star
            .classed('full', function(d){return d === 1;})
            .classed('half', function(d){return d === 'x';})
            .classed('empty', function(d){return d === 0;})
            .attr('fill', function(d){
            var color = '';
            switch(d){
                case 1: color = 'yellow';break;
                case 0: color = '#eee';break;
                case 'x': color = '#aaa';break;
            }
            return color;
        });
    }

    function getStarArray(value){
        var data = [];
        var diff;
        for(var i = 1; i < 6; ++i){
            diff = value - i;
            if(diff >= 0){
                data.push(1);
            }
            else if(diff <= -1){
                data.push(0);
            }
            else{
                data.push('x');
            }
        }
        return data;
    }

}());