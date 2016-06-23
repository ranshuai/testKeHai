/**
 * Created by bbb on 2015/12/15.
 */
define([
        'jquery',
        'showSelectNav',
        'loadHotCourse',
        'siteVideoList',
        'app/site/siteMainNav',
        'app/site/siteSearchBar',
        'app/site/siteTopBar',
        'dialogs',
        'intoPtCourse',
        'money',
        'common',
        'base'
    ],

    function ($, showSelectNav, loadHotCourse, siteVideoList,siteMainNav,siteSearchBar,siteTopBar,dialogs,intoPtCourse,jquery_ui_min) {
        //视频滑鼠
        $('.videoListMain').on('mouseenter','dl',function(){
            $(this).children('.startStudy').slideDown();
        }).on('mouseleave','dl',function(){
            $(this).children('.startStudy').slideUp();
        });

        var userId = user.userId;
        var userIdentity=user.userIdentity;
        /******************************不显示短板暂时注释*******************************************/
        /*if(userIdentity == '2'){
            if (userId == "null") {
                $('.sele_cont ').removeClass('hide');
                $('.sele_list_warp').removeClass('hide');
                $('.main_l_nav ').removeClass('hide');
            }else{
                $('.frame_l_l').addClass('login_border');
                $('.sele_pt_screen').removeClass('hide');
                $('.login_main_l_nav .main_l_nav').removeClass('hide');
                $('.login_main_l_nav ').removeClass('hide');
                $('.ogin_answer').removeClass('hide');
                $('.ogin_sele').removeClass('hide');
            }
        };*/
        /*if(userIdentity != '2'){*/
            $('.sele_cont ').removeClass('hide');
            $('.sele_list_warp').removeClass('hide');
            $('.main_l_nav ').removeClass('hide');
        /*}*/
        /******************************不显示短板暂时注释*******************************************/
        function VideoCourseListDo() {

        }
        soft = function (val) {
            if (val == 1) {//综合
                $("#sortType").val("100");
                siteVideoList.loadSelectvideoCourse(1);
            }
            if (val == 2) {//人气
                $("#sortType").val("101");
                siteVideoList.loadSelectvideoCourse(1);
            }
            if (val == 3) {//销量
                $("#sortType").val("102");
                siteVideoList.loadSelectvideoCourse(1);
            }
            if (val == 4) {//评价
                $("#sortType").val("103");
                siteVideoList.loadSelectvideoCourse(1);
            }
        }
        VideoCourseListDo.prototype.init = function () {
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
            /***************************************************/
            if (ptCourseData.courseType) {
                $("#courseType").val(ptCourseData.courseType);
            }
            if (ptCourseData.gradeId) {
                $("#gradeId").val(ptCourseData.gradeId);
            }
            if (ptCourseData.subjectId) {
                $("#subjectId").val(ptCourseData.subjectId);
            }
            if (ptCourseData.versionId) {
                $("#versionId").val(ptCourseData.versionId);
            }
            if (ptCourseData.courseMode) {
                $("#courseMode").val(ptCourseData.courseMode);
            }
            if (ptCourseData.courseTitle) {
                $("#courseTitle").val(ptCourseData.courseTitle);
            }
            if (ptCourseData.theme) {
                $("#theme").val(ptCourseData.theme);
            }

// debugger;
            siteVideoList.loadSelectvideoCourse(1);


            $("#contentDiv").undelegate("button.go_pt", null);
            $("#contentDiv").delegate("button.go_pt", "click", function(){
                var ptId = $(this).attr("data");
                //console.log(ptId);
                var classStartTime = parseFloat($(this).attr("time"));
                var time = new Date().getTime();
                //判断是否登录
                var userId = ptCourseData.userId;
                if (userId == "null"){
                    location.href = "/login.htm";
                    return;
                }
                //旁听卡进入教室
                if (time >= classStartTime) {
                    dialogs._audit_paytwo(function(){new intoPtCourse().timeIntoClass(ptId)}, null);
                } else{
                    dialogs._audit_payone(function(){new intoPtCourse().timeIntoClass(ptId)}, null);
                }
            });

            $('.updown').toggle(function () {
                $("#sortType").val("103");
                siteVideoList.loadSelectvideoCourse(1);

            }, function () {
                $("#sortType").val("104");
                siteVideoList.loadSelectvideoCourse(1);
            })

            $('.active').toggle(function () {
                $("#sortType").val("100");
                siteVideoList.loadSelectvideoCourse(1);

            }, function () {
                $("#sortType").val("99");
                siteVideoList.loadSelectvideoCourse(1);
            })
        };
        VideoCourseListDo.prototype._init = function () {
            var t = this;
            t.init();
            new siteTopBar().render();
            siteVideoList.showSelectNav(siteVideoList.loadSelectvideoCourse)
            //siteVideoList.loadSelectvideoCourse(1);
            loadHotCourse.loadHotCourse();
            new siteMainNav().render();
            new siteSearchBar().render();
        };
        VideoCourseListDo.prototype.render = function () {
            this._init();
        };

        /*知识点错题筛选pt课程*/
        $('.sele_pt_screen_tit li').click(function(){
            var index = $(this).index();
            //console.log(index)
            if(index ==1){
                $("#courseCount").html('');
                $('.ogin_answer').addClass('hide');
                $("#searchtype").val("Know");
                $('#subjectId').val('ignore');
                $("#dataId").val('ignore');
                $('.sele_pt_screen_con').find('.sele_pt_screen_con_item').eq(index).find('a').removeClass('ac');
                $('.sele_pt_screen_con').find('.sele_pt_screen_con_item').eq(index).find('.courseAll').addClass('ac');
            }else{
                $("#courseCount").html('');
                $('.ogin_answer').removeClass('hide');
                $("#searchtype").val("Topic");
                $('#subjectId').val('ignore');
                $("#dataId").val('ignore');
                $('.sele_pt_screen_con').find('.sele_pt_screen_con_item').eq(index).find('a').removeClass('ac');
                $('.sele_pt_screen_con').find('.sele_pt_screen_con_item').eq(index).find('.courseAll').addClass('ac');
            }
            $(this).find('a').addClass('blue');
            $(this).siblings().find('a').removeClass('blue');
            $(this).find('i').removeClass('hide');
            $(this).siblings().find('i').addClass('hide');
            $('.sele_pt_screen_con .sele_pt_screen_con_item').eq(index).removeClass('hide').siblings().addClass('hide');
            siteVideoList.loadSelectvideoCourse(1);
        });
        /*点击科目*/
        $('.sele_pt_screen_con_item a').click(function(){
            $(this).addClass('ac');
            $(this).parent().siblings().find('a').removeClass('ac');          
            if($(this).parents('.sele_pt_screen_con_item').find('.tit').text() == '科目'){
                $('#subjectId').val($(this).attr('code'));
                $("#dataId").val('ignore');
            }
            siteVideoList.loadSelectvideoCourse(1);
        });
        //console.log($('.login_main_l_nav .main_l_nav .js-li').size());

        $('.login_border .login_main_l_nav').undelegate();
        $('.login_border .login_main_l_nav').delegate('.main_l_nav .js-li a','click',function(){
            //debugger;
            if($(this).attr('data')==undefined){
                return;
            }
            $(this).addClass('orange');
            $(this).parent('.js-li').siblings().find('a').removeClass('orange');
            /*测试*/
            $('#dataId').val($(this).attr('data'));
            var index = $(this).parent().index();
            var oignore = $('#subjectId').val();
            siteVideoList.loadSelectvideoCourse(1,index,oignore);
        });
         //点击左右切换的箭头
          $('.login_border .login_main_l_nav').delegate('.nav_bg2','click',function(){
                var arr = 0;
                for(var i = 0; i<$(this).parents('.login_main_l_nav ').find('.js-li').size(); i++){
                    arr+=$(this).parents('.login_main_l_nav ').find('.js-li').eq(i).width();
                }
                var scope = $('.main_l_nav_scope').width();
                if(arr>scope){
                    $('.main_l_nav_scope .main_l_nav').css('margin-left','-749px');
                }else{
                   return false;
                }
          });
          $('.login_border .login_main_l_nav').delegate('.nav_bg1','click',function(){
                 $('.main_l_nav_scope .main_l_nav').css('margin-left','0px');
          });
        return VideoCourseListDo;
    }
);