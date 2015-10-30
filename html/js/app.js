(function () {
    angular.module('myApp', ['dchart'])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope){
        var vm = this;
        
        vm.actualValue = 80;
        vm.totalValue = 100;
        vm.percentValue = calcPercentage();
        vm.dataString = [
            {date: '2015-01-01', color: '#5cb4eb', value: 69, name: 'Average'},
            {date: '2015-01-02', color: '#f09c29', value: 12, name: 'Below Average'},
            {date: '2015-01-03', color: '#f4f441', value: 45, name: 'Average 1'},
            {date: '2015-01-04', color: '#41f45d', value: 5, name: 'Average 2'},
            {date: '2015-01-05', color: '#4186f4', value: 23, name: 'Average 3'},
            {date: '2015-01-06', color: '#ed41f4', value: 95, name: 'Above Average'},
            {date: '2015-01-07', color: '#08a80f', value: 182, name: 'Excellent'}
        ];
        vm.dataString = JSON.stringify(vm.dataString);
        vm.data = JSON.parse(vm.dataString);
        vm.ratingValue = 3.5;
        
        $scope.$watch('app.actualValue', function(){
            calcPercentage();
        });
        $scope.$watch('app.totalValue', function(){
            calcPercentage();
        });
        $scope.$watch('app.dataString', function(){
            vm.data = JSON.parse(vm.dataString);
        });
        
        function calcPercentage(){
            vm.percentValue = vm.actualValue / vm.totalValue * 100;
        }
    }
}());
