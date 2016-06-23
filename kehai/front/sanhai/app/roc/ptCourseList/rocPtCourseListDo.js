define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {

    'use strict'; // 使用严格模式

    rocModule.controller("rocPtCourseController", ['$scope', "$filter", '$http',
        'subjects', 'grades', 'pushService', '$state',
        function ($scope, $filter, $http, subjects, grades, pushService, $state) {
            $scope.$parent.menuPt = true; //菜单高亮
            $scope.status = 0;
            $scope.noPushTab = true;//“未推送”tab
            $scope.waitPushTab = false;//“待推送”tab
            $scope.finishPushTab = false;//"已经推送"tab
            $scope.countSize = 0;//共多少记录

            $scope.isTab = false;//切换tab的时候不触发科目和年级的刷新事件

            $scope.params = {}; //按科目和年级查询参数对象
            $scope.subjects = angular.fromJson(subjects); //科目数据
            $scope.grades = angular.fromJson(grades);  //年级数据

            $scope.chkAll = function (checked, f) {
                if (f == 0) {
                    angular.forEach($scope.subjects, function (value, key) {
                        value.checked = checked;
                    });
                } else {
                    angular.forEach($scope.grades, function (value, key) {
                        value.checked = checked;
                    });
                }
            };
            $scope.$watch('subjects', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.params.subjectId = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.params.subjectId.push(v.code);
                    });

                $scope.subjectsTab ? $scope.subjectsTab = false : changeTab();

            }, true);
            $scope.$watch('grades', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.params.gradeId = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.params.gradeId.push(v.code);
                    });

                $scope.gradesTab ? $scope.gradesTab = false : changeTab();
            }, true);

            $scope.seachKey = ""; //按节次查询输入条件

            //搜索按钮事件
            $scope.searchPtCoruse = function () {
                $scope.params.courseName = $scope.seachKey;

                changeTab();
            };

            function changeTab() {
                if ($scope.noPushTab) {
                    $scope.noPushConf.currentPage == 1 ? $scope.getPushList() : $scope.noPushConf.currentPage = 1;
                }
                if ($scope.waitPushTab) {
                    $scope.waitPushConf.currentPage == 1 ? $scope.getPushList() : $scope.waitPushConf.currentPage = 1;
                }
                if ($scope.finishPushTab) {
                    $scope.finishPushConf.currentPage == 1 ? $scope.getPushList() : $scope.finishPushConf.currentPage = 1;
                }
            }

            //切换Tab
            $scope.switchTab = function (t) {
                if ($scope.isTab) {
                    $scope.subjectsTab = true;//切换tab的时候不触发科目和年级的刷新事件
                    $scope.gradesTab = true;
                } else {
                    $scope.isTab = true;
                }

                angular.forEach($scope.subjects, function (value, key) {
                    value.checked = false;
                });
                angular.forEach($scope.grades, function (value, key) {
                    value.checked = false;
                });

                $scope.seachKey = "";
                $scope.subAll = false;
                $scope.graAll = false;
                $scope.params = {};
                switch (t) {
                    case 0:
                        $scope.noPushTab = true;
                        $scope.waitPushTab = false;
                        $scope.finishPushTab = false;
                        $scope.status = 0;
                        /* if(!$scope.noPushData){
                         $scope.getPushList();
                         }*/
                        break;
                    case 1:
                        $scope.noPushTab = false;
                        $scope.waitPushTab = true;
                        $scope.finishPushTab = false;
                        $scope.status = 1;
                        /* if(!$scope.waitPushData){
                         $scope.getPushList();
                         }*/
                        break;
                    case 2:
                        $scope.noPushTab = false;
                        $scope.waitPushTab = false;
                        $scope.finishPushTab = true;
                        $scope.status = 2;
                        /*if(!$scope.finishPushData){
                         $scope.getPushList();
                         }*/
                        break;
                }
                // $scope.getPushList();
                changeTab();
            };

            //未推广分页配置
            $scope.noPushConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                // totalItems:10,
                // isPerPageOptions: true,
                rememberPerPage: 'perPageItems'
            };
            //待推广分页配置
            $scope.waitPushConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                // totalItems:10,
                // perPageOptions: [10],
                rememberPerPage: 'perPageItems'
            };
            //已推广分页配置
            $scope.finishPushConf = {
                currentPage: 1,
                itemsPerPage: 10,
                pagesLength: 9,
                // totalItems:10,
                perPageOptions: [10],
                rememberPerPage: 'perPageItems'
            };

            /*当页码和页面记录数发生变化时监控后台查询,配置change()方法在查询的时候会调用两次*/
            $scope.$watch('noPushConf.currentPage',
                function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.getPushList();
                    }
                });
            $scope.$watch('waitPushConf.currentPage',
                function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.getPushList();
                    }
                });
            $scope.$watch('finishPushConf.currentPage',
                function (newVal, oldVal) {
                    if (newVal != oldVal) {
                        $scope.getPushList();
                    }
                });

            $scope.getPushList = function () {

                if ($scope.noPushTab) {
                    $scope.params.currPage = $scope.noPushConf.currentPage;
                } else if ($scope.waitPushTab) {
                    $scope.params.currPage = $scope.waitPushConf.currentPage;
                } else if ($scope.finishPushTab) {
                    $scope.params.currPage = $scope.finishPushConf.currentPage;
                }

                pushService.list($scope.status, $scope.params).
                    success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            $scope.countSize = data.data.countSize;
                            if ($scope.status == 0) {
                                $scope.noPushConf.totalItems = data.data.countSize;
                                $scope.noPushData = data.data.list;
                            } else if ($scope.status == 1) {
                                $scope.waitPushConf.totalItems = data.data.countSize;
                                $scope.waitPushData = data.data.list;
                                angular.forEach($scope.waitPushData, function (value, key) {
                                    value['checked'] = false;
                                });
                            } else if ($scope.status == 2) {
                                $scope.finishPushConf.totalItems = data.data.countSize;
                                $scope.finishPushData = data.data.list;
                            }
                        } else {
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function (data, status, headers, config) {
                        alert("aaaaaaaaaaaaaaa");
                    });
            };

            //推送类型
            $scope.pushType = function (type) {
                switch (type) {
                    case "0":
                        return "按题目";
                    case "1":
                        return "按知识点";
                    case "2":
                        return "区域普推";
                }
            };

            /*-------------------待推广-------------------------------*/

            $scope.pushAll = function (checked) {
                angular.forEach($scope.waitPushData, function (value, key) {
                    value.checked = checked;
                });
            };

            $scope.$watch('waitPushData', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.params.ptIds = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.params.ptIds.push(v.ptId);
                    });
            }, true);

            $scope.pushClick = function () {
                if ($scope.params.ptIds == null || $scope.params.ptIds.length == 0) {
                    dialogs._alert("请选择要推广的课程");
                    return;
                }
                $http.get("/roc/ptcourse/push2bh.do", {params: $scope.params}).
                    success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            dialogs._timer("推送成功", 1, 2, "");
                            $scope.getPushList();
                        } else {
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });

            };

            $scope.delPushClick = function () {
                if ($scope.params.ptIds == null || $scope.params.ptIds.length == 0) {
                    dialogs._alert("请选择要删除的学生");
                    return;
                }
                $http.get("/roc/delRecord.do", {params: $scope.params}).
                    success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            dialogs._timer("删除成功", 1, 2);
                            $scope.getPushList();
                        } else {
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });

            };

            /*    $scope.cDetails= function(ptId){
             $state.go('pushStuDetails', {ptId: ptId});
             };
             */
            /*--------------------------------------------------*/

            //点击推广连接的时候
            $scope.pushOnClick = function (ptId, pushType) {
                if (pushType == 1) {
                    $state.go('rocPushByKnowledge', {ptId: ptId});
                } else if (pushType == 2) {
                    $state.go('rocPushByAll', {ptId: ptId});
                } else if (pushType == 0) {
                    $state.go('rocPushByQuestion', {ptId: ptId});
                }
            };
        }]);


});