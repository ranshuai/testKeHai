/**
 * Created by cc on 2016/3/30.
 */
define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {


    'use strict'; // 使用严格模式

    rocModule.controller('listenCardDetailController', ['$scope', 'getListenCardDetailService','$stateParams',
        function ($scope, getListenCardDetailService,$stateParams) {

            $scope.$parent.menuCount = true;
            $scope.ShowMode = "buyListenCard";
            $scope.changeShow = changeShow;
            $scope.params = $stateParams;

            console.log($scope.params);

            //配置分页基本参数
            $scope.buyListenCardConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getListenCardDetailData
            };
            $scope.actionListenCardConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getListenCardDetailData
            };

            function changeShow(ShowMode) {
                $scope.ShowMode = ShowMode;
                $scope.params.countType = ShowMode;
                switch (ShowMode){
                    case "buyListenCard":
                        if($scope.buyListenCardList){
                            return;
                        }
                        break;
                    case "actionListenCard":
                        if($scope.actionListenCardList){
                            return;
                        }
                        break;
                }
            }

            function getListenCardDetailData(){
                switch ($scope.ShowMode){
                    case "buyListenCard":
                        $scope.params.currentPage=$scope.buyListenCardConf.currentPage;
                        break;
                    case "actionListenCard":
                        $scope.params.currentPage=$scope.actionListenCardConf.currentPage;
                        break;
                }
                $scope.params.countType = $scope.ShowMode;
                getListenCardDetailService.list($scope.params).
                    success(function(data, status, headers, config) {
                        if(data.resCode == '000'){

                            switch ($scope.ShowMode){
                                case "buyListenCard":
                                    $scope.buyListenCardConf.totalItems = data.data.countSize;
                                    $scope.buyListenCardConf.itemsPerPage=data.data.pageSize;
                                    $scope.buyListenCardList=data.data.list;
                                    break;
                                case "actionListenCard":
                                    $scope.actionListenCardConf.totalItems = data.data.countSize;
                                    $scope.actionListenCardConf.itemsPerPage=data.data.pageSize;
                                    $scope.actionListenCardList=data.data.list;
                                    break;
                            }
                        }else{
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {
                    });
            }

        }]);
});