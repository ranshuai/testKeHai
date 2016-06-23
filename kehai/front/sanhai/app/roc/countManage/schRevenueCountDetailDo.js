/**
 * Created by cc on 2016/3/30.
 */
define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {


    'use strict'; // 使用严格模式

    rocModule.controller('schRevenueCountDetailController', ['$scope', '$stateParams', 'schRevenueDetailService',
        function ($scope, $stateParams, schRevenueDetailService) {

            $scope.$parent.menuRevenueCount = true;
            $scope.ShowMode = "oneToOne";
            $scope.changeShow = changeShow;
            $scope.params = $stateParams; //查询的参数对象

            //配置分页基本参数
            $scope.oneToOneConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getDetailData
            };
            $scope.ptConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getDetailData
            };
            $scope.videoConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getDetailData
            };

            function changeShow(ShowMode) {
                $scope.ShowMode = ShowMode;
                switch (ShowMode) {
                    case "oneToOne":
                        if ($scope.oneToOneList) {
                            return;
                        }
                        break;
                    case "pt":
                        if ($scope.ptList) {
                            return;
                        }
                        break;
                    case "video":
                        if ($scope.videoList) {
                            return;
                        }
                        break;
                }
            }

            function getDetailData() {

                $scope.params.detailType = $scope.ShowMode;

                switch ($scope.ShowMode) {
                    case "oneToOne":
                        $scope.params.currentPage = $scope.oneToOneConf.currentPage;
                        break;
                    case "pt":
                        $scope.params.currentPage = $scope.ptConf.currentPage;
                        break;
                    case "video":
                        $scope.params.currentPage = $scope.videoConf.currentPage;
                        break;
                }

                schRevenueDetailService.list($scope.params)
                    .success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            switch ($scope.ShowMode) {
                                case "oneToOne":
                                    $scope.oneToOneConf.totalItems = data.data.countSize;
                                    $scope.oneToOneConf.itemsPerPage = data.data.pageSize;
                                    $scope.oneToOneList = data.data.list;
                                    break;
                                case "pt":
                                    $scope.ptConf.totalItems = data.data.countSize;
                                    $scope.ptConf.itemsPerPage = data.data.pageSize;
                                    $scope.ptList = data.data.list;
                                    break;
                                case "video":
                                    $scope.videoConf.totalItems = data.data.countSize;
                                    $scope.videoConf.itemsPerPage = data.data.pageSize;
                                    $scope.videoList = data.data.list;
                                    break;
                            }
                        } else {
                            dialogs._timer(data.resMsg, 2, 1, "");
                        }
                    }).
                    error(function (data, status, headers, config) {
                    });
            };

        }]);
});