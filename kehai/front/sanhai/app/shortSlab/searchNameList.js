/**
 * Created by Administrator on 2016/1/7.
 */

require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl:"/web/front/sanhai/",
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "base":"module/base",
        "angular":"lib/angular.min-1.2.2",
        "bootstrap":"lib/bootstrap",
        "domReady":"lib/plugin/domReady"
    },
    shim: {
        'angular': {
            exports: 'angular'
        }
    },
    deps:['bootstrap']
});

require(['jquery','angular','app/shortSlab/searchNameListDo'],function($,angular){
    var shortSlab = angular.module('shortSlab',[]);
    shortSlab.controller('shortSlab',['$scope', function($scope){
        $scope.list = [1,2,3,4];
    }]);

    shortSlab.directive('searchNameList',function(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template:"<div>" +
            "<table class='sh_table'>"+
            "<colgroup>"+
            "<col width='439px'>"+
            "<col width='439px'>"+
            "</colgroup>"+
            "<tbody>"+
            "<tr>"+
            "<th>姓名</th>"+
            "<th>详细信息</th>"+
            "</tr>"+
            "<tr ng-repeat='i in list'>"+
            "<td>100</td>"+
            "<td>10000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000</td>"+
            "</tr>"+
            "</tbody>"+
            "</table>"+
            "</div>"
        }
    });
})