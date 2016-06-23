//列表页的css
require('../../css/list/list.css');
require('../../css/jquery-ui.css');

/**********************************************************************************/
//列表页的模板
var template = require('../../template/list/listSiteSchoolCon.html');
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('listSiteSchoolCon').innerHTML = html;

/**********************************************************************************/
//依赖的模块
var money = require('../../vendors/libs/money');
var common = require('../../vendors/libs/common');
var dialogs = require('../../vendors/libs/dialogs');
var popBox = require('../../vendors/site/PTCoursePopBox');
var showPageBar = require('../../vendors/libs/sanhai-base-pagebar-standard-1.0.0');
var listSiteSchoolGet = require('../../model/list/listSiteSchoolGet');

/**********************************************************************************/



/********************************06-15 筛选列表 start**************************************************/

var InitFilterModel = Backbone.Model.extend({
    defaults: {
        title: '',
        val: '',
        num: '',
        type: ''
    }
});
var InitFilterCollection = Backbone.Collection.extend({
    model:InitFilterModel
});
var initFilterCollection = new InitFilterCollection();
//把url参数转换成对象
function urlToJson (){
    var myUrlStr = window.location.hash.indexOf('?')+1;
    var myUrlSub = window.location.hash.substr(myUrlStr);
    var myUrlArr = myUrlSub.split('&');
    var json={};
    for( var i=0; i<myUrlArr.length; i++)
    {
        var arr2=myUrlArr[i].split('=');
        json[arr2[0]]=arr2[1];
    }
    return json;
}
var urlData = urlToJson(); // {courseType: "1", subjectId: "10010"}
//循环哪些是选中的
$('.sele_list_warp .sele_li_list a').each(function(i,v){
    if($(v).attr('code') == urlData.courseType || $(v).attr('code') == urlData.subjectId){
        $(v).addClass('f_ff8000');
        var initFilterModel = new InitFilterModel();
        var titTxt = $(v).parents('.sele_li_list').prev().text();
        var valTxt = $(v).text();
        var valNum = $(v).attr('code');
        var type = $(v).parents('.sele_list').find('.sele_li_tit').attr('data');
        var objData = {
            title: titTxt,
            val: valTxt,
            num: valNum,
            type: type
        };
        //模型添加数据
        initFilterModel.set(objData);
        //集合添加模型
        initFilterCollection.add(initFilterModel);
    }
});
/**/


/********************************06-15 end****************************************************/
function ListInit() {
}
//学校列表
ListInit.prototype.mySchoolInit = function (response, tem) {
    $('#schoolListScope').parent().parent().addClass('frame_l_l');
    $('#c_listSiteAllStudied').removeClass('hide');
    var dataGet = response.data;
    var MmyInit = Backbone.Model.extend({
        defaults: dataGet,
        money: money,
        common: common
    });
    var VmyInit = Backbone.View.extend({
        initialize: function () {
            this.render();
            this.li = this.$('.js-li');
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.li = this.$('.main_l_nav li');
        },
        template: _.template($(html).children(tem).html())
    });
    var m = new MmyInit;

    var v = new VmyInit({model: m});

    $('#schoolListScope').html(v.el);

    if (window.location.hash.indexOf('/') != -1) {
        var index = window.location.hash.indexOf('/');
        var route = window.location.hash.substr(1, (index - 1));
    } else {
        var route = window.location.hash.substr(1);
    }

    showPageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
    }, route);
    $('#mainNavSchool').addClass('ac').siblings('li').removeClass('ac');

};
//课程中心
ListInit.prototype.myCourseInit = function (response, tem) {
    $('#schoolListScope').parent().parent().addClass('frame_l_l');
    $('#c_listSiteAllStudied').removeClass('hide');
    var dataGet = response.data;
    var MmyInit = Backbone.Model.extend({
        defaults: dataGet,
        money: money,
        common: common
    });
    var VmyInit = Backbone.View.extend({
        tageName: 'div',
        events: {
            'click .to_ask': function (e) {
                var obj = $(e.target);
                var courseMode = obj.parent('div').children('input').eq(0).val();
                var courseId = obj.parent('div').children('input').eq(1).val();
                var auditFlag = 0;
                $.ajax({
                    url: "/site/shopping/add.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        courseMode: courseMode,
                        courseId: courseId,
                        auditFlag: auditFlag,
                        remark: ""
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            var count = parseInt($("#shoppingcount").text()) + 1;
                            $("#shoppingcount").text(count);
                            dialogs._shoppingcar(function () {
                            }, function () {
                                window.location.href = "/shopping/shoppingCoureses.htm";
                            })

                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                            $('#notice_textarea').val("");
                            $(".pushNotice").dialog("close");
                        }
                        // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                        if ("300" == response.resCode) {
                            dialogs._timer(response.resMsg, 2, 2, null);
                        }
                    }
                });
            }
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
        },
        template: _.template($(html).children(tem).html())
    });
    var v = new VmyInit({model: new MmyInit});
    $('#schoolListScope').html(v.el);
    if (window.location.hash.indexOf('/') != -1) {
        var index = window.location.hash.indexOf('/');
        var route = window.location.hash.substr(1, (index - 1));
    } else {
        var route = window.location.hash.substr(1);
    }
    showPageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
    }, route);
    $('#mainNavCourse').addClass('ac').siblings('li').removeClass('ac');
};
//旁听列表
ListInit.prototype.myPTInit = function (response, tem) {
    $('#schoolListScope').parent().parent().addClass('frame_l_l');
    $('#c_listSiteAllStudied').removeClass('hide');
    var dataGet = response.data;
    var MmyInit = Backbone.Model.extend({
        defaults: dataGet,
        money: money,
        common: common
    });
    var VmyInit = Backbone.View.extend({
        events: {
            'click .buyAudit button': function (e) {
                //courseId, studentId, classid
                var index = $(e.target).parents('.main_l_nav_cont_row').index() - 1;
                var dataList = this.model.attributes.list[index];
                var courseId = dataList.courseId;
                var studentId = dataList.studentId;
                var classid = dataList.classId;

                //判断是否登录
                // var userId = ptCourseDetailData.userId;
                // var userIdentity = ptCourseDetailData.userIdentity;
                // if (userId == "null") {
                //     location.href = "/login.htm";
                //     return;
                // }
                // if (userIdentity == 0) {
                //     dialogs._timer('教师无购买权限', 2, 2, '');
                //     return;
                // } else if (userIdentity == 3) {
                //     dialogs._timer('学校无购买权限', 2, 2, '');
                //     return;
                // }
                $.ajax({
                    url: "/site/ptcourse/plan/selectArrangeCourseByCourseIdAndUserId.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        courseId: courseId,
                        studentId: studentId
                    },
                    success: function (response) {
                        var htmlStr = "";
                        var isBuy = false;
                        var isEnough = true;
                        $.each(response.data.allArrangeCourseList, function (index_1, item_1) {
                            isBuy = false;
                            htmlStr += "<div class='courItem clearfix'>";
                            htmlStr += "<div class='fl tl' style='width:240px'>";
                            $.each(response.data.arrangeCourseList, function (index, item_2) {
                                if (item_1.classId == item_2.classId) {
                                    isBuy = true;
                                }
                            });

                            if (isBuy == true) {
                                htmlStr += "<input type='checkbox' data='0' id='checkbox" + index_1 + "' name='classid'  disabled='disabled' value='" + item_1.classId + "' />";
                            } else {
                                if (item_1.classId == classid) {
                                    htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  checked value='" + item_1.classId + "' />";
                                } else {
                                    htmlStr += "<input type='checkbox' id='checkbox" + index_1 + "' name='classid'  value='" + item_1.classId + "' />";
                                }
                            }
                            htmlStr += "  <label for='checkbox" + index_1 + "'><strong>" + item_1.theme + "</strong></label>";
                            htmlStr += "</div>";
                            htmlStr += "<div class='fl tc' style='width:160px'>" + new Date(parseFloat(item_1.classStartTime)).format("MM-dd hh:mm") + "</div>";
                            htmlStr += "<div class='fr tl' style='width:123px'>";
                            htmlStr += "<strong class='font20 f_ff8000'>" + money.fmoney(new Number(item_1.ptPrice) / 100 * new Number(item_1.courseTime) / 60, 2) + "</strong>";
                            htmlStr += "<input class='price' type='hidden' value=" + new Number(item_1.ptPrice) / 100 * new Number(item_1.courseTime) / 60 + ">";
                            htmlStr += "</div>";
                            htmlStr += "</div>";
                        });
                        $("#couserlists").html(htmlStr);
                        /*弹窗全选*/
                        popBox.selBoxAll();

                    }
                });

                /*弹窗初始化*/
                $('.popBox').dialog({
                    autoOpen: false,
                    width: 600,
                    modal: true,
                    resizable: false,
                    close: function () {
                        $(this).dialog("close")
                    }
                });
                //清除选项
                $('.cancelBtn').click(function () {
                    $(".popBuyAudit").dialog("close");
                });
                /*预览*/
                $("#popBuyAudit").dialog("open");

                $('#toPay').click(function () {

                    if ($("#couserlists").html() == "") {
                        return;
                    } else {

                        var classids = "";
                        $("#couserlists input[type = checkbox]:checked").each(function (index) {

                            classids += $(this).val() + ",";
                        });
                        var ids = classids.substring(0, classids.length - 1);
                        if (ids == '') {
                            return;
                        }
                        $("#couserlists").html("");
                        $(".popBox").dialog("close");

                        location.href = "/site/ptcourse/buyPtCourse.htm?classIds=" + ids;
                    }
                });
            }
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
        },
        template: _.template($(html).children(tem).html())
    });
    var v = new VmyInit({model: new MmyInit});
    $('#schoolListScope').html(v.el);
    if (window.location.hash.indexOf('/') != -1) {
        var index = window.location.hash.indexOf('/');
        var route = window.location.hash.substr(1, (index - 1));
    } else {
        var route = window.location.hash.substr(1);
    }
    showPageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
    }, route);
    $('#mainNavPtCourse').addClass('ac').siblings('li').removeClass('ac');
};
//课海列表
ListInit.prototype.myKHInit = function (response, tem) {
    $('#c_listSiteAllStudied').addClass('hide');
    $('#schoolListScope').parent().parent().removeClass('frame_l_l');
    var dataGet = response.data;
    var MmyInit = Backbone.Model.extend({
        defaults: dataGet,
        money: money,
        common: common
    });
    var VmyInit = Backbone.View.extend({
        events: {
            'mouseenter dl': function (e) {
                $(e.target).find('.startStudy').removeClass('hide');
            },
            'mouseleave dl': function (e) {
                $(e.target).find('.startStudy').addClass('hide');
            },
            'click .startStudy a': function (e) {
                var obj = $(e.target);
                var videoId = obj.parent('dd').children('input').eq(0).val();
                var auditFlag = 0;
                $.ajax({
                    url: "/site/shopping/add.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        courseMode: 3,
                        courseId: videoId,
                        auditFlag: auditFlag,
                        remark: ""
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            var count = parseInt($("#shoppingcount").text()) + 1;
                            $("#shoppingcount").text(count);
                            dialogs._shoppingcar(function () {

                            }, function () {
                                window.location.href = "/shopping/shoppingCoureses.htm";
                            });
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                            $('#notice_textarea').val("");
                            $(".pushNotice").dialog("close");
                        }
                        // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                        if ("300" == response.resCode) {
                            dialogs._timer(response.resMsg,2,2,null);
                        }
                    }
                });
            }
        },
        initialize: function () {
            this.render();
        },
        render: function () {
            this.$el.html(this.template(this.model.toJSON()))
        },
        template: _.template($(html).children(tem).html())
    });
    var v = new VmyInit({model: new MmyInit});
    $('#schoolListScope').html(v.el);
    if (window.location.hash.indexOf('/') != -1) {
        var index = window.location.hash.indexOf('/');
        var route = window.location.hash.substr(1, (index - 1));
    } else {
        var route = window.location.hash.substr(1);
    }
    showPageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
    }, route);
    $('#mainNavVideoCourse').addClass('ac').siblings('li').removeClass('ac');
};

var listInit = new ListInit();
/**********************************************************************************/
/*路由*/
var Router = Backbone.Router.extend({
    routes: {

        // 'school' :'schoolInitFirst',//

        'school(/page:n)': 'schoolInit',

        'school/:query/:m': 'schoolInit',

        'course(/page:n)': 'courseInit',

        'course/:query/:m': 'courseInit',

        'PT(/page:n)': 'PTInit',

        'PT/:query/:m': 'PTInit',

        'KH(/page:n)': 'KHInit',

        'KH/:query/:m': 'KHInit'

        //'*error':'error'
    },
    schoolInit: function (n, m) {
        $('#courseType').val('ignore');
        $('#subjectId').val('ignore');
        if (Number(n)) {
            n = n
        } else {
            n = 1;
            $("#sortType").val('000');
        }
        if (m)$("#sortType").val(m);
        listSiteSchoolGet.schoolListInit({
            currPage: n,
            callback: listInit.mySchoolInit,
            tem: '#schoolListTemplate'
        });

    },
    courseInit: function (n, m) {
        $('#courseType').val('ignore');
        $('#subjectId').val('ignore');
        if (Number(n)) {
            n = n
        } else {
            n = 1;
            $("#sortType").val('000');
        }

        // if (m)$("#sortType").val(m);
        listSiteSchoolGet.courseListInit({
            currPage: n,
            callback: listInit.myCourseInit,
            tem: '#courseListTemplate'
        });
    },
    PTInit: function (n, m) {
        $('#courseType').val('ignore');
        $('#subjectId').val('ignore');
        if (Number(n)) {
            n = n
        } else {
            n = 1;
            $("#sortType").val('100');
        }
        // Number(n) ? n=n : n=1;
        if (m)$("#sortType").val(m);
        listSiteSchoolGet.PTListInit({
            currPage: n,
            callback: listInit.myPTInit,
            tem: '#PTListTemplate'
        });
    },
    KHInit: function (n, m) {
        $('#courseType').val('ignore');
        $('#subjectId').val('ignore');
        if (Number(n)) {
            n = n
        } else {
            n = 1;
            $("#sortType").val('100');
        }
        Number(n) ? n = n : n = 1;
        if (m)$("#sortType").val(m);
        listSiteSchoolGet.KHListInit({
            currPage: n,
            callback: listInit.myKHInit,
            tem: '#KHListTemplate'
        });
    },
    error: function () {
        window.location.href = '/front/404.html'
    }
});
var r = new Router();
Backbone.history.start();
/**********************************************************************************/
//所选分类
var MselList = Backbone.Model.extend({
    defaults: {
    }
});
var mselList = new MselList();
var Vsel = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click .del': 'del'
    },
    del: function (e) {
        this.model.destroy();
        var num = $(e.target).attr('num');
        var type = $(e.target).attr('data');
        if (num) {
            $('.classes_sel_sel').find('a').each(function (i, v) {
                var code = $(v).attr('code');
                if (num == code) {
                    $(v).removeClass('f_ff8000');
                    return false;
                }
            });
        }
        $('#'+type).val('ignore');
        listSiteSchoolGet.courseListInit({
            currPage: 1,
            callback: listInit.myCourseInit,
            tem: '#courseListTemplate'
        });
    },
    remove: function () {
        this.$el.remove();
    },
    initialize: function () {
        this.render();
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
    },
    template: _.template($('#selTemplate').html())
});
/*********************************************************************************/
var SelLists = Backbone.View.extend({
    el: $('.classes_sel_sel'),
    events: {
        'click .sele_list_warp a': function (e) {
            $(e.target).addClass('f_ff8000').parent().siblings().find('a').removeClass('f_ff8000');
            var mselList = new MselList();
            var titTxt = $(e.target).parents('.sele_li_list').prev().text();
            var valTxt = $(e.target).text();
            var valNum = $(e.target).attr('code');
            var type = $(e.target).parents('.sele_list').find('.sele_li_tit').attr('data');
            var objData = {
                title: titTxt,
                val: valTxt,
                num: valNum,
                type: type
            };
            //模型添加数据
            mselList.set(objData);
            //添加
            var attrData = {
                type: type
            };
            var removeData = initFilterCollection.where(attrData, true);
            initFilterCollection.remove(removeData);
            initFilterCollection.add(mselList);
        }
    },
    initialize: function () {
        this.render();
        this.listenTo(this.model, 'add', this.render);
    },
    render: function () {
        var ele = this.$el.find('.sele_li_list a');
        $('.sele_c_list').empty();
        this.model.each(function (v,i) {
            var num = v.attributes.num;
            var vsel = new Vsel({model: v});
            $('.sele_c_list').append(vsel.el);
            var type = v.attributes.type;
            $('#'+type).val(num);
            listSiteSchoolGet.courseListInit({
                currPage: 1,
                callback: listInit.myCourseInit,
                tem: '#courseListTemplate'
            });
            if (num) {
                ele.each(function (i, v) {
                    var code = $(v).attr('code');
                    if (num == code) {
                        $(v).addClass('f_ff8000');
                        return false;
                    }
                });
            }
        });
    }
});
var selLists = new SelLists({model: initFilterCollection});
function removeData(){
    $('.sele_c_list').html('');
    $('.sele_list a').removeClass('f_ff8000');
    $('#courseType').val('ignore');
    $('#subjectId').val('ignore');
    $('#addressCode').val('ignore');
    initFilterCollection.models = [];
}
$('#mainNavSchool,#mainNavCourse,#mainNavPtCourse,#mainNavVideoCourse').click(function(){
    removeData();
});

/**********************************************************************************/

