define(["rocApp"], function (app) {

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider) {

            $stateProvider
                .state('weakness', { //查看短板
                    url: '/weakness',
                    templateUrl: '/weakness/weaknessPage.htm',
                    controller: 'weaknessController'
                })
                .state("weakness.getWqList", { //查看短板-按错题
                    url: "/getWqList",
                    templateUrl: 'getWqList.html',
                    controller: ["$scope", function ($scope) {
                        $scope.$parent.status = true;
                        $scope.$parent.wqTime = 1;
                        $scope.$parent.emText = "最近一天";
                        $scope.$parent.params.subjectId = "";
                        $scope.$parent.params.gradeId = "";
                        $scope.$parent.chkAll(false);
                        $scope.$parent.change($scope.$parent.wqTime);

                        $scope.$parent.wqConf.totalItems = 0;
                        $scope.$parent.wqList = {};

                    }]
                })
                .state("weakness.getKpList", { //查看短板-按知识点
                    url: "/getKpList",
                    templateUrl: 'getKpList.html',
                    controller: ["$scope", function ($scope) {
                        $scope.$parent.status = false;
                        $scope.$parent.chkAll(false);
                        $scope.$parent.params.subjectId = "";
                        $scope.$parent.params.gradeId = "";
                        $scope.$parent.kqTime = 1;
                        $scope.$parent.emText1 = "一个月";
                        $scope.$parent.change($scope.$parent.kqTime);

                        $scope.$parent.kqConf.totalItems = 0;
                        $scope.$parent.kqList = {};
                    }]
                })
                .state('getStuList', { //查看短板-查看（错题，知识点）的学生名单
                    url: '/getStuList?type&questionId&areaCode&subjectId&gradeId&startTime&endTime',
                    templateUrl: '/weakness/getStuList.htm',
                    controller: 'getStuListController'
                })
                .state('ptCourseList', { //旁听列表
                    url: '/ptCourseList',
                    templateUrl: '/roc/ptCourseList.htm',
                    controller: 'rocPtCourseController'
                })
                .state("ptCourseList.noPushTab", { //旁听列表-未推广
                    url: "/noPushTab",
                    templateUrl: 'noPushTab.html',
                    controller: ["$scope", function ($scope) {
                        $scope.$parent.switchTab(0);
                    }]
                })
                .state("ptCourseList.waitPushTab", { //旁听列表-待推广
                    url: "/waitPushTab",
                    templateUrl: 'waitPushTab.html',
                    controller: ["$scope", function ($scope) {
                        $scope.$parent.switchTab(1);
                    }]
                })
                .state("ptCourseList.finishPushTab", { //旁听列表-已推广
                    url: "/finishPushTab",
                    templateUrl: 'finishPushTab.html',
                    controller: ["$scope", function ($scope) {
                        $scope.$parent.switchTab(2);
                    }]
                })
                .state("rocPushByKnowledge", { //加载按知识点找 推广名单 推送的界面
                    url: "/rocPushByKnowledge/:ptId",
                    templateUrl: function ($routeParams) {
                        return '/roc/rocPushByKnowledge/' + $routeParams.ptId + '.htm'
                    },
                    controller: 'rocPushByKnoController'
                })
                .state("rocPushByAll", { //加载“普推”找 推广名单 界面
                    url: "/rocPushByAll/:ptId",
                    templateUrl: function ($routeParams) {
                        return '/roc/rocPushByAll/' + $routeParams.ptId + '.htm'
                    },
                    controller: 'rocPushByAllController'
                })
                .state("rocPushByQuestion", { //加载按错题找 推广名单 界面
                    url: "/rocPushByQuestion/:ptId",
                    templateUrl: function ($routeParams) {
                        return '/roc/rocPushByQuestion/' + $routeParams.ptId + '.htm'
                    },
                    controller: 'rocPushByQuestionController'
                })

                .state("pushStuDetails", { //加载按知识点找 推广名单 推送的界面
                    url: "/pushStuDetails/:ptId",
                    templateUrl: "pushStuDetails.html",
                    controller: ["$scope", "$stateParams", "getPushStuDetails", function ($scope, $stateParams, getPushStuDetails) {
                        $scope.$parent.menuPt = true; //菜单高亮
                        $scope.params = $stateParams; //查询的参数对象
                        //配置分页基本参数
                        $scope.paginationConf = {
                            currentPage: 1,
                            pagesLength: 9,
                            rememberPerPage: 'perPageItems',
                            onChange: function () {
                                $scope.pushStuDetails()
                            }
                        };

                        $scope.pushStuDetails = function () {
                            $scope.params.currentPage = $scope.paginationConf.currentPage;
                            getPushStuDetails.list($scope.params).
                                success(function (data, status, headers, config) {
                                    if (data.resCode == '000') {
                                        $scope.paginationConf.totalItems = data.data.countSize;
                                        $scope.list = data.data.list;
                                    } else {
                                        _alert(data.resMsg);
                                    }
                                }).
                                error(function (data, status, headers, config) {
                                });
                        };
                    }]
                })
                .state('countManage', { //收入统计
                    url: '/countManage',
                    templateUrl: '/countManage/countManage.htm',
                    controller: 'countManageController'
                })
                .state('listenCardDetail', {
                    url: '/listenCardDetail/:month',
                    templateUrl: '/countManage/listenCardDetail.htm',
                    controller: 'listenCardDetailController'
                })
                .state('ptCountDetail', {
                    url: '/ptCountDetail/:month',
                    templateUrl: '/countManage/ptCountDetail.htm',
                    controller: 'ptCountDetailController'
                })
            /**
             * ---------------------------------------------------------------------------------------------
             * 2016-05-04 蒋淼修改 旁听席位详细信息
             * url
             * templateUrl  真实请求Controller地址
             * controller   页面关联controller
             * ---------------------------------------------------------------------------------------------
             */
                .state('ptSeatDetail', {
                    url: '/ptSeatDetail/:month,:year',
                    templateUrl: '/countManage/ptSeatDetail.htm',
                    controller: 'ptSeatDetailController'
                })
                .state('useCostCountDetail', {
                    url: '/useCostCountDetail/:month',
                    templateUrl: '/countManage/useCostCountDetail.htm',
                    controller: 'useCostCountDetailController'
                })
                .state('schRevenueCount', { //学校营收统计
                    url: '/schRevenueCount',
                    templateUrl: '/countManage/schRevenueCount.htm',
                    controller: 'schRevenueCountController',
                })
                .state('schRevenueCountDetail', { //学校营收统计
                    url: '/schRevenueCountDetail/:schoolId/:queryTime',
                    templateUrl: '/countManage/schRevenueCountDetail.htm',
                    controller: 'schRevenueCountDetailController'
                })

            $urlRouterProvider.otherwise('/weakness/getWqList');

            // Initialize get if not there
            if (!$httpProvider.defaults.headers.get) {
                $httpProvider.defaults.headers.get = {};
            }
            // Enables Request.IsAjaxRequest() in ASP.NET MVC
            $httpProvider.defaults.headers.common["X-Requested-With"] = 'XMLHttpRequest';
            // Disable IE ajax request caching
            $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
            $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';


            $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
            $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

            // Override $http service's default transformRequest
            $httpProvider.defaults.transformRequest = [function (data) {
                /**
                 * The workhorse; converts an object to x-www-form-urlencoded serialization.
                 * @param {Object} obj
                 * @return {String}
                 */
                var param = function (obj) {
                    var query = '';
                    var name, value, fullSubName, subName, subValue, innerObj, i;

                    for (name in obj) {
                        value = obj[name];

                        if (value instanceof Array) {
                            for (i = 0; i < value.length; ++i) {
                                subValue = value[i];
                                fullSubName = name + '[' + i + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value instanceof Object) {
                            for (subName in value) {
                                subValue = value[subName];
                                fullSubName = name + '[' + subName + ']';
                                innerObj = {};
                                innerObj[fullSubName] = subValue;
                                query += param(innerObj) + '&';
                            }
                        } else if (value !== undefined && value !== null) {
                            query += encodeURIComponent(name) + '='
                                + encodeURIComponent(value) + '&';
                        }
                    }

                    return query.length ? query.substr(0, query.length - 1) : query;
                };

                return angular.isObject(data) && String(data) !== '[object File]'
                    ? param(data)
                    : data;
            }];
        }]);
});