define(['app/roc/rocModule'], function (rocModule) {

    //查看短板业务类
    rocModule.factory('weaknessService', ['$http', function ($http) {
        var list = function (status, params) {
            var url = status ? "/weakness/getWqList.do" : "/weakness/getKpList.do";
            return $http.get(url, {params: params});
        };

        return {
            list: function (status, params) {
                return list(status, params);
            }
        };
    }]);

    //短板查看（按错题，知识点）查看学生名单 业务类
    rocModule.factory('getStuListService', ['$http', function ($http) {
        var list = function (params) {
            var url = params.type == 'wq' ? "/weakness/getStuByWtList.do" : "/weakness/getStuByKpList.do";
            return $http.get(url, {params: params});
        };
        return {
            list: function (type, params) {
                return list(type, params);
            }
        };
    }]);

    //旁听列表（未推广，待推广，已推广）获取列表 业务类
    rocModule.factory('pushService', ['$http', function ($http) {

        var list = function (status, params) {
            var url = "/roc/" + params.currPage + "/unpush/ptList.do";
            switch (status) {
                case 1:
                    url = "/roc/" + params.currPage + "/onpush/ptList.do";
                    break;
                case 2:
                    url = "/roc/" + params.currPage + "/pushList.do";
                    break;
            }
            return $http.get(url, {params: params});
        };
        return {
            list: function (status, params) {
                return list(status, params);
            }
        };
    }]);

    //加载推广地区
    rocModule.factory('loadAreasService', ['$http', function ($http) {
        return {
            list: function () {
                return $http.get('/roc/get/areaList.do');
            }
        };
    }]);

    //根据旁听课程Id查询旁听课程
    rocModule.factory('selectPtCourseEntityByIdService', ['$http', function ($http) {
        return {
            list: function (params) {
                return $http.get('/roc/selectPtCourseEntityById.do', {params: params});
            }
        };
    }]);

    //题目预览
    rocModule.factory('previewService', ['$http', function ($http) {
        return {
            preview: function (questionId) {
                return $http.get('/courses/' + questionId + '/preview.do');
            }
        };
    }]);

    //旁听课程 已推广详情
    rocModule.factory('getPushStuDetails', ['$http', function ($http) {
        return {
            list: function (params) {
                return $http.get('/roc/getPushStuDetails.do', {params: params});
            }
        };
    }]);


    //收入统计
    rocModule.factory('getCountIncomeService', ['$http', function ($http) {
        return {
            list: function (params) {
                switch (params.countType) {
                    case "listenCard":
                        return $http.get('/countManage/getListenCardData.do', {params: params});
                    case "ptBill":
                        return $http.get('/countManage/getPtBillData.do', {params: params});
                    case "useCost":
                        return $http.get('/countManage/getUseCostData.do', {params: params});
                    /*
                     * ---------------------------------------------------------------------------------------------
                     * 2016-04-29 蒋淼修改
                     * 1、新增 ptSeat 旁听坐席类型
                     * 2、请求 /countManage/getPTSeatData.do 数据，参数rocId
                     * ---------------------------------------------------------------------------------------------
                     */
                    case "ptSeat":
                        return $http.get("/countManage/getPTSeatData.do", {params: params})
                }
            }
        };
    }]);

    // 旁听坐席购买详情
    rocModule.factory('getPtSeatSaleDetailService', ['$http', function ($http) {
        return {
            list: function (params) {
                return $http.get('/countManage/getPTSeatDetailData.do', {params: params});
            }
        };
    }]);

    //随听卡详情
    rocModule.factory('getListenCardDetailService', ['$http', function ($http) {
        return {
            list: function (params) {
                switch (params.countType) {
                    case "buyListenCard":
                        return $http.get('/countManage/getBuyListenCardData.do', {params: params});
                    case "actionListenCard":
                        return $http.get('/countManage/getActionListenCardData.do', {params: params});
                }
            }
        };
    }]);

    //旁听统计详情
    rocModule.factory('getPtCountDetailDataService', ['$http', function ($http) {
        return {
            list: function (params) {
                return $http.get('/countManage/getPtCountDetailData.do', {params: params});
            }
        };
    }]);

    //平台使用费详情
    rocModule.factory('getUseCostCountDetailDataService', ['$http', function ($http) {
        return {
            list: function (params) {
                return $http.get('/countManage/getUseCostCountDetailData.do', {params: params});
            }
        };
    }]);


    //学校营收统计
    rocModule.factory('getSchRevenueDataService', ['$http', function ($http) {
        return {
            list: function (params) {
                switch (params.countType) {
                    case "onLineSchool":
                        return $http.get('/countManage/getOnLineRevenueData.do', {params: params});
                    case "lineSchool":
                        return $http.get('/countManage/getLineRevenueData.do', {params: params});
                }
            }
        };
    }]);

    //加载区域运营中心管理的地区（线上或者线下）
    rocModule.factory('getAreasService', ['$http', function ($http) {
        return {
            list: function (status) {
                return $http.get('/countManage/getAreasData.do', {params: {"status": status}});
            }
        };
    }]);


    //学校线上营收详情
    rocModule.factory('schRevenueDetailService', ['$http', function ($http) {
        return {
            list: function (params) {
                switch (params.detailType) {
                    case "oneToOne":
                        return $http.get('/countManage/getOneToOneData.do', {params: params});
                    case "pt":
                        return $http.get('/countManage/getPtData.do', {params: params});
                    case "video":
                        return $http.get('/countManage/getVideoData.do', {params: params});
                }
            }
        };
    }]);

});