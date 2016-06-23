
define(function () {

    function SiteSelectCourseNav() {
    }

    /*
     * getSubjectId
     * */
    SiteSelectCourseNav.prototype.getSubjectId = function (subject) {
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

    /*
     * 首页的左侧菜单事件
     * @param  ele 事件触发的元素
     * @param level 菜单级别 3 = ignore;
     *
     * */
    SiteSelectCourseNav.prototype.toSelectMainCourse = function (ele, level) {
        var subjectId = this.getSubjectId(ele.text());
        var courseType, txt;
        /*判断级别*/

        if(ele.parents('.class_type_content')){
            txt = ele.parents('.class_type_content').find('h3').text();
            var json = {
                "小学": '1',
                "小升初": "2",
                "初中": "3",
                "中考": "4",
                "高中": "5",
                "高考": "6"
            };
            courseType = json[txt];
        }

        if (3 == level) courseType = "ignore";//不选课程类型
        /*跳转到对应的页面*/
        var url = "/site/course/" + courseType + "/" + subjectId + "/selectCourse.htm";
        location.href = url;
    };

    return new SiteSelectCourseNav()
});
