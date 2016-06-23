/**
 * Created by Administrator on 2016/1/5.
 */

require.config({
    //urlArgs: "bust=" + (new Date()).getTime(),
    baseUrl:"/web/front/sanhai/",
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "jquery_ui_min": "lib/jquery-ui.min",
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
require(['jquery','angular','app/shortSlab/shortSlabDo','jquery_ui_min'],function($,angular){

    var shortSlab = angular.module('shortSlab',[]);
    shortSlab.controller('shortSlab',['$scope', function($scope){
        $scope.status = true;
        $scope.list = [1,2,3,4];
        $scope.data=Date.now();
        $scope.popList = "预览信息";
        $scope.location =function(){
            window.location.href ='/web/front/audit/seachNameListr.html'
        };
        $scope.shortPreview = function(){
            /*弹窗初始化*/
            $('.popBox').dialog({
                autoOpen: false,
                width: 600,
                modal: true,
                resizable: false,
                close: function() {
                    $(this).dialog("close")
                }
            });
            //清除选项
            $('.cancelBtn').click(function() {
                $(".previewBox").dialog("close");
            });
            /*预览*/
                $("#previewBox").dialog("open");
        }
        $scope.day = function(){
            function to0(str){
                return str<10 ? '0'+str : ''+str;
            }
            var oDate=new Date();
            var Y = oDate.getFullYear();
            var M = oDate.getMonth()+1;
            oDate.setDate(oDate.getDate()-1);
            var D = oDate.getDate();
            var timer = Y +'-'+to0(M)+'-'+to0(D);
            return timer;
        }();
    }])
    shortSlab.filter('timeSection',function(){
        return function(time,num){
            /!*补 0 的函数*!/
            function to0(str){
                return str<10 ? '0'+str : ''+str;
            }
            var oDate=new Date();
            var Y = oDate.getFullYear();
            var M = oDate.getMonth()+1;
            oDate.setDate(oDate.getDate()-1);
            var D = oDate.getDate();
            if(num == 0){
                var timer = Y +'-'+to0(M)+'-'+to0(D);
                return timer
            }else if(num ==1){
                var timer = Y +'-'+to0(M)+'-'+to0(D);
                return addDate(timer,3)
            }else if(num ==2){
                var timer = Y +'-'+to0(M)+'-'+to0(D);
                return addDate(timer,7)
            }
        }
        function addDate(date,days){
            var d=new Date();
            d.setDate(d.getDate()-days);
            var month=d.getMonth()+1;
            var day = d.getDate();
            if(month<10){
                month = "0"+month;
            }
            if(day<10){
                day = "0"+day;
            }
            var val = d.getFullYear()+"-"+month+"-"+day;
            return val;
        }
    });


    shortSlab.directive('shTable',function(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template:"<div>" +
            "<table class='sh_table'>"+
            "<colgroup>"+
            "<col width='219px'>"+
            "<col width='219px'>"+
            "<col width='219px'>"+
            "<col width='219px'>"+
            "</colgroup>"+
            "<tbody>"+
            "<tr>"+
            "<th>排名</th>"+
            "<th>错题次数</th>"+
            "<th>题目序号</th>"+
            "<th>操作</th>"+
            "</tr>"+
            "<tr ng-repeat='i in list'>"+
            "<td>100</td>"+
            "<td>1000</td>"+
            "<td>题18324564 &nbsp; <a class='blue shortPreview' ng-show='status' ng-click='shortPreview()'>预览</a></td>"+
            "<td><a class='blue' ng-click='location()'>查看名单</a></td>"+
            "</tr>"+
            "</tbody>"+
            "</table>"+
            "</div>"
        }
    });

    shortSlab.directive('headerMid',function(){
        return {
            restrict: 'EA',
            replace: true,
            transclude: true,
            template:"<div class='header_mid'>"+
                    "<div class='header_mid_center'>"+
                        "<h2><a href='javascript:;' class='header_mid_center_text noBorder noPaddingLeft'>三海区域运营中心</a></h2>"+
                        "<h2><a href='javascript:;' class='header_mid_center_text'>后台管理</a></h2>"+
                        "</div>"+
                    "</div>"
        }
    });

    //shortSlab.directive('leftMenu',function(){
    //    return {
    //        restrict: 'EA',
    //        replace: true,
    //        transclude: true,
    //        template:"<ul class='left_menu'>"+
    //                    "<li>"+
    //                    "<div class='li_1'><a href='javascript:;'><span class='menu_icon_2'>旁听管理</span><i></i></a></div>"+
    //                    "<div class='li_2'>"+
    //                    "<a href='javascript:;' class='cur'>查看短板</a>"+
    //                    "<a href='javascript:;'' class='tea_step1'>旁听列表</a>"+
    //                    "</div>"+
    //                    "</li>"+
    //                "</ul>"
    //    }
    //})

});