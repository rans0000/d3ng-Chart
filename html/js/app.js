(function () {
    angular.module('myApp', ['dchart'])
        .controller('MainController', ['$scope', MainController]);

    function MainController($scope){
        var vm = this;
        
        vm.actualValue = 80;
        vm.totalValue = 100;
        vm.percentValue = calcPercentage();
        vm.dataString = [
            {color: '#5cb4eb', value: 69, name: 'Average'},
            {color: '#f09c29', value: 12, name: 'Below Average'},
            {color: '#f4f441', value: 45, name: 'Above Average'},
            {color: '#08a80f', value: 182, name: 'Excellent'}
        ];
        vm.dataString = JSON.stringify(vm.dataString);
        vm.data = JSON.parse(vm.dataString);
        vm.ratingValue = 3.5;
        
        vm.formDataSubmit = function(){
            console.log(vm.dataString);
            console.log(vm.data);
        };
        
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
