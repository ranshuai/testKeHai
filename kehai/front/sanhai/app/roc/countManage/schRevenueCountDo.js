/**
 * Created by cc on 2016/3/30.
 */
define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {


    'use strict'; // 使用严格模式

    rocModule.controller('schRevenueCountController', ['$scope', 'getAreasService', '$filter',
        'getSchRevenueDataService', '$state',
        function ($scope, getAreasService, $filter, getSchRevenueDataService, $state) {

            $scope.$parent.menuRevenueCount = true;
            $scope.ShowMode = "onLineSchool";
            $scope.changeShow = changeShow;
            $scope.detailsView = detailsView;
            $scope.params = {};
            var onLineAreaArr, lineAreaArr;

            $scope.getDbList = function () {

                if ($scope.params.areaCode.length == 0) {
                    dialogs._timer("请选择查询区域", 2, 1, "");
                    return;
                }

                if (!$scope.params.queryTime) {
                    dialogs._timer("请选择查询时间段", 2, 1, "");
                    return;
                }

                if ($scope.ShowMode == "onLineSchool") {
                    $scope.paginationOnLine.currentPage == 1 ? getSchRevenueData() : $scope.paginationOnLine.currentPage = 1;
                } else {
                    $scope.paginationLine.currentPage == 1 ? getSchRevenueData() : $scope.paginationLine.currentPage = 1;
                }
            };


            //配置分页基本参数
            $scope.paginationOnLine = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                //  onChange: getSchRevenueData
            };

            $scope.paginationLine = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                // onChange: getDetailData
            };

            $scope.$watch('paginationOnLine.currentPage +" " + paginationLine.currentPage', function (newVal, oldVal) {
                if (newVal != oldVal)
                    getSchRevenueData();
            });

            getAreas(0);
            $scope.chkall = false;
            $scope.chkAll = function (checked) {
                angular.forEach($scope.areaArr, function (value, key) {
                    value.checked = checked;
                });
            };
            $scope.$watch('areaArr', function (nv, ov) {
                if (nv == ov) {
                    return;
                }
                $scope.params.areaCode = [];
                angular.forEach(
                    $filter('filter')(nv, {checked: true}), function (v) {
                        $scope.params.areaCode.push(v.code);
                    });
                $scope.chkall = $scope.params.areaCode.length == $scope.areaArr.length;
            }, true);

            function getAreas(status) {
                getAreasService.list(status). //推广区域加载
                    success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            $scope.areaArr = data.data.areas;

                            $scope.ShowMode == "onLineSchool" ? onLineAreaArr = $scope.areaArr : lineAreaArr = $scope.areaArr;

                            angular.forEach($scope.areaArr, function (value, key) {
                                value.checked = false;
                            });
                        } else if (data.resCode == '200') {
                            /**
                             * 2016-05-20 蒋淼
                             * 1、有登录超时 angular 的路由无法提示正确的页面 这里如果超时统一返回登录页面
                             * 2、只有右侧菜单采用这样的处理，单还是有问题户显示登录页面
                             */
                            window.location.href = '/login.htm';
                            window.location.reload();
                        } else {
                            dialogs._timer(data.resMsg, 2, 1, null);
                        }
                    }).error(function (data, status, headers, config) {

                    });
            }

            function changeShow(ShowMode) {
                $scope.ShowMode = ShowMode;

                if ($scope.ShowMode == "onLineSchool") {
                    $scope.areaArr = onLineAreaArr;
                } else {
                    if (lineAreaArr) {
                        $scope.areaArr = lineAreaArr;
                    } else {
                        getAreas(1);
                    }
                }
                $scope.params.queryTime = null;
                $scope.onLineRevenueData = null;
                $scope.paginationOnLine.totalItems = 0;
                $scope.lineRevenueData = null;
                $scope.paginationLine.totalItems = 0;
                // getSchRevenueData();
            }

            function getSchRevenueData() {

                $scope.params.countType = $scope.ShowMode;
                $scope.ShowMode == "onLineSchool" ? $scope.params.currentPage = $scope.paginationOnLine.currentPage : $scope.params.currentPage = $scope.paginationLine.currentPage;

                getSchRevenueDataService.list($scope.params)
                    .success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            if ($scope.ShowMode == "onLineSchool") {
                                $scope.paginationOnLine.totalItems = data.data.countSize;
                                $scope.paginationOnLine.itemsPerPage = data.data.pageSize;
                                $scope.onLineRevenueData = data.data.list;
                            } else {
                                $scope.paginationLine.totalItems = data.data.countSize;
                                $scope.paginationLine.itemsPerPage = data.data.pageSize;
                                $scope.lineRevenueData = data.data.list;
                            }
                        } else {
                            dialogs._timer(data.resMsg, 2, 1, "");
                        }
                    })
                    .error(function (data, status, headers, config) {
                    });
            }

            function detailsView(schoolId) {
                $state.go('schRevenueCountDetail', {schoolId: schoolId, queryTime: $scope.params.queryTime});
            }
        }]);
});