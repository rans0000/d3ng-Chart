/*
@desc: Component for showing a 1-5 scale star rating meter.
@usage:
<dchart-star-rating data-dchart-value="value"></dchart-star-rating>

@ data-dchart-value : Value for the guage (value between 0 - 5. Floting point values are accepted)
*/
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
        var rootElement = d3.select(element[0]);

        scope.$watch('value', function(newValue, oldValue){
            //sanitizing values
            scope.value = parseFloat(scope.value).toFixed(1) || 0;

            //map value to array
            starArray = getStarArray(scope.value);

            drawStars(rootElement, starArray);
        });
    }

    function drawStars(svg, data){

        var star = svg.selectAll('.dchart-star-rating-star').data(data);

        star.enter()
            .append('span')
            .attr('class', 'dchart-star-rating-star');

        star.exit().remove();

        star
            .classed('full', function(d){return d === 1;})
            .classed('half', function(d){return d === 'x';})
            .classed('empty', function(d){return d === 0;})
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