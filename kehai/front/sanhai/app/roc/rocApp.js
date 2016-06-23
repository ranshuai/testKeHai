
define(["angular",'jquery','jquery_ui_min','app/roc/rocService','app/roc/rocFilter',
    'app/roc/rocMainController','app/resource'],function(angular){

    return angular.module('rocApp', ['ui.router','resource','rocApp.rocModule']).
        controller("bodyController",["$scope",function($scope){
            $scope.menuPt=false;
            $scope.menuDb=false;
            $scope.menuCount=false;
            $scope.menuRevenueCount=false;
        }]);
})