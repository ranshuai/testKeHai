define(['app/roc/rocModule','dialogs'], function(rocModule,dialogs) {

    rocModule.controller('getStuListController',['$scope','getStuListService','$stateParams',
        function($scope,getStuListService,$stateParams){

            $scope.$parent.menuDb=true; //菜单高亮
            $scope.params = $stateParams; //查询的参数对象

            //配置分页基本参数
            $scope.paginationConf = {
                currentPage: 1,
               // itemsPerPage:10,
                pagesLength: 15,
                // totalItems:10,
                //perPageOptions: [10, 20, 30, 40, 50],
                rememberPerPage: 'perPageItems',
                onChange: function(){$scope.getStuList()}
            };
            $scope.getStuList = function (){
                $scope.params.currentPage=$scope.paginationConf.currentPage;
                getStuListService.list($scope.params).
                    success(function(data, status, headers, config) {
                        if(data.resCode == '000'){
                            $scope.paginationConf.totalItems = data.data.countSize;
                            $scope.list=data.data.list;
                        }else{
                            dialogs._alert(data.resMsg);
                        }
                    }).
                    error(function(data, status, headers, config) {
                    });
            };

        }]);
});