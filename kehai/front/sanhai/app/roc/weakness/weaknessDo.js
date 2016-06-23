define(['app/roc/rocModule','dialogs'],function (rocModule,dialogs) {
    rocModule.controller('weaknessController',['$scope','$filter',
        'weaknessService','subjects','grades','loadAreasService','previewService','$state',
        function($scope,$filter,weaknessService,subjects,grades,loadAreasService,previewService,$state){

            /*弹窗初始化*/
            $('.popBox').dialog({
                autoOpen: false,
                width: 850,
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

            $scope.$parent.menuDb = true; //菜单高亮
            $scope.subjects=angular.fromJson(subjects);
            $scope.grades=angular.fromJson(grades);

            $scope.params = {}; //查询的参数对象
            $scope.status = true;//页签切换

            loadAreasService.list(). //推广区域加载
               success(function(data, status, headers, config) {
                   if(data.resCode == '000'){
                       $scope.areaArr=data.data.areas;
                       angular.forEach($scope.areaArr, function (value, key) {
                           value.checked = false;
                       });
                   }else{
                       dialogs._alert(data.resMsg);
                   }
               }).
               error(function(data, status, headers, config) {
               });

            $scope.chkall = false;
            $scope.chkAll = function(checked) {
                angular.forEach($scope.areaArr, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('areaArr', function(nv, ov){
                if(nv == ov){
                    return;
                }
                $scope.params.areaCode = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function(v) {
                        $scope.params.areaCode.push(v.code);
                    });
                $scope.chkall = $scope.params.areaCode.length == $scope.areaArr.length;
            }, true);

            $scope.params.endTime = function(){
                var oDate=new Date();
                return $filter('date')( oDate.setDate(oDate.getDate()-1),'yyyy-MM-dd');
            }(); //结束时间
            $scope.params.startTime =$scope.params.endTime;//开始时间
            $scope.wqTime = 1;
            $scope.kqTime = 1;
            $scope.emText="最近一天";
            $scope.emText1="一个月";
            $scope.change = function(x){
                if($scope.status){
                    switch(x){
                        case '1': $scope.emText="最近一天";break;
                        case '3': $scope.emText="最近三天";break;
                        case '7': $scope.emText="最近一周";break;
                    }
                }else{
                    switch(x){
                        case '1': $scope.emText1="一个月";break;
                        case '2': $scope.emText1="两个月";break;
                        case '4': $scope.emText1="四个月";break;
                    }
                }
                var oDate=new Date();
                $scope.status ? oDate.setDate(oDate.getDate()-x) : oDate.setMonth(oDate.getMonth()-x);
                $scope.params.startTime=$filter('date')(oDate,'yyyy-MM-dd');
            };

            $scope.getDbList = function(){
                if($scope.status){
                    $scope.wqConf.currentPage == 1?$scope.getWqList():$scope.wqConf.currentPage=1;
                }else{
                    $scope.kqConf.currentPage == 1?$scope.getWqList():$scope.kqConf.currentPage=1;
                }
            };

            $scope.getWqList = function() {
               /* if($scope.status){
                    $scope.params.currentPage=$scope.wqConf.currentPage;
                    $scope.params.pageSize=$scope.wqConf.itemsPerPage;
                }else{
                    $scope.params.currentPage=$scope.kqConf.currentPage;
                    $scope.params.pageSize=$scope.kqConf.itemsPerPage;
                }*/
                $scope.status?$scope.params.currentPage=$scope.wqConf.currentPage:$scope.params.currentPage=$scope.kqConf.currentPage;

                weaknessService.list($scope.status,$scope.params).
                    success(function(data, status, headers, config) {
                        if(data.resCode == '000'){
                            if($scope.status){
                                $scope.wqConf.totalItems = data.data.countSize;
                                $scope.wqList=data.data.list;
                            }else{
                                $scope.kqConf.totalItems = data.data.countSize;
                                $scope.kqList=data.data.list;
                            }
                        }else{
                            if($scope.status){
                                $scope.wqConf.totalItems = 0;
                                $scope.wqList={};
                            }else{
                                $scope.kqConf.totalItems = 0;
                                $scope.kqList={};
                            }
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {
                    });
            };

            //配置分页基本参数
            $scope.wqConf = {
                currentPage: 1,
                itemsPerPage:10,
                pagesLength: 9,
                // totalItems:10,
               // perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems',
            };

            //配置分页基本参数
            $scope.kqConf = {
                currentPage: 1,
                itemsPerPage:10,
                pagesLength: 9,
                // totalItems:10,
               // perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems',
            };

            /*当页码和页面记录数发生变化时监控后台查询*/
            $scope.$watch('kqConf.currentPage',function(newVal,oldVal){
                if(newVal != oldVal)
                    $scope.getWqList();
            });
            $scope.$watch('wqConf.currentPage ',function(newVal,oldVal){
                if(newVal != oldVal)
                    $scope.getWqList();
            });


            $scope.getStuList = function(type,questionId){
                $state.go('getStuList',{type:type,questionId:questionId,
                    areaCode:$scope.params.areaCode,subjectId:$scope.params.subjectId,
                    gradeId:$scope.params.gradeId,startTime:$scope.params.startTime,endTime:$scope.params.endTime});

            }

            $scope.shortPreview = function(questionId){ //题目预览
                previewService.preview(questionId).
                    success(function(data) {
                        if(data.resCode == '000'){
                            var tpl = document.querySelector('.popCont');
                            angular.element(tpl).html( data.data.content[0].content);
                            /*预览*/
                            $("#previewBox").dialog("open");
                        }else{
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {
                    });
            };

        }]);
});