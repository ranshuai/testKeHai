/**
 * Created by bbb on 2015/12/9.
 */

define(['jquery','base'],function($){

    function siteMainNav(){
        this.$a=$('.class_type_content').children('p').children('a');
        this.$b=$('.more_class_cont').children('li').children('a');
    }

    siteMainNav.prototype.getSubjectId=function (subject) {
        switch (subject) {
            case "语文":
                return "10010";
            case "数学":
                return "10011";
            case "英语":
                return "10012";
            case "生物":
                return "10013";
            case "物理":
                return "10014";
            case "化学":
                return "10015";
            case "地理":
                return "10016";
            case "历史":
                return "10017";
            case "政治":
                return "10018";
            case "品德与生活":
                return "10019";
            case "美术":
                return "10020";
            case "音乐":
                return "10021";
            case "体育":
                return "10022";
            case "信息技术":
                return "10023";
            case "法制":
                return "10024";
            case "综合实践":
                return "10025";
            case "科学":
                return "10026";
            case "理综":
                return "10027";
            case "文综":
                return "10028";
            case "思想品德":
                return "10029";
            default :
                return "";
        }
    };

    /**
     * 首页左侧菜单事件
     * @param content   事件触发元素
     * @param level     菜单级别 1 = 第一级；2 = 第二级
     */
    siteMainNav.prototype.toSelectMainCourse= function (content, level) {
        var subjectId = this.getSubjectId(content.text());
        var tmp, courseType;

        if (1 == level) {
            tmp = content.parent("p").parent("div").find("h3").eq(0).html();
        } else if (2 == level) {
            tmp = content.parent("li").parent("ul").parent("div").find("h3").eq(0).html();
        }

        if (3 == level) courseType = "ignore"//不选课程类型
        if ("小学" == tmp) courseType = "1";
        if ("小升初" == tmp) courseType = "2";
        if ("初中" == tmp) courseType = "3";
        if ("中考" == tmp) courseType = "4";
        if ("高中" == tmp) courseType = "5";
        if ("高考" == tmp) courseType = "6";

        var url = "/site/course/" + courseType + "/" + subjectId + "/selectCourse.htm";
        location.href = url;
    };

    siteMainNav.prototype.bindEvent = function () {
        var t = this;
        $.each(t.$a, function (index, value) {
            $(value).bind('click', function (event) {
                t.toSelectMainCourse($(this),1);
            });
        });
        $.each(t.$b, function (index, value) {
            $(value).bind('click', function (event) {
                t.toSelectMainCourse($(this),2);
            });
        });
    };
    siteMainNav.prototype._init = function () {
        var t = this;
        t.bindEvent();
    };
    siteMainNav.prototype.render = function () {
        this._init();
    };

    return siteMainNav;

});
