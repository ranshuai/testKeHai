/**
 * Created by bbb on 2015/12/14.
 */
define([
        'jquery',
        'app/site/siteSearchBar',
        'app/site/siteIndex',
        'app/site/siteMainNav',
        'app/site/enterOrganization',
        'app/site/siteTopBar',
        'dialogs',
        'loadAreaAndMatch',
        'base_dialog_standard',
        'money',
        'common',
        'base',
        'lib/jquery_validate/jquery.validate',
        'lib/jquery_validate/addkehai_validate',
        'lib/jquery_validate/messages_zh'

    ],

    function ($,siteSearchBar,siteIndex,siteMainNav,enterOrganization,siteTopBar,dialogs,are,dialog) {

        function indexDo() {

        }

        indexDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            };
            
            /*举手者表单*/
            $('.hands_up').click(function(){

                //判断是否登录
                var userId = user.userId;
                var userIdentity=user.userIdentity;
                /* if (userId == "null") {
                 location.href = "/login.htm";
                 return;
                 }
                 if(userIdentity!=null&&userIdentity!=2){
                 dialogs._wait("请用学生身份登录", 2);
                 return;
                 }*/
                function _change_teacher() {
                    var d=$('<div class="popBox show pushNotice">' +
                        '<div class="popCont sure_del">' +
                        '<div class="popbox_item">' +
                        '<p></p>' +
                        '</div>' +
                        '</div>' +
                        '</div>').appendTo('body');
                    d.addClass('changetea_dialog').attr({'title': '根据您的实际情况做出以下选择'});
                    d.find('p').append($(
                        "<div class='popbox_item tl' >" +
                        "<div class='headsup'></div>" +
                        '<form class="form_list" novalidate="novalidate" id="accountForm" enctype="multipart/form-data">'+

                        '<div class="error_show phone_show hide">'+
                        '<div class="error_message error_message_phone"></div>'+
                        '<div class="row">'+
                        '<div class="formL w80">'+
                        '<label>'+
                        '手机号'+
                        '</label>'+
                        '</div>'+
                        '<div class="formR">'+
                        '<input type="text" id="phoneNumber" name="account" class="w140">'+
                        '</div>'+
                        '</div>'+
                        '</div>'+


                        '<div class="error_show">'+
                        '<div class="error_message"> </div>'+
                        '<div class="row">'+
                        '<div class="formL w80"><label>培训类型</label></div>'+
                        '<div class="formR">'+
                        '<span class="select_plus w150">'+
                        '<em class="highestDegree">升学分析</em>'+
                        '<select class="sel_body valid" id="trainType" name="highestDegree" aria-required="true" aria-invalid="false">'+
                        '<option value="0" selected="selected">升学分析</option>'+
                        '<option value="1">试卷分析</option>'+
                        '<option value="2">学科分析</option>'+
                        '<option value="3">志愿填报</option>'+
                        '<option value="4">专业分析</option>'+
                        '<option value="5">自主招生</option>'+
                        '<option value="6">艺术体育</option>'+
                        '<option value="7">出国留学</option>'+
                        '</select>'+
                        '</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+

                        '<div class="error_show">'+
                        '<div class="error_message"> </div>'+
                        '<div class="row">'+
                        '<div class="formL w80"><label>培训学段</label></div>'+
                        '<div class="formR">'+
                        '<span class="select_plus w150">'+
                        '<em class="highestDegree">小学</em>'+
                        '<select class="sel_body valid" id="trainCourseType" name="highestDegree" aria-required="true" aria-invalid="false">'+
                        '<option value="1" selected="selected">小学</option>'+
                        '<option value="2">小升初</option>'+
                        '<option value="3">初中</option>'+
                        '<option value="4">中考</option>'+
                        '<option value="5">高中</option>'+
                        '<option value="6">高考</option>'+
                        '</select>'+
                        '</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+

                        '<div class="error_show">'+
                        '<div class="error_message"> </div>'+
                        '<div class="row">'+
                        '<div class="formL w80"><label>培训科目</label></div>'+
                        '<div class="formR">'+
                        '<span class="select_plus w150">'+
                        '<em class="highestDegree">语文</em>'+
                        '<select class="sel_body valid" id="subject" name="highestDegree" aria-required="true" aria-invalid="false">'+
                        '<option value="10010" selected="selected">语文</option>'+
                        '<option value="10011">数学</option>'+
                        '<option value="10012">英语</option>'+
                        '<option value="10013">生物</option>'+
                        '<option value="10014">物理</option>'+
                        '<option value="10015">化学</option>'+
                        '<option value="10016">地理</option>'+
                        '<option value="10017">历史</option>'+
                        '<option value="10018">政治</option>'+
                        '<option value="10027">理综</option>'+
                        '<option value="10028">文综</option>'+
                        '</select>'+
                        '</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+
                        '<div class="error_show">'+
                        '<div class="error_message"> </div>'+
                        '<div class="row" style="padding-bottom: 0">'+
                        '<div class="formL w80"><label>所在地</label></div>'+
                        '<div class="formR">'+
                        '<span class="select_plus w150">'+
                        '<em id="provEM" name="provEM" code="null">选择省</em>'+
                        '<select class="sel_body" id="prov" name="prov"><select>'+
                        '</span>'+
                        '<span class="select_plus w150">'+
                        '<em id="countryEM" code="null">选择地区</em>'+
                        '<select class="sel_body" id="country" name="country"></select>'+
                        '</span>'+
                        '<span class="select_plus w150">'+
                        '<em id="cityEM" code="null">选择县</em>'+
                        '<select class="sel_body" id="city" disabled="disabled"></select>'+
                        '</span>'+
                        '</div>'+
                        '</div>'+
                        '</div>'+

                        '<div class="ui-dialog-buttonpane ui-widget-content ui-helper-clearfix" style="display: block">'+
                        '<div class="ui-dialog-buttonset">'+
                        '<button type="submit" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only determineBtn" role="button" id="mySubmit">'+
                        '<span class="ui-button-text">确定</span>'+
                        '</button>'+
                        '<button type="button" class="ui-button ui-widget ui-state-default ui-corner-all ui-button-text-only cancelBtn" role="button">'+
                        '<span class="ui-button-text">取消</span>'+
                        '</button></div>'+
                        '</div>'+

                        "</form>"+
                        "</div>"));
                    d.dialog({
                        autoOpen: true,
                        width: 600,
                        modal: true,
                        resizable: false,
                        close: function () {
                            $(this).remove();
                        }
                    });



                    $('.changetea_dialog').parent().addClass('dialogs_box cht_dialog_box');
                    $('.ui-dialog-buttonset button').eq(0).addClass('determineBtn').parent().children().eq(1).addClass('cancelBtn');

                    are.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);
                    //确定、取消按钮添加事件
                    $('.cht_dialog_box').on('click','.cancelBtn',function(){
                        $(".cht_dialog_box").remove();
                        $(".changetea_dialog").remove();
                    });
                    if (userId == "null") {
                        $('.phone_show').removeClass('hide');
                    }


                    //表单验证
                    $('#mySubmit').click(function(){

                        $("#accountForm").validate({

                            submitHandler: function(form){   //表单提交句柄,为一回调函数，带一个参数：form


                                var trainSubjectID = $("#subject").val();
                                var trainSubject = $("#subject").find("option:selected").text();

                                var trainTypeId = $("#trainType").val();
                                var trainType = $("#trainType").find("option:selected").text();

                                var trainCourseType = $("#trainCourseType").val();

                                var provId = $("#provEM").attr("code");
                                var prov = $("#provEM").text();
                                var countryId = $("#countryEM").attr("code");
                                var country = $("#countryEM").text();
                                var cityId = $("#cityEM").attr("code");
                                var city = $("#cityEM").text();

                                var phoneNumber = $("#phoneNumber").val();

                                if ("null" == provId && "null" == countryId && "null" == cityId) {
                                    var addressCode = "";
                                    var address = "";
                                } else if ("null" != provId && "null" == countryId && "null" == cityId) {
                                    var addressCode = provId;
                                    var address = prov;
                                } else if ("null" != provId && "null" != countryId && "null" == cityId) {
                                    var addressCode = provId + "," + countryId;
                                    var address = prov + "," + country;
                                } else if ("null" != provId && "null" != countryId && "null" != cityId) {
                                    var addressCode = provId + "," + countryId + "," + cityId;
                                    var address = prov + "," + country + "," + city;
                                }

                                $.ajax({
                                    url: "/site/mateConsultant.do",
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        trainTypeId: trainTypeId,
                                        trainType: trainType,
                                        trainCourseType: trainCourseType,
                                        trainSubjectID: trainSubjectID,
                                        trainSubject: trainSubject,
                                        areaCode: addressCode,
                                        areaName: address,
                                        phoneNumber: phoneNumber
                                    }
                                }).success(function(response){
                                    if ("000" == response.resCode) {
                                        dialogs._timer('我们会为您匹配最优秀的课程顾问，请耐心等待',1,2,'')
                                    } else {
                                        dialogs._timer( response.resMsg,2,2,null);
                                    }
                                    $(".cht_dialog_box").remove();
                                    $(".changetea_dialog").remove();
                                }).fail(function(){
                                    $(".cht_dialog_box").remove();
                                    dialogs._timer("请求失败稍后再试",2,2,null);
                                    $(".cht_dialog_box").remove();
                                })

                            },
                            rules: {
                                account: {
                                    required: true,
                                    isAccount:true
                                },
                                prov:{
                                    isAddressAll:true
                                },
                                country:{
                                    required: true
                                }
                            },
                            messages: {
                                account: {
                                    required: "<i></i>手机号不能为空<b></b>"
                                },
                                provEM: {
                                    isAddress:"<i></i>请选择所在地<b></b>"
                                }
                            },
                            errorElement :"em",
                            errorPlacement: function(error, element) { //指定错误信息位置
                                error.appendTo(element.parents(".error_show").find(".error_message"));
                            }
                        });


                    })


                }

                _change_teacher();




            })

            /*轮播图*/
            $('.bannerWrap').rIndexCarousel();
            /*轮播图片始终显示在中间*/
            $('.bannerWrap ul li').css('left','-'+(1920-$(window).width())/2+'px');
            $(window).resize(function(){
                $('.bannerWrap ul li').css('left','-'+(1920-$(window).width())/2+'px');
            });

            /*侧边导航移入移出*/
            $('.class_type').rLeftMenuHover();
            //选项卡
            $('.tab .tabList li').mouseover(function () {
                var index = $('.tab .tabList li').index($(this));
                $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            });
            /*入驻机构切换*/
            // console.log($('.organization_banner_list').children().size());
            // if($('.organization_banner_list').children().size()){
            //      //$('.organization_banner').rOrganizationBanner();
            // }
           

            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'});

            $('.select_type_List').rSetUpTab();

            //客服中心hover效果
            $('.serviceList').rNavhover();
            //切换身份hover效果
            $('.tabRole').rNavhover();


            /*******************左侧栏***********************/
            try {
                var pageIdentity = $("#pageIdentity").val();
                $("#" + pageIdentity).addClass("ac");
                if (pageIdentity == "mainNavIndex") {
                    $("#mainNavBarMenu").removeClass("hide");
                } else {
                    $("#mainNavBarMenu").addClass("hide");
                }
            } catch (error) {
            }
        };
        indexDo.prototype._init = function (data) {
            var t = this;
            t.init();
            new siteTopBar().render();
            new siteSearchBar().render();
            new siteIndex().render(data);
            new siteMainNav().render();
            new enterOrganization().Organization();
        };

        indexDo.prototype.render = function () {
            var $this = this;
            $.ajax({
                url: "/site/loadIndexData.do",
                type: "post",
                dataType: "json",
                success: function (response) {
                    $this._init(response.data);
                }
            });
        };


        return indexDo;
    }
);