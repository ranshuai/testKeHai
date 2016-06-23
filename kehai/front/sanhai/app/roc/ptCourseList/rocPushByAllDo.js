define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {

    'use strict'; // 使用严格模式

    rocModule.controller("rocPushByAllController", ['$scope', '$filter', '$http', 'grades', 'loadAreasService',
        'selectPtCourseEntityByIdService', '$stateParams',
        function ($scope, $filter, $http, grades, loadAreasService, selectPtCourseEntityByIdService, $stateParams) {

            $scope.$parent.menuPt = true; //菜单高亮
            $scope.params = {}//查询参数

            $scope.grades = angular.fromJson(grades);

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

            //加载
            $scope.loadStudentList = function () {
                $scope.params.currentPage = $scope.pageBar.currentPage;
                $scope.params.pageSize = $scope.pageBar.itemsPerPage;
                $http.get('/weakness/getStuByAll.do', {params: $scope.params}).
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

            //根据旁听课程Id查询旁听课程
            selectPtCourseEntityByIdService.list({ptCourseId: $stateParams.ptId}).
                success(function (data, status, headers, config) {
                    if (data.resCode == '000') {
                        $scope.ptCourse = data.data;
                    } else {
                        dialogs._alert(data.resMsg);
                    }
                }).
                error(function (data, status, headers, config) {
                });


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
                        $scope.loadStudentList();
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
                //  perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems',
            };

            /*当页码和页面记录数发生变化时监控后台查询*/
            $scope.$watch('pageBar.currentPage +"  "+ pageBar.itemsPerPage', function (newVal, oldVal) {
                if (newVal != oldVal)
                    $scope.loadStudentList();
            });
        }]);
});