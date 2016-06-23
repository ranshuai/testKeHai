define(['app/roc/rocModule', 'module/knowledgePoint', 'dialogs'], function (rocModule, knowledgePoint, dialogs) {
    'use strict'; // 使用严格模式


    rocModule.controller("rocPushByQuestionController", ['$scope', '$filter', '$stateParams', '$http',
        'loadAreasService', 'selectPtCourseEntityByIdService', 'getStuListService',
        function ($scope, $filter, $stateParams, $http, loadAreasService,
                  selectPtCourseEntityByIdService, getStuListService) {

            /*题目展示区域定位至最顶部*/
            var ssvTop = $('.subjectShowView').offset().top;
            $(window).scroll(function () {

                if ($(window).scrollTop() >= ssvTop) {
                    $('.subjectShowView').addClass('ssvFixed');
                } else {
                    $('.subjectShowView').removeClass('ssvFixed');
                }

            });

            $scope.$parent.menuPt = true; //菜单高亮
            $scope.params = {}//查询参数

            loadAreasService.list(). //推广区域加载
                success(function (data, status, headers, config) {
                    if (data.resCode == '000') {
                        $scope.areas = data.data.areas;
                        angular.forEach($scope.areas, function (value, key) {
                            value.checked = false;
                        });
                    } else {
                        dialogs._alert(data.resMsg);
                    }
                }).
                error(function (data, status, headers, config) {
                });

            $scope.chAll = false;
            $scope.chkAll = function (checked) {
                angular.forEach($scope.areas, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('areas', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.params.areaCode = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.params.areaCode.push(v.code);
                    });
                $scope.chAll = $scope.params.areaCode.length == $scope.areas.length;
            }, true);

            $scope.params.endTime = function () {
                var oDate = new Date();
                return $filter('date')(oDate.setDate(oDate.getDate() - 1), 'yyyy-MM-dd');
            }(); //结束时间

            $scope.params.startTime = $scope.params.endTime;

            $scope.time = 1;
            $scope.emText = "最近一天";
            $scope.change = function (x) {
                switch (x) {
                    case '1':
                        $scope.emText = "最近一天";
                        break;
                    case '3':
                        $scope.emText = "最近三天";
                        break;
                    case '7':
                        $scope.emText = "最近一周";
                        break;
                }

                var oDate = new Date();
                $scope.params.startTime = $filter('date')(oDate.setDate(oDate.getDate() - x), 'yyyy-MM-dd');
            };

            //根据旁听课程Id查询旁听课程
            selectPtCourseEntityByIdService.list({ptCourseId: $stateParams.ptId}).
                success(function (data, status, headers, config) {
                    if (data.resCode == '000') {
                        $scope.ptCourse = data.data;

                        /**
                         * 2016-05-18 蒋淼修改
                         * 1、这里的题目ID默认首尾都有,也就是,100001,所以这直接截取会有问题
                         * 2、清除带首尾的,然后在截取
                         * 3、这里不能截取末尾的,因为如果截取了split(",")无法再生成数组，页面的循环也无法执行，所以这里保留末尾的,
                         */

                        var questionIds = $scope.ptCourse.topics;
                        if (questionIds.startsWith(","))
                            questionIds = questionIds.substr(1, questionIds.length);

                        //$scope.topics = $scope.ptCourse.topics.split(",");
                        $scope.topics = questionIds.split(",");
                        $scope.topics.pop();
                        $scope.konwledges = knowledgePoint.getKnowledgePointList($scope.ptCourse.knowledgePoints);//课程关联的知识点
                        $scope.params.questionId = $scope.topics.length > 0 ? $scope.topics[0] : '0';//当前选中的题目ID //

                    } else {
                        dialogs._alert(data.resMsg);
                    }
                }).
                error(function (data, status, headers, config) {
                });

            //切换 tab
            $scope.switchStudentList = function (questionId) {

                /**
                 * 2016-05-18 蒋淼修改 判断是否选择了区域否则不查询
                 */
                if (0 == $scope.params.areaCode.length) {
                    dialogs._timer("请选择对应区域", 2, 2, null);
                } else {
                    $scope.params.questionId = questionId;
                    $scope.getStuList();
                }
            };

            $scope.getStuList = function () {

                $scope.params.currentPage = $scope.pageBar.currentPage;
                $scope.params.pageSize = $scope.pageBar.itemsPerPage;
                $scope.params.type = "wq";

                $scope.params.subjectId = "";
                $scope.params.gradeId = "";

                getStuListService.list($scope.params).
                    success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            $scope.pageBar.totalItems = data.data.countSize;
                            $scope.studentData = data.data.list;
                            angular.forEach($scope.studentData, function (value, key) {
                                value.checked = false;
                            });
                        } else {
                            $scope.studentData = {};
                            $scope.pageBar.totalItems = 0;
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function (data, status, headers, config) {

                    });
            };

            //选择要推送的学生
            $scope.stuAll = false;
            $scope.stuPushAll = function (checked) {
                angular.forEach($scope.studentData, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('studentData', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.userIds = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.userIds.push(v.userId + '#' + v.trueName + '#' + v.areaName + ' '
                            + $filter('gradeName')(v.gradeId) + ' ' + v.schoolName);
                    });
                $scope.stuAll = $scope.studentData.length == $scope.userIds.length;
            }, true);

            //点击添加
            $scope.addStudentList = function () {
                if ($scope.userIds == null || $scope.userIds.length == 0) {
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
                            dialogs._timer('添加失败：' + res.resMsg, 2, 1);
                            return;
                        }
                        $scope.getStuList();
                        dialogs._timer('添加成功', 1, 1);
                    })
                    .error();
            };

            //配置分页基本参数
            $scope.pageBar = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 7,
                // totalItems: 0,
                isPerPageOptions: true,
                //   perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems'
            };

            /*当页码和页面记录数发生变化时监控后台查询*/
            $scope.$watch('pageBar.currentPage +"  "+ pageBar.itemsPerPage', function (newVal, oldVal) {
                if (newVal != oldVal)
                    $scope.getStuList();
            });

        }]);
});