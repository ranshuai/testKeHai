/**
 * Created by cc on 2016/3/30.
 */
define(['app/roc/rocModule', 'dialogs'], function (rocModule, dialogs) {


    'use strict'; // 使用严格模式

    rocModule.controller('useCostCountDetailController', ['$scope', 'getUseCostCountDetailDataService','$stateParams',
        function ($scope, getDetailDataService,$stateParams) {

            $scope.$parent.menuCount = true;
          //  $scope.getDetailData = getDetailData;
            $scope.params = $stateParams; //查询的参数对象

            //配置分页基本参数
            $scope.paginationConf = {
                currentPage: 1,
                pagesLength: 9,
                rememberPerPage: 'perPageItems',
                onChange: getDetailData
            };

            function getDetailData(){
                $scope.params.currentPage=$scope.paginationConf.currentPage;
                getDetailDataService.list($scope.params).
                    success(function(data, status, headers, config) {
                        if(data.resCode == '000'){
                            $scope.paginationConf.totalItems = data.data.countSize;
                            $scope.paginationConf.itemsPerPage=data.data.pageSize;
                            $scope.useCostCountDetailData=data.data.list;
                        }else{
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {
                    });
            };

        }]);
});