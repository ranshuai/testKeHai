/**
 * Created by cc on 2016/3/30.
 */
define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {


    'use strict'; // 使用严格模式

    rocModule.controller('countManageController', ['$scope', 'getCountIncomeService', '$state',
        function ($scope, getCountIncomeService, $state) {

            $scope.$parent.menuCount = true;
            $scope.ShowMode = "listenCard";
            $scope.changeShow = changeShow;
            $scope.detailsView = detailsView;
            $scope.params = {};

            changeShow($scope.ShowMode);

            function changeShow(ShowMode) {
                $scope.ShowMode = ShowMode;
                $scope.params.countType = ShowMode;
                switch (ShowMode) {
                    case "listenCard":
                        if ($scope.listenCardList) {
                            return;
                        }
                        break;
                    case "ptBill":
                        if ($scope.ptBillList) {
                            return;
                        }
                        break;
                    case "useCost":
                        if ($scope.useCostList) {
                            return;
                        }
                        break;
                    case "ptSeat":
                        if ($scope.ptSeatList) {
                            return;
                        }
                        break;
                }

                getCountIncomeService.list($scope.params)
                    .success(function (data, status, headers, config) {
                        if (data.resCode == '000') {
                            switch (ShowMode) {
                                case "listenCard":
                                    $scope.listenCardList = data.data.list;
                                    break;
                                case "ptBill":
                                    $scope.ptBillList = data.data.list;
                                    break;
                                case "useCost":
                                    $scope.useCostList = data.data.list;
                                    break;
                                /*
                                 * ----------------------------------------------------------------------------------
                                 * 2016-04-29 蒋淼修改
                                 * 1、新增 ptSeat 旁听坐席类型
                                 * 2、这里讲HTTP请求返回数据复制到页面的变量
                                 * ----------------------------------------------------------------------------------
                                 */
                                case "ptSeat":
                                    $scope.ptSeatList = data.data.ptSeatData;
                                    break;
                            }
                        } else if (data.resCode == '200') {
                            /**
                             * 2016-05-20 蒋淼
                             * 1、有登录超时 angular 的路由无法提示正确的页面 这里如果超时统一返回登录页面
                             * 2、只有右侧菜单采用这样的处理，本质是右侧菜单第一个请求的方法判读是否返回了登录超时
                             */
                            window.location.href = '/login.htm';
                            window.location.reload();
                        } else {
                            dialogs._timer(data.resMsg, 2, 1, "");
                        }
                    }).error(function (data, status, headers, config) {
                    });
            }

            function detailsView(month, year) {
                switch ($scope.ShowMode) {
                    case "listenCard":
                        $state.go('listenCardDetail', {month: month});
                        break;
                    case "ptBill":
                        $state.go('ptCountDetail', {month: month});
                        break;
                    case "useCost":
                        $state.go('useCostCountDetail', {month: month});
                        break;
                    case "ptSeat":
                        $state.go('ptSeatDetail', {month: month, year: year});
                        break;
                }
            }
        }]);
});