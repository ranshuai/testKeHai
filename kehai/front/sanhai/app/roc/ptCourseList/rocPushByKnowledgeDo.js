
define(['app/roc/rocModule','module/knowledgePoint','jquery','dialogs','base'], function (rocModule,knowledgePoint,$,dialogs) {
    'use strict'; // 使用严格模式

    rocModule.controller("rocPushByKnoController", ['$scope','$filter','$stateParams','$http',
        'loadAreasService','selectPtCourseEntityByIdService','getStuListService',
        function ($scope,$filter,$stateParams,$http,loadAreasService,
                  selectPtCourseEntityByIdService,getStuListService) {

            /*题目展示区域定位至最顶部*/
            var ssvTop=$('.subjectShowView').offset().top;
            $(window).scroll(function () {

                if($(window).scrollTop()>=ssvTop){
                    $('.subjectShowView').addClass('ssvFixed');
                }else{
                    $('.subjectShowView').removeClass('ssvFixed');
                }

            });

            $scope.$parent.menuPt=true; //菜单高亮
            $scope.params ={}//查询参数

            loadAreasService.list(). //推广区域加载
                success(function(data, status, headers, config) {
                    if(data.resCode == '000'){
                        $scope.areas=data.data.areas;
                        angular.forEach($scope.areas, function (value, key) {
                            value.checked = false;
                        });
                    }else{
                        dialogs._alert(data.resMsg);
                    }
                }).
                error(function(data, status, headers, config) {
                });

            $scope.chAll = false;
            $scope.chkAll = function(checked) {
                angular.forEach($scope.areas, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('areas', function(nv, ov){
                if(nv == ov){return;}
                $scope.params.areaCode = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function(v) {
                        $scope.params.areaCode.push(v.code);
                    });
                $scope.chAll = $scope.params.areaCode.length == $scope.areas.length;
            }, true);

            $scope.params.endTime = function(){
                var oDate=new Date();
                return $filter('date')( oDate.setDate(oDate.getDate()-1),'yyyy-MM-dd');
            }(); //结束时间

            $scope.params.startTime = function(){
                var oDate=new Date();
                return $filter('date')( oDate.   setMonth(oDate.getMonth()-1),'yyyy-MM-dd');
            }(); //默认开始时间

            $scope.time = 1;
            $scope.emText="一个月";
            $scope.change = function(x){
                switch(x){
                    case '1': $scope.emText="一个月";break;
                    case '2': $scope.emText="两个月";break;
                    case '4': $scope.emText="四个月";break;
                }

                var oDate=new Date();
                $scope.params.startTime=$filter('date')(oDate.setMonth(oDate.getMonth()-x),'yyyy-MM-dd');
            };

            //根据旁听课程Id查询旁听课程
            selectPtCourseEntityByIdService.list({ptCourseId:$stateParams.ptId}).
                success(function(data, status, headers, config) {
                    if(data.resCode == '000'){
                        $scope.ptCourse=data.data;
                        $scope.konwledges=knowledgePoint.getKnowledgePointList($scope.ptCourse.knowledgePoints);//课程关联的知识点

                        $scope.params.questionId=($scope.konwledges.length > 0 ? $scope.konwledges[0].code : 0);//当前选中的题目ID //

                    }else{
                        dialogs._alert(data.resMsg);
                    }
                }).
                error(function(data, status, headers, config) {

                });

            //切换知识点名单
            $scope.switchStudentList = function (kid) {
                $scope.params.questionId = kid;
                //切换知识点的时候要把当前页置为第一页
                $scope.pageBar.currentPage == 1?$scope.getStuList():$scope.pageBar.currentPage=1;
            };

            $scope.getStuList = function (){

                if($scope.params.areaCode.length == 0){
                    dialogs._alert("请选择区域");
                    $scope.studentData={};
                    $scope.pageBar.totalItems = 0;
                    return;
                }


                $scope.params.currentPage=$scope.pageBar.currentPage;

                $scope.params.pageSize=$scope.pageBar.itemsPerPage;
                $scope.params.type="kq";

                $scope.params.subjectId="";
                $scope.params.gradeId="";

                getStuListService.list($scope.params).
                    success(function(data, status, headers, config) {
                        if(data.resCode == '000'){
                            $scope.pageBar.totalItems = data.data.countSize;
                            $scope.studentData=data.data.list;
                            angular.forEach($scope.studentData, function (value, key) {
                                value.checked = false;
                            });
                        }else{
                            $scope.studentData={};
                            $scope.pageBar.totalItems = 0;
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {

                    });
            };

            //选择要推送的学生
            $scope.stuAll = false;
            $scope.stuPushAll = function(checked) {
                angular.forEach($scope.studentData, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('studentData', function(nv, ov){
                if(nv == ov){return;}
                $scope.userIds = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function(v) {
                        $scope.userIds.push(v.userId+'#'+ v.trueName+'#'+ v.areaName+' '
                            +$filter('gradeName')(v.gradeId)+' '+ v.schoolName);
                    });
                $scope.stuAll = $scope.studentData.length == $scope.userIds.length;
            }, true);

            //点击添加
            $scope.addStudentList = function () {
                if($scope.userIds == null || $scope.userIds.length==0){
                    dialogs._alert("请选择要添加的学生");
                    return;
                }
                $http.post('/roc/addPushRecordBath.do', {
                    userIds: $scope.userIds.toString(),
                    ptId: $scope.ptCourse.ptId,
                    kpIds: $scope.ptCourse.knowledgePoints,
                    topics: $scope.ptCourse.topics
                })
                .success(function (res) {
                    if (res.resCode != '000') {
                        dialogs._timer('添加失败：' + res.resMsg,2,1);
                        return;
                    }
                    $scope.getStuList();
                    dialogs._timer('添加成功',1,2,"");
                })
                .error();
             };

            //配置分页基本参数
            $scope.pageBar = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 7,
             //   totalItems: 0,
                isPerPageOptions: true,
              //  perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems'
            };

            /*当页码和页面记录数发生变化时监控后台查询,中间不加"  " 会加载2次 第二次的时候会进行加法运算*/
            $scope.$watch('pageBar.currentPage +"  "+ pageBar.itemsPerPage',function(newVal,oldVal){
                if(newVal!=oldVal)
                    $scope.getStuList();
            });

        }]);

});