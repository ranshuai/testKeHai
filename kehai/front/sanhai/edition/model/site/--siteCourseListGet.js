/*
 * 网站选择课程列表
 * */


define(function () {

    var money = require('../../vendors/libs/money');

    function SiteCourseListGet() {  
    }      
    /*
        *   根据科目查找今日推荐
    */
    // SiteCourseListGet.prototype.getTodayCon = function (ele) {
    //     var $this = this;
    //     var subjectId = "";
    //
    //     if (!ele) {
    //         subjectId = "10010";
    //     } else {
    //         var subjectType = ele.text();
    //         var json = {
    //             "语文": "10010",
    //             "数学": "10011",
    //             "英语": "10012",
    //             "物理": "10014",
    //             "化学": "10015"
    //         };
    //         subjectId = json[subjectType];
    //     }
    //     $.ajax({
    //         type: "post",
    //         url: "/site/index/selectterdayCourBysubjectId.r",
    //         dataType: "json",
    //         data: {
    //             "subjectId": subjectId
    //         },
    //         success: function (result) {
    //             var TodayCon = result.data.terdayCour.data;
    //             $this.TodayCon(TodayCon);
    //         },
    //         error: function () {
    //         }
    //
    //     });
    // };
    // SiteCourseListGet.prototype.TodayCon = function (value) {
    //     var tab = "";
    //     for (var i = 0; i < value.length; i++) {
    //         var val = value[i];
    //         var courseurl = "";
    //         if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
    //             courseurl = "/front/sanhai/images/course.png";
    //         } else {
    //             // http://localhost:8080/file/loadImage/{图片ID}}/{宽度}/{高度}.r
    //             courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
    //         }
    //         if (i % 3 == 0 && i < 6) {
    //             //2015-08-29 蒋淼修改
    //             //var price= parseFloat(val.price)/100;
    //             var price = money.fmoney(Number(val.price) / 100, 2);
    //             var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
    //             var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
    //             tab += " <dl class='terdayCour'>" +
    //                 "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
    //                 "<dd>" +
    //                 "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
    //                 "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
    //                 "<span class='red fr'>" + price + "</span>" +
    //                 "</dd>" +
    //                 "</dl>"
    //         } else if (i != 0 && i < 6) {
    //             var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
    //             var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
    //             //var price= parseFloat(val.price)/100;
    //             var price = money.fmoney(Number(val.price) / 100, 2);
    //             tab += " <dl class='terdayCour'>" +
    //                 "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
    //                 "<dd>" +
    //                 "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
    //                 "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
    //                 "<span class='red fr'>" + price + "</span>" +
    //                 "</dd>" +
    //                 "</dl>"
    //         } else {
    //             break
    //         }
    //     }
    //     $(".tabItem").eq(0).html(tab);
    // };

    /*
        *  根据科目查找热门课程
    */
    // SiteCourseListGet.prototype.getSelectGoodContent = function (ele) {
    //     var $this = this;
    //     var subjectId = "";
    //
    //     if (!ele) {
    //         subjectId = "10010";
    //     } else {
    //         var subjectType = ele.text();
    //         var json = {
    //             "语文": "10010",
    //             "数学": "10011",
    //             "英语": "10012",
    //             "物理": "10014",
    //             "化学": "10015"
    //         };
    //         subjectId = json[subjectType];
    //     }
    //
    //     $.ajax({
    //         type: "post",
    //         url: "/site/hotCourse/" + subjectId + ".r",
    //         dataType: "json",
    //         success: function (result) {
    //
    //             var goodCour = result.data.goodCour.data;//今日推荐课程
    //             $this.good(goodCour);
    //         },
    //         error: function (xhr, status, error) {
    //             //alert("请求失败.");
    //         }
    //     });
    // };
    // SiteCourseListGet.prototype.good = function (value) {
    //     var tab = "";
    //     for (var i = 0; i < value.length; i++) {
    //         var courseurl = "";
    //         var val = value[i];
    //         if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
    //             courseurl = "/front/sanhai/images/course.png";
    //         } else {
    //             courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
    //             //courseurl="/file/loadImage/" + val.advertiseResId + ".r?dim=241";
    //         }
    //         if (i % 3 == 0 && i < 6) {
    //             //var price= parseFloat(val.price)/100;
    //             var price = money.fmoney(Number(val.price) / 100, 2);
    //             var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
    //             var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
    //             tab += " <dl class='terdayCour'>" +
    //                 "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
    //                 "<dd>" +
    //                 "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
    //                 "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
    //                 "<span class='red fr'>" + price + "</span>" +
    //                 "</dd>" +
    //                 "</dl>"
    //         } else if (i != 0 && i < 6) {
    //             var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
    //             var orgId = val.orgEntity == null ? "" : val.orgEntity.orgId;
    //             //var price= parseFloat(val.price)/100;
    //             var price = money.fmoney(Number(val.price) / 100, 2);
    //             tab += " <dl class='terdayCour'>" +
    //                 "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
    //                 "<dd>" +
    //                 "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
    //                 "<span class='fl'><a title='" + orgname + "' href='/site/shool/" + orgId + "/findCourseByorgId.htm'>" + orgname + "</a></span>" +
    //                 "<span class='red fr'>" + price + "</span>" +
    //                 "</dd>" +
    //                 "</dl>"
    //         } else {
    //             break
    //         }
    //     }
    //     $('.tabItem').eq(1).html(tab);
    // };
    /*
        *   网站一对一列表
    */
    // SiteCourseListGet.prototype.onetoone = function () {
    //     $.ajax({
    //         url: "/site/loadIndexData.do",
    //         type: "post",
    //         dataType: "json",
    //         success: function (response) {
    //             var value = response.data.onetooneCour.data;
    //             var tab = "";
    //             for (var i = 0; i < value.length; i++) {
    //                 if (i < 4) {
    //                     var courseurl = "";
    //                     var val = value[i];
    //                     if (val.advertiseResId == "" || val.advertiseResId == 0 || val.advertiseResId == undefined) {
    //                         courseurl = "/front/sanhai/images/course.png";
    //                     } else {
    //                         courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
    //                     }
    //                     //var price= parseFloat(val.price)/100;
    //                     var price = money.fmoney(Number(val.price) / 100, 2);
    //                     var duration = parseFloat(val.duration) / 60;
    //                     tab += "<dl class='terdayCour'>" +
    //                         "<dt><a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a></dt>" +
    //                         "<dd>" +
    //                         "<h5><a title='" + val.courseTitle + "' href='/site/course/" + val.courseId + "/courseContent.htm'>" + val.courseTitle + "</a></h5>" +
    //                         "<span class='fl'>" + duration + "课时 | " + val.buyCount + "人在学</span>" +
    //                         "<span class='red fr'>" + price + "</span>" +
    //                         "</dd>" +
    //                         "<dd><a href=''><!--<i></i>--></a></dd>" +
    //                         "</dl>";
    //                 } else {
    //                     break
    //                 }
    //             }
    //             $("#onetooneCour").html(tab);
    //         },
    //         error: function (res) {
    //             alert(res);
    //
    //         }
    //     });
    //
    //
    // };

    return new SiteCourseListGet()
});

