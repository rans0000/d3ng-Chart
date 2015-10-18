(function () {
    angular.module('myApp', ['dchart'])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope){
        var vm = this;
        
        vm.actualValue = 80;
        vm.totalValue = 100;
        vm.percentValue = calcPercentage();
        
        $scope.$watch('app.actualValue', function(){
            calcPercentage();
        });
        $scope.$watch('app.totalValue', function(){
            calcPercentage();
        });
        
        function calcPercentage(){
            vm.percentValue = vm.actualValue / vm.totalValue * 100;
        }
    }
}());
