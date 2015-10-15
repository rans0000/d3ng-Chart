//d3 set as a factory for including in the dChart module
//assuming user has included d3 in scripts and the d3 object is available globally

(function () {
    angular.module('dchart')
        .factory('d3', function(){
        return d3;
    });
}());