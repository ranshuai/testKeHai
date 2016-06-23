define(["jquery","module/collectionAndattention",'dialogs', "sanhai-base64" ],
    function($,collectionAndattention, dialog){

        /*取消收藏*/
        this.deleteCollection = function() {
            var objid = $('#courseid').val();
            $.ajax({
                url: "/collection/deleteCollection.do",
                type: "post",
                dataType: "json",
                data: {
                    courseId: objid
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        obje.parent('dt').parent('dl').parent('div').remove();

                        $(".pushNotice,.pushNotice_agree").dialog("close");
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                }
            });
        }

        this.topay = function(obj) {//直接支付
            var courseMode = obj.parent('div').children('input').eq(1).val();
            var courseId = obj.parent('div').children('input').eq(0).val();
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

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        var orderid = response.data.orderId;
                        var coursesName = response.data.coursesName;
                        var cousData = orderid;
                        var shoppingcount = 1;

                        var paymoney = response.data.couresePrice;
                        var data = encode64(shoppingcount + "&" + paymoney + "&" + cousData);//加密
                        /*window.location.href = "/shopping/PayMoney.htm?cousTitle=" + encodeURI(encodeURI(coursesName)) + "&data=" + data;*/
                        window.location.href = "/shopping/shoppingCarTrade.htm?tradeOrder=" +orderid;
                        /* window.location.href = "/shopping/PayMoney.htm?shoppingcount=1&payMoney=" + encodeURI(encodeURI(paymoney)) + "&cousData=" + encodeURI(encodeURI(cousData)) + "&cousTitle=" + encodeURI(encodeURI(coursesName));*/
                        $(".pushNotice").dialog("close");
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                        $(".pushNotice").dialog("close");
                    }
                    // 2015-10-16 蒋淼修改中在add.do中校验只有学生用户可以加入购物车
                    if("300" == response.resCode){
                        dialog._wait(response.resMsg,2, null);

                    }
                }
            });
        }

        return{
            init:function(){
                $('.left_menu a').bind('click', function () {
                    //alert($('.left_menu a').length);
                    $('.left_menu li').removeClass('cur');
                    $(this).parents('li').addClass('cur');
                    var index = $(this).parents('li').index();
                    var aBi = $('.left_menu i');
                    for (var i = 0; i < aBi.length; i++) {
                        $('.left_menu i').eq(i).removeClass('ac');

                        $('.left_menu i').eq(index).addClass('ac');
                    }

                });

                /*tab切换*/
                $('.tab .tabList li').click(function () {

                    var index = $(this).index();
                    $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
                    /*$('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();*/
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
                /*同意申请*/
                $('.pushBtnJs_agree').click(function () {
                    $("#pushNotice_agree").dialog("open");
                    return false;
                });
                //清除选项
                $('.cancelBtn').click(function () {
                    $(".pushNotice,.pushNotice_agree").dialog("close");
                });


                $('.tab .main_l_nav_cont_row').mouseover(function () {
                    $(this).find('i').css('display', 'block');

                }).mouseout(function () {
                    $(this).find('i').css('display', 'none');
                });



                var attention = new collectionAndattention();
                $(".loadCollection").click(function(){
                    var flag = $(this).attr("data");
                    attention.loadCollection(1, flag);

                });
                attention.loadCollection(1, -1);
            }
        }

    });