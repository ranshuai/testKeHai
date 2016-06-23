/**
 * Created by bbb on 2015/12/8.
 */
define(['jquery', 'common', 'base'], function ($, common) {

    function siteSearchBar() {
        this.$Sercher = $('#sercher');
        this.$search_input = $('#search_input');
    }

    siteSearchBar.prototype.hotData = function () {
        /*$.ajax({
            url: "/site/hotSearchKey.r",
            dataType: "json",
            success: function (res) {
                if (common.checkResponse(res)) {
                    var htmlStr = "";
                    $.each(res.data.hotKeyList, function (index, item) {
                        htmlStr += "<li><a href='" + item.url + "'>" + item.name + "</a></li>";
                    });
                    if (htmlStr.length > 0) {
                        $("#hotSearchKey").html(htmlStr);
                    }
                }
            }
        });*/
        var htmlStr ="<li><a href='/site/course/ignore/10010/courseTransfer.htm'>语文</a></li>" +
            "<li><a href='/site/course/ignore/10011/courseTransfer.htm'>数学</a></li>" +
            "<li><a href='/site/course/ignore/10012/courseTransfer.htm'>英语</a></li>" +
            "<li><a href='/site/course/ignore/10013/courseTransfer.htm'>生物</a></li>" +
            "<li><a href='/site/course/1/ignore/courseTransfer.htm'>小学</a></li>" +
            "<li><a href='/site/course/2/ignore/courseTransfer.htm'>小升初</a></li>";
        $("#hotSearchKey").html(htmlStr);
    };
    /*
     搜索框
     */
    siteSearchBar.prototype.sercher = function () {
        var seltype = $(".sele_type").text();
        var data = $(".subTitleBar_text1").val();
        var seldata = encodeURI(encodeURI(data));
        if($.trim(data)==''){
            return;
        }
        if (seltype == "课程") {
            window.location.href = "/site/course/selectCourse1.htm?courseTitle=" + seldata;
        }
        if (seltype == "学校") {
            window.location.href = "/site/selectschool.htm?orgname=" + seldata;

        }
        if (seltype == "教师") {
            window.location.href = "/site/selectteacher.htm?name=" + seldata;
        }
        if (seltype == "课表") {
            window.location.href = "/site/toselectPtCourse.htm?theme=" + seldata;
        }
        if (seltype == "课海") {
            window.location.href = "/site/toselectVideoCourse.htm?theme=" + seldata;
        }

    };

    siteSearchBar.prototype.bindEvent = function () {
        var t = this;
        t.$Sercher.on('click', function (event) {
            t.sercher();
        });
        t.$search_input.on('keydown', function (event) {
            var theEvent = event || window.event;
            var code = theEvent.keyCode || theEvent.which || theEvent.charCode;
            if (code == 13) {
                t.sercher();
                return false;
            }
            return true;
        });

    };
    siteSearchBar.prototype._init = function () {
        var t = this;
        t.bindEvent();
        t.hotData();
    };
    siteSearchBar.prototype.render = function () {
        this._init();
    };


    return siteSearchBar;

});