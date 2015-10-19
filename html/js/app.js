(function () {
    angular.module('myApp', ['dchart'])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope){
        var vm = this;
        
        vm.actualValue = 80;
        vm.totalValue = 100;
        vm.percentValue = calcPercentage();
        vm.data = [
            {color: '#5cb4eb', value: 69, name: 'Average'},
            {color: '#f09c29', value: 12, name: 'Below Average'},
            {color: '#f4f441', value: 45, name: 'Above Average'},
            {color: '#08a80f', value: 182, name: 'Excellent'}
        ];
        
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
