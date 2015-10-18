(function () {
    angular.module('myApp', ['dchart'])
        .controller('MainController', MainController);

    function MainController(){
        var viewModel = this;
        
        viewModel.percentValue = 60;
    }
}());
