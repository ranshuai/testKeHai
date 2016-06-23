/**
 * @author mhh
 * @version 1.0
 * 依赖jQuery1.7+
 */
/**
 * 通用工具
 */

var jQuery = require('jquery');
var $ = require('jquery');
var dialogs = require('./dialogs.js');

define('common',function(){
var contextPath = "/";

//if (!window.//console || !//console.firebug){
if (!window.console){
    try{
        var names = ["log", "debug", "info", "warn", "error", "assert", "dir", "dirxml", "group", "groupEnd", "time", "timeEnd", "count", "trace", "profile", "profileEnd"];

        window.console = {};
        for (var i = 0; i < names.length; ++i)
            window.console[names[i]] = function() {}
    }catch (error){
        alert(error);
    }
}

var common = function () {
    return {
        /**
         * 设置应用地址
         * @param path
         * @returns
         */
        initContextPath: function (path) {
            if (path) {
                contextPath = path;
            }
        },
        /**
         * 是否数字
         * @param str
         * @returns
         */
        isNumber: function (str) {
            if (!str) return false;
            var regu = /^(\d+)$/;
            return regu.test(str);
        },
        isMoneyNumber: function (str) {
            if (!str) return false;
            //if (str.indexOf('.') > 1 && str[0] == 0) return false;
            //if (str.indexOf('.') < 0 && str[0] == 0) return false;
            //var regu = /^\d+(\.?\d+)?$/;
            var regu = /^(([1-9][0-9]{0,7}\.[0-9]{1,2})|([0]\.[0-9]{1,2})|([1-9][0-9]{0,7})|([0]{1}))$/;
            try{
                //console.log(parseFloat(str));
                //console.log(Number(str));
                if (parseFloat(str) != str) return false;
            }catch(ex) {
                return false;
            }
            return regu.test(str);
        },
        /**
         * 返回一个月中的天数
         * @returns
         */
        getMonthMaxDay: function (year, month) {
            if (month == 4 || month == 6 || month == 9 || month == 11)
                return 30;
            if (month == 2) {
                if (year % 4 == 0 && year % 100 != 0 || year % 400 == 0)
                    return 29;
                else
                    return 28;
            }
            return 31;
        },
        /**
         * 将字符串转为JSON对象
         * @param data
         * @returns
         */
        toJson: function (data) {
            if (typeof (data) == 'string') {
                data = $.parseJSON(data);
            }
            return data;
        },
        /**
         * 校验返回的JSON
         * @param objStr
         * @returns
         */
        checkResponse: function (objStr) {

            if (objStr == null || objStr == "") {
                return false;
            }
            var obj;
            if (typeof (objStr) == 'string') {
                obj = jQuery.parseJSON(objStr);
            } else {
                obj = objStr;
            }
            if ($.isEmptyObject(obj)) {
                return false;
            }
            if (obj.resCode == null || obj.resCode == "") {
                //common.onMessage("数据格式错误" + obj.resCode +" " + objStr);
                if(dialogs)dialogs._alert('数据格式错误');
                return false;
            }
            if (obj.resCode == "000") {
                return true;
            } else if (obj.resCode == '101') {
                if(dialogs)dialogs._wait('已经存在：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '102') {
                if(dialogs)dialogs._wait('不存在：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '103') {
                if(dialogs)dialogs._timer(obj.resMsg,2,2);
                return false;
            } else if (obj.resCode == '104') {
                if(dialogs)dialogs._alert('参数不能为空：'+obj.resMsg);
                return false;
            } else if (obj.resCode == '105') {
                if(dialogs)dialogs._alert('参数错误：'+obj.resMsg);
                return false;
            } else if (obj.resCode == '200') {
                if(dialogs)dialogs._alert('您的登录已经超时，需要重新登录！');
                window.location.href = "/login.htm";
                /*common.alertForward('您的登陆已经超时，需要重新登陆！','login.ui');*/
                return false;
            } else if (obj.resCode == '300') {
                if(dialogs)dialogs._wait('没有权限：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '301') {
                if(dialogs)dialogs._wait('激活失败：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '500') {
                if(dialogs)dialogs._wait('系统错误：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '505') {
                if(dialogs)dialogs._wait('未审核课程：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '506') {
                if(dialogs)dialogs._wait('未审核机构：'+ obj.resMsg,3);
                return false;
            } else if (obj.resCode == '601') {
                if(dialogs)dialogs._alert('绑定银行卡失败：'+ obj.resMsg);
                return false;
            } else if (obj.resCode == '704') {
                if(dialogs)dialogs._alert('登录信息不完整：'+ obj.resMsg);
                return false;
            }
            return false;
        },
        /**
         * 从URL中获取的参数值
         * @returns
         */
        getUrlParamVal: function () {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
            var r = window.location.search.substr(1).match(reg);
            if (r != null)
                return unescape(r[2]);
            return null;
        },
        /**
         * 提示消息
         * @param message
         * @returns
         */
        onMessage: function (message) {
            /*$.messager.show({
             title:'提示',
             msg:message,
             showType:'fade',
             style:{
             right:'',
             bottom:''
             }
             });*/
            alert(message);
        },
        /**
         * 提示跳转
         * @param message
         * @returns
         */
        alertBack: function (message) {
            setInterval(function () {
                history.back(-1);
                //$.messager.progress('close');
            }, 2000);
            common.disableFrom(true);
            //$.messager.progress({msg:"<lable class='onMessageThemes'><b>"+message +"</b></lable>   正在跳转界面..."});
            common.onMessage("<lable class='onMessageThemes'><b>" + message + "</b></lable>   正在跳转界面...");
        },
        /**
         * 提示跳转
         * @param message
         * @returns
         */
        alertForward: function (message, url) {
            setTimeout(function () {
                //console.log("跳转:" + url);
                window.location.href = url;
            }, 2500);
            common.disableFrom(true);
            common.onMessage("<lable class='onMessageThemes'><b>" + message + "</b></lable>   正在跳转界面...");
        },
        /**
         * 禁用表单内容
         * @param disabled
         * @returns
         */
        disableFrom: function (disabled) {
            $("form :input").attr("disabled", disabled);
            if (disabled) {
                $("form a").addClass("l-btn-disabled");
            } else {
                $("form a").removeClass("l-btn-disabled");
            }
        }
    };
}();
/**
 * 数据选择
 */
var slectSupport = function () {
    return {
        getCheckboxIds: function (checkboxName) {
            var arr = new Array();
            var checked = $("input[name=" + checkboxName + "]:checked");
            $.each(checked, function (index, item) {
                arr.push($(this).val());
            });
            return arr.join();
        }
    };
}();
/**
 * 编码、状态代码处理
 */
var df = function () {
    return {
        //数据字典中的数据
        dataCode: function (val, row) {
            if (val.indexOf(",") > -1) {
                var tmpStr = "";
                var arr = val.split(",");
                $.each(arr, function (index, item) {
                    tmpStr += "/" + df.dataCode(item);
                });
                return tmpStr;
            }

            switch (val) {
                case "10010":
                    return "语文";
                case "10011":
                    return "数学";
                case "10012":
                    return "英语";
                case "10013":
                    return "生物";
                case "10014":
                    return "物理";
                case "10015":
                    return "化学";
                case "10016":
                    return "地理";
                case "10018":
                    return "政治";
                case "10017":
                    return "历史";
                case "10019":
                    return "品德与生活";
                case "10020":
                    return "美术";
                case "10021":
                    return "音乐";
                case "10022":
                    return "体育";
                case "10023":
                    return "信息技术";
                case "10024":
                    return "法制";
                case "10025":
                    return "综合实践";
                case "20101":
                    return "班长";
                case "20102":
                    return "学习委员";
                case "20103":
                    return "其他";
                case "20201":
                    return "小学";
                case "20202":
                    return "初中";
                case "20203":
                    return "高中";
                case "20301":
                    return "主任";
                case "20302":
                    return "职员";
                case "20303":
                    return "其他";
                case "20401":
                    return "班主任";
                case "20402":
                    return "任课老师";
                case "20403":
                    return "学生";
                case "20501":
                    return "六三学制";
                case "20502":
                    return "五四学制";
                case "20503":
                    return "五三学制";
                case "20601":
                    return "人教版";
                case "20602":
                    return "苏教版";
                case "20603":
                    return "其他";
                case "20701":
                    return "校长";
                case "20702":
                    return "教务主任";
                case "20703":
                    return "其他";
                default :
                    return val;
            }
        },
        //禁用状态
        disabled: function (val, row) {
            switch (val) {
                case "0":
                    return "正常";
                case "1":
                    return "禁用";
                default :
                    return val;
            }
        },
        //年级
        grade: function (val, row) {
            switch (val) {
                case "1001":
                    return "一年级";
                case "1002":
                    return "二年级";
                case "1003":
                    return "三年级";
                case "1004":
                    return "四年级";
                case "1005":
                    return "五年级";
                case "1006":
                    return "六年级";
                case "1007":
                    return "预初";
                case "1008":
                    return "初一";
                case "1009":
                    return "初二";
                case "1010":
                    return "初三";
                case "1011":
                    return "高一";
                case "1012":
                    return "高二";
                case "1013":
                    return "高三";
                default :
                    return val;
            }
        },
        //用户类型
        userType: function (val, row) {
            switch (val) {
                case "0":
                    return "学生";
                case "1":
                    return "老师";
                default :
                    return val;
            }
        },
        //帐号激活状态
        activated: function (val, row) {
            switch (val) {
                case "0":
                    return "未激活";
                case "1":
                    return "激活";
                default :
                    return val;
            }
        },
        //审核状态
        ispass: function (val, row) {
            switch (val) {
                case "0":
                    return "未审核";
                case "1":
                    return "通过";
                default :
                    return val;
            }
        },
        examChecked: function (val, row) {
            switch (val) {
                case "0":
                    return "未批阅";
                case "1":
                    return "已批阅";
                default :
                    return val;
            }
        },
        diaryType: function (val, row) {
            switch (val) {
                case "1":
                    return "评课";
                case "2":
                    return "课题";
                case "3":
                    return "随笔";
                default :
                    return val;
            }
        },
        informType: function (val, row) {
            switch (val) {
                case "0":
                    return "通知";
                case "1":
                    return "作业";
                case "2":
                    return "家长会";
                default :
                    return val;
            }
        },
        //订单支付状态
        orderPayType: function (val, row) {
            switch (val) {
                case "0":
                    return "待支付";
                case "1":
                    return "待支付";
                case "2":
                    return "已支付";
                default:
                    return val;
            }
        },
        //上课状态
        onCoursesType: function (val, row) {
            switch (val) {
                case "0":
                    return "执行中";
                case "1":
                    return "执行完毕";
                case "2":
                    return "已冻结";
                default:
                    return val;
            }
        },
        //课程类型
        coursesType: function (val, row) {
            switch (val) {
                case "0":
                    return "一对一";
                case "1":
                    return "班课";
                case "2":
                    return "陪读";
                case "3":
                    return "视频";
                case "20":
                    return "旁听";
                default :
                    return val;
            }
        },
        //课程节次
        /**
         * 课程节次
         * @param val 数据项
         * @param row 行参数
         * @returns {string} 返回课程HTML元素
         */
        courseRecordIndex: function (val, row) {
            return "第" + val + "节";
        },
        //退课状态
        retireCoursesType: function (val, row) {
            switch (val) {
                case "0":
                    return "未申请退课";
                case "1":
                    return "申请退课";
                case "2":
                    return "待退课";
                case "3":
                    return "退课完毕";
                default :
                    return val;
            }
        },
        //匹配老师状态
        assignTeacherType: function (val, row) {
            switch (val) {
                case "0":
                    return "待匹配";
                case "1":
                    return "待确定";
                case "2":
                    return "已匹配";
                default :
                    return val;
            }
        },
        //订单整体状态支付后的
        orderStatus: function (val, row) {
            var patt1 = new RegExp("[0-9]1[^2]");
            var patt2 = new RegExp("[0-9]{2}[2]");
            var patt3 = new RegExp("[^3][0][^2]");
            var patt4 = new RegExp("[0-9][2]");
            var patt5 = new RegExp("[3]{1}[0]{1}[0|3]");
            var patt6 = new RegExp("[3]{1}[0]{1}[0|3][30]");
            if (patt1.test(val)) return "<p>已结课</p>";
            if (patt2.test(val)) return "<p>已退课</p>";
            if (patt3.test(val)) return "<p>已支付</p>";
            if (patt4.test(val)) return "<p>已冻结</p>";
            if (patt6.test(val)) return "<p>换师中</p>";
            if (patt5.test(val)) return "<p>进行中</p>";

        },
        //操作类型
        operatorType: function (val, row) {
            switch (val) {
                case "20":
                    return "匹配老师";
                case "21":
                    return "待老师确认";
                case "22":
                    return "匹配老师";
                default :
                    return "查看详情";
            }
        },
        //性别
        sexType: function (val, row) {
            switch (val) {
                case "0":
                    return "男";
                case "1":
                    return "女";
                default :
                    return val;
            }
        },
        //	课程记录表
        coursesStatus: function (val, row) {
            switch (val) {
                case "0":
                    return "待约课"
                case "10":
                    return "待上课";
                case "11":
                    return "上课中";
                case "12":
                    return "上课中止";
                case "13":
                    return "已完成";
                case "20":
                    return "待处理";
                case "21":
                    return "调课成功，待上课";
                case "22":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                case "30":
                    return "待处理";
                case "31":
                    return "已同意";
                case "32":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                default :
                    return val;
            }
        },
        //显示对于的操作
        showLink: function (val, row) {  //"100" 待上课  一对一
            switch (val) {
                case "100" :
                    return "<a href='#20'>调课</a><a href='#1'>退课</a><a href='#30'>换老师</a>";
                case "101" :
                    return "<a href='#1'>退课</a><a href='#30'>换老师</a>";
                case "102" :
                    return "<a href='#1'>退课</a>";
                default :
                    return val;
            }
        },
        //显示申请记录时机构对应的操作
        showOrgOper: function (val, row) {
            switch (val) {
                case "020":
                case "120":
                    return "<a href='#21' class='reason blue'>同意</a>&nbsp;&nbsp;<a href='#22' class='reason orange pushBtnJs'>驳回</a>";
                case "021":
                case "121":
                case "221":
                    return "<span>已同意</span>";
                case "022":
                case "122":
                case "222":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                case "130":
                case "030":
                case "330":
                    return "<a href='#31' class='reason blue'>同意</a>&nbsp;&nbsp;<a href='#32' class='reason orange pushBtnJs'>驳回</a>";
                case "031":
                case "131":
                case "231":
                case "331":
                    return "<span>已同意</span>";
                case "032":
                case "132":
                case "232":
                case "332":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                case "220":
                    return "<span>待处理</span>";
                default :
                    return val;
            }
        },
        //
        showoperType1: function (val) {
            switch (val) {
                case "-1":
                    return "1";
                case "0":
                    return "2";
                case "1":
                    return "3";
                case "2":
                    return "1";
                case "3":
                    return "2";
                case "4":
                    return "3";
                default :
                    return val;

            }
        },
        //老师中心申请退课记录时机构对应的操作
        show_RetireCourses_OrgOper: function (val, row) {
            switch (val) {
                case "1":
                    return "<span>待确定</span>";
                case "2":
                    return "<span>已同意</span>";
                case "3":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                default :
                    return val;

            }
        },
        //机构中心申请退课记录时机构对应的操作
        show_org_RetireCourses_OrgOper: function (val, row) {
            switch (val) {
                case "1":
                    return "<a href='#10' class='reason blue'>同意</a>&nbsp;&nbsp;<a href='#11' class='reason orange pushBtnJs'>驳回</a>";
                case "2":
                    return "<span>已同意</span>";
                case "3":
                    return "<span>已驳回</span><br/><a class='reason_warp reason blue bk'></a>";
                default :
                    return val;

            }
        },
        show_courseCode: function (val) {
            switch (val) {
                case "10010":
                    return "语文";
                case "10011":
                    return "数学";
                case "10012":
                    return "英语";
                case "10013":
                    return "生物";
                case "10014":
                    return "物理";
                case "10015":
                    return "化学";
                case "10016":
                    return "地理";
                case "10017":
                    return "历史";
                case "10018":
                    return "政治";
                case "10019":
                    return "品德与生活";
                case "10020":
                    return "美术";
                case "10021":
                    return "音乐";
                case "10022":
                    return "体育";
                case "10023":
                    return "信息技术";
                case "10024":
                    return "法制";
                case "10025":
                    return "综合实践";
                case "10026":
                    return "科学";
                case "10027":
                    return "理综";
                case "10028":
                    return "文综";
                case "10029":
                    return "思想品德";
                default :
                    return "";

            }
        },
        //fundFlowType: function (val, courseTitle, courseMode, name) {
        //    switch (val) {
        //        case "1000": return "余额充值";
        //        case "1001": return "台时费充值";
        //        case "1002": return name != null ? "["+ name + "]购买了["+courseTitle+"]" : "购买了["+courseTitle+"]";
        //        case "1003": return "教师工资";
        //        case "1004": return "借师费";
        //        case "1005": return "借生费";
        //        case "1006": return "台时费";
        //        case "1007": return "退台时费";
        //        case "1008": return name != null ? "["+name+"]退课程["+courseTitle+"]" : "退课程["+courseTitle+"]";
        //        case "1009": return "退借生费";
        //        case "1010": return "旁听卡充值";
        //        case "1011": return "课程完结";
        //        case "2000": return "提现";
        //    }
        //},
        fundFlowType: function (val, courseTitle, courseMode, name) {
            switch (val) {
                case "1000": return "余额充值";
                case "1001": return "视频卡充值";
                case "2000": return name != null ? "["+ name + "]购买一对一课程["+courseTitle+"]" : "购买一对一课程["+courseTitle+"]";
                case "2001": return name != null ? "["+ name + "]购买陪读课程" : "购买陪读课程";
                case "2002": return name != null ? "["+ name + "]购买旁听课程["+courseTitle+"]" : "购买旁听课程["+courseTitle+"]";
                case "2003": return name != null ? "["+ name + "]购买视频课程["+courseTitle+"]" : "购买视频课程["+courseTitle+"]";
                //case "3000": return "台时费";
                //case "3001": return "借生费";
                //case "3002": return "借师费";
                case "4200": return name != null ? "["+ name + "]退一对一课程["+courseTitle+"]" : "退一对一课程["+courseTitle+"]";
                case "4201": return name != null ? "["+ name + "]退陪读课程" : "退陪读课程";
                case "4202": return name != null ? "["+ name + "]退旁听课程["+courseTitle+"]" : "退旁听课程["+courseTitle+"]";
                //case "4300": return "退台时费";
                //case "4301": return "退借生费";
                //case "4302": return "退借师费";
                case "5000": return "教师工资";
                case "5001": return "冻结金额转提现金额";
                case "5002": return "冻结金额转提现金额";
                case "5003": return "冻结金额转提现金额";
                case "5002": return "提现";
                case "5401": return "冻结金额转提现金额";
            }
        },
        showcourse: function (val) {
            switch (val) {
                case "0":
                    return "同步课程";
                case "1":
                    return "小学";
                case "2":
                    return "小升初";
                case "3":
                    return "初中";
                case "4":
                    return "中考";
                case "5":
                    return "高中";
                case "6":
                    return "高考";
                case "8":
                    return "全科陪读";
                case "9":
                    return "单科陪读";
                default :
                    return val;

            }
        },
        ptCourseStatus: function (val) {
            switch (val) {
                case "700101":
                case "700102":
                case "700103":
                    return "未开始";
                case "700104":
                    return "进行中";
            }
        },
        showClass: function (val) {
            switch (val) {
                case "1001":
                    return "一年级";
                case "1002":
                    return "二年级";
                case "1003":
                    return "三年级";
                case "1004":
                    return "四年级";
                case "1005":
                    return "五年级";
                case "1006":
                    return "六年级";
                case "1007":
                    return "预初";
                case "1008":
                    return "初一";
                case "1009":
                    return "初二";
                case "1010":
                    return "初三";
                case "1011":
                    return "高一";
                case "1012":
                    return "高二";
                case "1013":
                    return "高三";
                default :
                    return val;

            }
        },
        pushType: function(val){
            switch (val){
                case "0": return "未推广";
                case "1": return "待推广";
                case "2": return "已推广";
            }
        },
        courseImageType: function(val){
            switch (val) {
                case "0": return "doc";
                case "1": return "ppt";
                case "3": return "pdf";
                default : return "doc";
            }
        }

    };
}();
/**
 * 日期格式化对象
 *
 * @param format
 * @returns
 */
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds()
        // millisecond
    };
    if (/(y+)/.test(format))
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(format))
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
    return format;
};


/**
 * 获取当前显示的菜单
 */

(function ($) {
    $.shoMyDiv = function (index) {
        index = parseInt(index);
        $('.left_menu li:eq(index)').addClass('cur');
    }
})(jQuery)

function getX(e) {
    e = e || window.event;

    return e.pageX || e.clientX + document.body.scrollLeft;
}

function getY(e) {
    e = e || window.event;
    return e.pageY || e.clientY + document.body.scrollTop;
}

function getSubjectId(subject) {
    switch (subject) {
        case "语文": return "10010";
        case "数学": return "10011";
        case "英语": return "10012";
        case "生物": return "10013";
        case "物理": return "10014";
        case "化学": return "10015";
        case "地理": return "10016";
        case "历史": return "10017";
        case "政治": return "10018";
        case "品德与生活": return "10019";
        case "美术": return "10020";
        case "音乐": return "10021";
        case "体育": return "10022";
        case "信息技术": return "10023";
        case "法制": return "10024";
        case "综合实践": return "10025";
        case "科学": return "10026";
        case "理综": return "10027";
        case "文综": return "10028";
        case "思想品德": return "10029";
        default : return "";
    }
}



String.prototype.fullTrim = function(str) {
    return str.replace("/\s/g", "");
}


function textAreaEscape( content ){

    var s = "";
    if (content.length == 0) return "";
    s = content.replace(/&amp;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&apos;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br\/>/g,"\r\n");
    return s;

  /*  content = content.replace(/<br \/>/g,'\r\n');
    content = content.replace(/&apos;/g,"'");
    content = content.replace(/&quot;/g,"\"");
    return content ;*/
}
//获取图片验证码
var changeImg = function( imgId ) {
    var imgSrc = $("#"+imgId);
    var src = imgSrc.attr("src");
    imgSrc.attr("src", chgUrl(src));
}
//时间戳
//为了使每次生成图片不一致，即不让浏览器读缓存，所以需要加上时间戳
function chgUrl(url) {
    var timestamp = (new Date()).valueOf();
    url = url.substring(0, 14);
    if ((url.indexOf("&") >= 0)) {
        url = url + "&tamp=" + timestamp;
    } else {
        url = url + "?timestamp=" + timestamp;
    }
    return url;
}

return {
    checkResponse : common.checkResponse,
    isNumber:common.isNumber,
    isMoneyNumber:common.isMoneyNumber,
    changeImg:changeImg,
    df:df,
    textAreaEscape:textAreaEscape
}

});
