/**
 * Created by bbb on 2015/12/15.
 */
define([
        'jquery',
        'showSelectNav',
        'loadHotCourse',
        'siteCourseList',
        'app/site/siteMainNav',
        'app/site/siteSearchBar',

        'app/site/siteTopBar',
        'money',
        'common',
        'base'
    ],

    function ($, showSelectNav, loadHotCourse, siteCourseList, siteMainNav, siteSearchBar, siteTopBar) {

        function courseListDo() {

        }

        soft = function (val) {
            if (val == 1) {//综合
                $("#sortType").val("000");

                siteCourseList.loadSelectCourse(1);

            }
            if (val == 2) {//人气
                $("#sortType").val("001");

                siteCourseList.loadSelectCourse(1);

            }
            if (val == 3) {//销量
                $("#sortType").val("002");

                siteCourseList.loadSelectCourse(1);

            }
            if (val == 4) {//评价
                $("#sortType").val("003");

                siteCourseList.loadSelectCourse(1);

            }
        }

        courseListDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            var oUl = $('#js-sidebar');
            var aLi = oUl.children();
            var aUl = $('.more_class_cont');
            var timer = null;
            aLi.mouseover(function () {
                var $this = $(this);
                aLi.removeClass('active');
                $this.addClass('active');
                aUl.addClass('hide');
                var index = $this.index();
                aUl.eq(index).removeClass('hide');
                aLi.css({
                    'cursor': 'pointer'
                });
            });
            aLi.mouseout(function () {
                aLi.removeClass('active');
                aUl.addClass('hide');
            });
            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'})
            //搜索框的机构切换
            $('.select_type_List').rSetUpTab();

            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();
            //综合排序点击高亮效果
            Kh.allSorting();
            /*******************左侧栏***********************/
            try {

                /*设置当前页面MainNav的选中状态*/
                var pageIdentity = $("#pageIdentity").val();
                $("#" + pageIdentity).addClass("ac");
                if (pageIdentity == "mainNavIndex") {
                    $("#mainNavBarMenu").removeClass("hide");
                } else {
                    $("#mainNavBarMenu").addClass("hide");
                    // $("#mainNavToggle").click(function(){
                    //     $("#mainNavBarMenu").toggle();
                    // });
                    $(".all_class_type ").hover(function () {
                        $("#mainNavBarMenu").removeClass('hide');
                    }, function () {
                        $("#mainNavBarMenu").addClass('hide');
                    });


                }
            } catch (error) {
                //console.log(error.toString());
            }

             /*******************************排序************************************/


            if (courseListData.courseType) {
                $("#courseType").val(courseListData.courseType);
            }
            if (courseListData.gradeId) {
                $("#gradeId").val(courseListData.gradeId);
            }
            if (courseListData.subjectId) {
                $("#subjectId").val(courseListData.subjectId);
            }
            if (courseListData.versionId) {
                $("#versionId").val(courseListData.versionId);
            }
            if (courseListData.courseMode) {
                $("#courseMode").val(courseListData.courseMode);
            }
            if (courseListData.courseTitle) {
                $("#courseTitle").val(courseListData.courseTitle);
            }

            $('.updown').toggle(function () {
                $(this).find('em').attr('class', 'js-slideUp_downw');
                $("#sortType").val("010");
                    siteCourseList.loadSelectCourse(1);

            }, function () {
                $(this).find('em').attr('class', 'js-slideDown_upw');
                $("#sortType").val("020");
                    siteCourseList.loadSelectCourse(1);
            })
        };
        courseListDo.prototype._init = function () {
            var t = this;
            t.init();
            new siteTopBar().render();
            showSelectNav.showSelectNav(siteCourseList.loadSelectCourse);
            siteCourseList.loadSelectCourse(1);
            loadHotCourse.loadHotCourse();
            new siteMainNav().render();
            new siteSearchBar().render();
        };
        courseListDo.prototype.render = function () {
            this._init();
        };
        return courseListDo;
    }
);