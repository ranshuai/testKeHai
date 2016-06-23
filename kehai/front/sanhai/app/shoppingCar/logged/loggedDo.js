/**
 * Created by weiyan 蒋淼 on 15/12/09.
 */
define("loggedDo", ["money", "common", "dialogs", "base"], function (money, common, dialogs) {

    var initShoppingCar = function () {
        /*只有学生身份显示购物车*/
        if (user.userIdentity == 2) {
            $('.shopping_car').removeClass('hide');
        }
        var RelationCou = shc_logged.course.data.RelationCourese.data;      // 推荐课程
        var ShoppingCou = shc_logged.course.data.shoppingCar;               // 购物车课程

        // 加载购物车信息
        shoppingCarContent(ShoppingCou);

        // 计算金额 2016-02-25 蒋淼将计算金额方法放到渲染完页面后调用计算
        // calculatePrice();

        // 加载推荐课程
        RelationC(RelationCou);

        // 顶部全选按钮事件
        $('.header_list1').children('li').children('input').change(function () {
            if ($('.header_list1').children('li').children('input').attr("checked")) {
                $('.header_list2').children('li').children('input').attr("checked", "checked");
                $('.left_list').children('li').children('input').attr("checked", "checked");
            } else {
                $('.header_list2').children('li').children('input').removeAttr("checked");
                $('.left_list').children('li').children('input').removeAttr("checked");
            }
            calculatePrice();
        });

        // 底部全选按钮事件
        $('.left_list').children('li').children('input').change(function () {
            if ($('.left_list').children('li').children('input').attr("checked")) {
                $('.header_list2').children('li').children('input').attr("checked", "checked");
                $('.header_list1').children('li').children('input').attr("checked", "checked");
            } else {
                $('.header_list2').children('li').children('input').removeAttr("checked");
                $('.header_list1').children('li').children('input').removeAttr("checked");
            }
            calculatePrice();
        });

        // 每个订单选择事件
        $("input[type='checkbox']").change(function () {
            if ($(this).attr("checked"))$(this).attr("checked", "checked");
            else $(this).removeAttr("checked");
            calculatePrice();
        });

        /**
         * 计算购物总数量和总金额
         * @TODO 购物车总数量是依据name=tradeOrder的复选框的选中数量决定的
         * @TODO 购物车总金额是依据name=tradePrice的隐藏域累加计算出来的
         */
        function calculatePrice() {
            var shoppingCarInfo = "";
            var tradeCount = 0;
            var tradeMoney = 0;

            $("input:checkbox[name='tradeOrder']:checked").each(function (index) {
                tradeCount++;
                tradeMoney += Number($(this).parent("li").find("input[name='tradePrice']").val());
            });

            // 显示数量 总价格
            $('.right_list').children('li').eq(0).children('span').text(tradeCount);
            $('.right_list').children('li').eq(1).children('span').text(money.fmoney(Number(tradeMoney) / 100, 2));

            if ($("#Shopping").children('ul').length == 0) {
                shoppingCarInfo += "<div class='please_login_wrap'>";
                shoppingCarInfo += "<dl class='please_login'>";
                shoppingCarInfo += "<dt></dt>";
                shoppingCarInfo += "<dd>";
                shoppingCarInfo += "<h4>您的购物车内暂时没有商品!</h4>";
                shoppingCarInfo += "<a href='/site/course/selectCourse.htm' class='select_class'>去选课></a>";
                shoppingCarInfo += "</dd>";
                shoppingCarInfo += "</dl>";
                shoppingCarInfo += "</div>";
                $("#NoShopping").html(shoppingCarInfo);
            }
        }

        // 从购物车中删除课程
        deleteNormalOrder = function (btn, orderId) {
            if (btn.parents("ul").find("input[name='tradeOrder']").attr("checked")) {
                dialogs._confirm('确定删除吗？', "提示信息", function () {
                    deleteShopping(orderId);
                    btn.parent('div').parent('li').parent('ul').remove();
                }, '');
            } else {
                dialogs._alert("请选择您删除的课程！", "", "");
                return;
            }
        };

        // 过期订单单个删除
        deleteDisableOrder = function (btn, orderId) {
            dialogs._confirm('确定删除吗？', "提示信息", function () {
                deleteShopping(orderId);
                btn.parent('div').parent('li').parent('ul').remove();
            }, '');
        };

        // 删除购物车全部内容
        function deleteAllUl() {
            var dex = $('.header_list2');
            var orderIds = "";
            var selectStatus = 0;
            for (var i = 0; i < dex.length; i++) {
                var de = dex[i];
                if ($(de).children('li').children('input') && $(de).children('li').children('input').attr("checked")) {
                    selectStatus = 1;
                }
            }
            if (selectStatus == 0) {
                dialogs._alert('请选择您删除的课程!', '', '');
                return;
            }
            dialogs._confirm("确定删除吗？", "提示信息", function () {
                $("input:checkbox[name='tradeOrder']:checked").each(function (index) {
                    orderIds += $(this).val() + ",";
                });
                deleteShopping(orderIds.substr(0, orderIds.length - 1));
                //calculatePrice();
            }, "");
            selectStatus = 0;
        }

        $('#shc_delete').click(function () {
            deleteAllUl();
        });

        // 删除订单
        function deleteShopping(orderIds) {
            $.ajax({
                type: "post",
                url: "/shopping/deleteShopping.do",
                dataType: "json",
                data: {
                    "orderIds": orderIds
                },
                success: function (result) {
                    if ("000" == result.resCode)window.location.reload();
                },
                error: function (xhr, status, error) {
                }
            });
        }

        // 购物车课程信息
        function shoppingCarContent(shoppingCarData) {
            if (0 < shoppingCarData.length) {

                var i = 0;
                var shoppingCarInfo = "";
                var shoppingCarInfo1 = "";
                var orderStatus = 0;

                for (var i = 0; i < shoppingCarData.length; i++) {
                    var orderContent = shoppingCarData[i];

                    var id = orderContent.id;                                                     // 订单ID
                    var tradePrice = orderContent.orderActualPrice;                               // 课程实际支付价格
                    var orderPrice = money.fmoney(Number(orderContent.orderActualPrice) / 100, 2);// 订单实际支付价格

                    var courseId = orderContent.courseId;                                         // 课程ID
                    var courseTitle = orderContent.courseTitle;                                   // 课程名称
                    var orderDuration = parseFloat(orderContent.courseTime) / 60;                 // 课时数
                    var courseType = "分类：" + common.df.showcourse(orderContent.courseType);
                    var courseGrade = "年级：" + common.df.showClass(orderContent.gradeId);
                    var courseSubject = "科目：" + common.df.show_courseCode(orderContent.subjectId);

                    var courseImage = "/front/sanhai/images/course.png";                          // 课程图片
                    var courseMode = "一对一";                                                     // 课程类型
                    var courseTime = "";                                                          // 课时数
                    var courseURL = "";                                                           // 课程链接
                    var courseRemark = "备注：";
                    var isExistCoupons = orderContent.isExistCoupons;                             // 用户是否有可用且为过期优惠
                    var isCoupons = orderContent.isCoupons;                                       // 是否有以使用优惠
                    var isBuyVideo = "";

                    /* ------------------------------------------------------------------------------------------- */
                    // 关联 + 未使用 优惠券总数量
                    var countCou = orderContent.countCou;
                    //console.log("关联 + 未使用 总数量：" + countCou);

                    // 关联数量
                    var usedCou = orderContent.usedCou;

                    // 未使用数量
                    var useCou = orderContent.useCou;
                    //console.log("未使用 数量：" + useCou);
                    /* ------------------------------------------------------------------------------------------- */

                    var couponsElement = "";                                                      // 优惠列表元素

                    // 处理一对一（只初始化本类型需要的）
                    if (0 == orderContent.courseMode) {
                        if (orderContent.advertiseResId != "" && orderContent.advertiseResId != 0) {
                            courseImage = "/file/loadImage/" + orderContent.advertiseResId + "/180/111.r";
                        }

                        courseMode = "一对一";
                        courseURL = "/site/course/" + courseId + "/courseContent.htm";

                        courseTime = "共" + orderDuration + "小时";
                        courseRemark = courseRemark + (orderContent.remark ? orderContent.remark : '');

                        if (0 != usedCou) {           // 有关联 和 为使用的优惠券

                            if ("1" == isCoupons) {      // 当前一对一课程订单的已经关联了优惠券
                                $.each(orderContent.coupons, function (index, value) {  // 这个循环本质只执行一次
                                    couponsElement += "<span class='useCoupon pr'><i class='useCoupon_1bg pa'></i><i class='useCoupon_2bg pa hide'></i>";

                                    if (0 == value.couponsType)
                                        couponsElement += "<em class='font12 blue' style='display:block; text-align:center; line-height:24px;'>主听券[" + value.couponsCount + "]张</em>";
                                    else
                                        couponsElement += "<em class='font12 blue' style='display:block; text-align:center; line-height:24px;'>使用优惠券</em>";

                                    couponsElement += "<span class='useCoupon_con pa'>";

                                    if (0 == value.couponsType)
                                        couponsElement += "<span><input type='radio' name='radio" + i + "' checked='checked' disabled='disabled' /><label>主听券[" + value.couponsCount + "]张</label></span>";
                                    else
                                        couponsElement += "<span><input type='radio' name='radio" + i + "' /><label>主听券[" + value.couponsCount + "]张</label></span>";

                                    couponsElement += "<span><input type='radio' name='radio' /><label>暂不使用</label></span>";
                                    couponsElement += "</span></span></p>";
                                });
                            } else {
                                //var aaa = (useCou >2 )? 2 : useCou;
                                var _tmp = 1;

                                if (orderDuration == 1 && useCou > 1) {
                                    _tmp = 1;
                                } if (orderDuration > 4 && useCou > 4) {
                                    _tmp = 4;
                                } else {
                                    _tmp = orderDuration>4? 4: orderDuration;
                                }

                                if (0 != useCou && 0 != usedCou) {
                                    couponsElement += "<span class='useCoupon pr'><i class='useCoupon_1bg pa'></i><i class='useCoupon_2bg pa hide'></i>";
                                    couponsElement += "<em class='font12 blue' style='display:block; text-align:center; line-height:24px;'>使用优惠券</em>";
                                    couponsElement += "<span class='useCoupon_con pa'>";
                                    couponsElement += "<span><input type='radio' name='radio' value='" + _tmp + "' /><label >主听券[" + _tmp + "]张</label></span>";
                                    couponsElement += "<span><input type='radio' name='radio' /><label >暂不使用</label></span>";
                                    couponsElement += "</span></span></p>";
                                }
                            }
                        } else if (0 != useCou) {

                            var _tmp = 1;

                            if (orderDuration == 1 && useCou > 1) {
                                _tmp = 1;
                            } if (orderDuration > 4 && useCou > 4) {
                                _tmp = 4;
                            } else {
                                _tmp = orderDuration>4? 4: orderDuration;
                            }

                            //if(0 != useCou || 0 != usedCou){
                            couponsElement += "<span class='useCoupon pr'><i class='useCoupon_1bg pa'></i><i class='useCoupon_2bg pa hide'></i>";
                            couponsElement += "<em class='font12 blue' style='display:block; text-align:center; line-height:24px;'>使用优惠券</em>";
                            couponsElement += "<span class='useCoupon_con pa'>";
                            couponsElement += "<span><input type='radio' name='radio' value='" + _tmp + "' /><label >主听券[" + _tmp + "]张</label></span>";
                            couponsElement += "<span><input type='radio' name='radio' /><label >暂不使用</label></span>";
                            couponsElement += "</span></span></p>";
                            //}
                        }

                    }

                    // 处理陪读
                    if (2 == orderContent.courseMode) {
                        if ("" != orderContent.ppResId && 0 != orderContent.ppResId) {
                            courseImage = "/file/loadImage/" + orderContent.ppResId + "/180/111.r";
                        }
                    }

                    // 处理视频（只初始化本类型需要的）
                    if (3 == orderContent.courseMode) {
                        if ("" != orderContent.videoResId && 0 != orderContent.videoResId) {
                            courseImage = "/file/loadImage/" + orderContent.videoResId + "/180/111.r";
                        }

                        courseMode = "视频";
                        courseURL = "/site/videoCourse/" + courseId + "/detail.htm";
                        if (1 == orderContent.isBuyVideo) {
                            isBuyVideo += "<span class='useCoupon pr'>";
                            isBuyVideo += "<em class='font12 blue' style='display:block; text-align:center; line-height:24px;'>视频课程已购买</em>";
                            isBuyVideo += "</span>";
                        } else {
                            isBuyVideo += "";
                        }
                    }

                    // 订单状态是否过期
                    if (0 == orderContent.disable&&orderContent.listed != 2) {

                        shoppingCarInfo1 += "<ul class='header_list2 clearfix'>";
                        shoppingCarInfo1 += "<li style='width:235px' class='list2_li1'>";
                        shoppingCarInfo1 += "<input type='checkbox' name='tradeOrder' checked='checked' value='" + id + "'>";
                        shoppingCarInfo1 += "<input type='hidden' name='tradePrice' value='" + tradePrice + "'>";
                        shoppingCarInfo1 += "<a href='" + courseURL + "'>";
                        shoppingCarInfo1 += "<img STYLE='width:180px; height: 111px;' src='" + courseImage + "'/>";
                        shoppingCarInfo1 += "</a>";
                        shoppingCarInfo1 += "</li>";
                        shoppingCarInfo1 += "<li class='list2_li2'>";
                        shoppingCarInfo1 += "<h4><a href='" + courseURL + "'>" + courseTitle + "</a><span>" + courseMode + "</span></h4>";
                        shoppingCarInfo1 += "<p class='pr'><span>" + courseType + "</span><span>" + courseGrade + "</span><span class='list2_li3'>" + courseTime + "</span><strong class='list2_li4 pa'>" + orderPrice + "</strong>";

                        // 优惠
                        if (0 == orderContent.courseMode)shoppingCarInfo1 += couponsElement;
                        if (3 == orderContent.courseMode)shoppingCarInfo1 += isBuyVideo;

                        shoppingCarInfo1 += "<p><span>" + courseSubject + "</span></p>";
                        shoppingCarInfo1 += "<p class='clearfix'><em style='float: left'>备注：</em><span style='width: 700px; float: left'>" + (orderContent.remark ? orderContent.remark : '') + "</span></p>";
                        shoppingCarInfo1 += "</li>";
                        shoppingCarInfo1 += "<li style='width:89px;' class='list2_li5 pr'>";
                        shoppingCarInfo1 += "<div class='add_save'>";
                        /* "<a href='javascript:;'>加入收藏夹</a>"+*/
                        shoppingCarInfo1 += "<br><a onclick='deleteNormalOrder($(this), \"" + id + "\")'>删除</a>";
                        //shoppingCarInfo1 += "<br><a class='shcmd_delete'>删除</a>";
                        shoppingCarInfo1 += "</div>";
                        shoppingCarInfo1 += "<div class='OK_saveing pr hide'>";
                        shoppingCarInfo1 += "<span class='pa'><i class='bg bg_ok_save'></i><em>成功移至收藏夹！</em></span>";
                        shoppingCarInfo1 += "</div>";
                        shoppingCarInfo1 += "<div class='change_remark pa'>";
                        shoppingCarInfo1 += "<a onclick='updateOrderRemark($(this),\"" + id + "\")'>" + (orderContent.remark ? '修改备注' : '增加备注') + "</a>";
                        //shoppingCarInfo1 += "<a class='shd_updateOrderRemark'>" + (orderContent.remark ? '修改备注' : '增加备注') + "</a>";
                        shoppingCarInfo1 += "</div>";
                        shoppingCarInfo1 += "</li>";

                        if (orderContent.listed == 2) {
                            shoppingCarInfo1 += "<li class='pay_wrong'>已下架</li>";
                        }

                        shoppingCarInfo1 += "</ul>";

                    } else {

                        if (orderStatus == 0) {
                            shoppingCarInfo += "<ul class='have_expired'><li><h2>已过期|已下架</h2></li></ul>";
                            orderStatus = 1;
                        }

                        if (orderContent.courseMode == 2) {
                            if (orderContent.ppResId == "" || orderContent.ppResId == 0) {
                                var personUrl = "/front/sanhai/images/person.png";
                            } else {
                                var personUrl = "/file/loadImage/" + orderContent.ppResId + "/180/111.r";
                            }
                            shoppingCarInfo += "<ul class='header_list11 clearfix'>";
                            shoppingCarInfo += "<li style='width:235px;' class='list2_li1'>";
                            shoppingCarInfo += "<a href='/site/course/" + orderContent.coursesId + "/courseContent.htm'>";
                            shoppingCarInfo += "<img STYLE='width:182px; height: 109px; margin-left:38px;' src='" + personUrl + "'/>";
                            shoppingCarInfo += "</a>";
                            shoppingCarInfo += "</li>";
                            shoppingCarInfo += "<li class='list2_li2'>";
                            shoppingCarInfo += "<h4><a href=''>" + orderContent.name + "</a><span>陪读</span></h4>";
                            shoppingCarInfo += "<p class='pr'><span>身份：大学生</span><span></span><span class='list2_li3'>" + orderContent.duration + "个月</span><strong class='list2_li4'>" + orderPrice + "</strong></p>";
                            shoppingCarInfo += "<p><span>就读学校：" + (orderContent.school == undefined ? "" : orderContent.school) + "</span></p>";
                            shoppingCarInfo += "<p class='clearfix'><em style='float: left'>专业：</em><span style='width: 700px; float: left'>" + (orderContent.major == undefined ? "" : orderContent.major) + "</span></p>";
                            shoppingCarInfo += "<p >" + (orderContent.remark ? '备注：' + orderContent.remark : '') + "</p>";
                            shoppingCarInfo += "</li>";
                            shoppingCarInfo += "<li style='width:89px;' class='list2_li5 pr'>";
                            shoppingCarInfo += "<div class='add_save'>";
                            /*"<a href='javascript:;'>加入收藏夹</a>"+*/
                            shoppingCarInfo += "<br><a onclick='deleteDisableOrder($(this),\"" + orderContent.id + "\")'>删除</a>";
                            //shoppingCarInfo += "<br><a class='shcmd_delete1'>删除</a>";

                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "<div class='OK_saveing pr hide'>"
                            shoppingCarInfo += "<span class='pa'><i class='bg bg_ok_save'></i><em>成功移至收藏夹！</em></span>";
                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "<div class='change_remark pa'>";
                            //" <a href='javascript:;'class='' onclick='updateRemark($(this))'>"+(val.remark?'修改备注':'增加备注')+"</a>"+
                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "</li>";

                            if (orderContent.listed == 2) {
                                shoppingCarInfo += "<li class='pay_wrong'>已下架</li>";
                            }

                            if(0 != orderContent.disable){
                                shoppingCarInfo += "<li class='pay_wrong'>已过期</li>";
                            }
                            shoppingCarInfo += "</ul>";
                        } else {
                            var link="/site/course/" + courseId+ "/courseContent.htm";
                            if (orderContent.listed == 2) {
                                link="javascript:void(0);";
                            }
                            shoppingCarInfo += "<ul class='header_list11 clearfix'>";
                            shoppingCarInfo += "<li style='width:235px;' class='list2_li1'>";
                            shoppingCarInfo += "<a href='"+link+"'>";
                            shoppingCarInfo += "<img STYLE='width:182px; height: 109px; margin-left:38px;' src='" + courseImage + "'/>";
                            shoppingCarInfo += "</a>";
                            shoppingCarInfo += "</li>";
                            shoppingCarInfo += "<li class='list2_li2'>";
                            shoppingCarInfo += "<h4><a href='"+link+"'>" + orderContent.courseTitle + "</a><span>一对一</span></h4>";
                            shoppingCarInfo += "<p class='pr'><span>分类：" + common.df.showcourse(orderContent.courseType) + "</span><span>年级：" + orderContent.grade + "</span><span class='list2_li3'>共" + orderDuration + "课时</span><strong class='list2_li4'>" + orderPrice + "</strong></p>";
                            shoppingCarInfo += "<p><span>科目：" + orderContent.subject + "</span></p>";
                            shoppingCarInfo += "<p >" + (orderContent.remark ? '备注：' + orderContent.remark : '') + "</p>";
                            shoppingCarInfo += "</li>";
                            shoppingCarInfo += "<li style='width:89px;' class='list2_li5 pr'>";
                            shoppingCarInfo += "<div class='add_save'>";
                            /*"<a href='javascript:;'>加入收藏夹</a>"+*/
                            shoppingCarInfo += "<br><a onclick='deleteDisableOrder($(this),\"" + orderContent.id + "\")'>删除</a>";
                            //shoppingCarInfo += "<br><a class='shcmd_delete1'>删除</a>";

                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "<div class='OK_saveing pr hide'>"
                            shoppingCarInfo += "<span class='pa'><i class='bg bg_ok_save'></i><em>成功移至收藏夹！</em></span>";
                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "<div class='change_remark pa'>";
                            //" <a href='javascript:;'class='' onclick='updateRemark($(this))'>"+(val.remark?'修改备注':'增加备注')+"</a>"+
                            shoppingCarInfo += "</div>";
                            shoppingCarInfo += "</li>";
                            if (orderContent.listed == 2) {
                                shoppingCarInfo += "<li class='pay_wrong'>已下架</li>";

                            }

                            if(0 != orderContent.disable){
                                shoppingCarInfo += "<li class='pay_wrong'>已过期</li>";
                            }
                            shoppingCarInfo += "</ul>";

                        }

                    }

                    //$('.shcmd_delete').click(function(){ deleteNormalOrder($(this),orderContent.id) })
                    //$('.shcmd_delete1').click(function(){ deleteDisableOrder($(this),orderContent.id) })
                    //$('.shd_updateOrderRemark').click(function(){ updateOrderRemark($(this),orderContent.id) })
                }

                $("#Shopping").html(shoppingCarInfo1 + shoppingCarInfo);

                var bOk = false;                        // 优惠信息菜单是否打开

                $('.useCoupon_con').css('display', 'none');

                $('.useCoupon').click(function () {
                    if (!bOk) {
                        $(this).children('.useCoupon_con ').css('display', 'inline-block');
                        $(this).children('.useCoupon_1bg').addClass('y');
                        $(this).children('.useCoupon_2bg').removeClass('hide');
                        $(this).children('.useCoupon_2bg').css('z-index', '1');
                        bOk = !bOk;
                    } else {
                        $(this).children('.useCoupon_con ').css('display', 'none');
                        $(this).children('.useCoupon_2bg').addClass('hide');
                        $(this).children('.useCoupon_1bg').removeClass('y');
                        $(this).children('.useCoupon_2bg').css('z-index', '0');
                        bOk = !bOk;
                    }
                    $(this).parents('.header_list2 ').css('z-index', '1');
                    $(this).parents('.header_list2 ').siblings().css('z-index', '0');

                });

                // 优惠信息菜单 鼠标移入清除document的事件
                $('.useCoupon').hover(function () {
                    $(document).off('click');
                }, function () {
                    $(document).on('click', function () {
                        $('.useCoupon_con').css('display', 'none');
                        $('.useCoupon_2bg').addClass('hide');
                        bOk = false;
                    });
                });

                /**
                 * 优惠菜单中的input事件
                 */
                $('.useCoupon_con span input').click(function () {
                    var $this = $(this);

                    var text = $(this).next('label').text();
                    $(this).parents('.useCoupon_con').prev().text(text);
                    $('.useCoupon_con').css('display', 'none');
                    $('.useCoupon_2bg').addClass('hide');

                    bOk = false;

                    // 使用优惠的类型
                    var couponsType = $(this).parent().index();

                    // 不用优惠类型不用处理方式
                    switch (couponsType) {
                        case 0:
                            // 获得对应订单ID
                            var orderId = $(this).parents('.list2_li2').prev().find('input[name=tradeOrder]').val();

                            // 获得对应原始价格
                            var orderMoney = $(this).parents('.list2_li2').prev().find('input[name=tradePrice]').val();

                            // 使用券的数量
                            var num = $(this).val();

                            // 请求优惠内容
                            $.ajax({
                                url: "/shopping/preferentialContent.do",
                                type: "post",
                                dataType: "json",
                                data: {
                                    orderId: orderId,
                                    num: num,
                                    code: 0
                                }
                            }).success(function (response, status, xhr) {
                                if ("000" == response.resCode) {
                                    var pMoney = response.data.pMoney;

                                    // 计算优惠后价格
                                    var _money = orderMoney - pMoney;

                                    // 重新赋值到隐藏域和页面
                                    $this.parents('.list2_li2').prev().find('input[name=tradePrice]').val(_money);

                                    // 更新购物车显示价格
                                    $this.parents('.useCoupon').prev().text(money.fmoney(_money / 100, 2));

                                    // 更新购物车总金额
                                    //calculatePrice();

                                    // 选中 禁用
                                    //$this.attr("checked", "checked");
                                    //$this.attr('disabled', 'disabled');

                                    window.location.reload();
                                } else {
                                    dialogs._alert(response.resMsg, null, null);
                                }
                            }).fail(function (response, status, xhr) {

                            });

                            break;
                        case 1:
                            // 获得对应订单ID
                            var orderId = $(this).parents('.list2_li2').prev().find('input[name=tradeOrder]').val();

                            // 移除优惠内容
                            $.ajax({
                                url: "/shopping/removePreferentialContent.do",
                                type: "post",
                                dataType: "json",
                                data: {
                                    orderId: orderId,
                                    code: 0
                                }
                            }).success(function (response, status, xhr) {
                                if ("000" == response.resCode) window.location.reload();
                            }).fail(function (response, status, xhr) {

                            });

                            break;
                    }

                    return false;           // false 收起优惠菜单
                });

                // 计算购物车总金额
                calculatePrice();

            } else {
                var shoppingCarContent = "";
                shoppingCarContent += "<div class='please_login_wrap'>";
                shoppingCarContent += "<dl class='please_login'><dt></dt>";
                shoppingCarContent += "<dd>";
                shoppingCarContent += "<h4>您的购物车内暂时没有商品!</h4>";
                shoppingCarContent += "<a href='/site/course/selectCourse.htm' class='select_class'>去选课></a>";
                shoppingCarContent += "</dd>";
                shoppingCarContent += "</dl>"
                shoppingCarContent += "</div>";
                $("#NoShopping").html(shoppingCarContent);
            }
        }

        // 是否有选择订单
        isSelectedOrder = function () {
            var selectedOrder = $("input:checkbox[name='tradeOrder']:checked");
            if (0 == selectedOrder.length) {
                dialogs._alert("请选择要结算的订单", null, null);
                return false
            }
        };

        //加载热搜词
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
        var htmlStr = "<li><a href='/site/course/ignore/10010/courseTransfer.htm'>语文</a></li>" +
            "<li><a href='/site/course/ignore/10011/courseTransfer.htm'>数学</a></li>" +
            "<li><a href='/site/course/ignore/10012/courseTransfer.htm'>英语</a></li>" +
            "<li><a href='/site/course/ignore/10013/courseTransfer.htm'>生物</a></li>" +
            "<li><a href='/site/course/1/ignore/courseTransfer.htm'>小学</a></li>" +
            "<li><a href='/site/course/2/ignore/courseTransfer.htm'>小升初</a></li>";
        $("#hotSearchKey").html(htmlStr);

        // 推荐课程信息
        function RelationC(value) {
            var tab = "";
            var dataLen = value.length;
            var das = dataLen - dataLen % 4;
            for (var i = 0; i < das; i++) {
                if (i <= 7) {
                    var val = value[i];
                    //var price = parseFloat(val.price) / 100;
                    var priceYuan = money.fmoney(Number(val.price) / 100, 2);

                    var orgname = val.orgEntity == null ? "" : val.orgEntity.orgName;
                    var orgid = val.orgEntity == null ? "" : val.orgEntity.orgId;
                    var courseurl = "";
                    if (val.advertiseResId == "" || val.advertiseResId == 0) {
                        courseurl = "/front/sanhai/images/course.png";
                    } else {
                        courseurl = "/file/loadImage/" + val.advertiseResId + "/240/135.r";
                    }
                    tab += "<li>";
                    tab += "<a href='/site/course/" + val.courseId + "/courseContent.htm'><img STYLE='width:240px; height: 135px;' src='" + courseurl + "'/></a>";
                    tab += "<h5><a href='/site/course/" + val.courseId + "/courseContent.htm' title='" + val.courseTitle + "'>" + val.courseTitle + "</a></h5>";
                    tab += "<p><a href='/site/shool/" + orgid + "/findCourseByorgId.htm' title='" + orgname + "'>" + orgname + "</a><span>" + priceYuan + "</span></p>";
                    tab += "</li>";
                }

            }
            $("#Relation").html(tab);
        };

        // 购物车订单课程添加备注信息
        updateOrderRemark = function (obj, orderId) {
            var tt = obj.parent('div').parent('li').parent('ul').children('li').eq(1).children('p').eq(2).children('span').text();
            dialogs._remarks_shopcar(tt, function () {
                var remak = $('#notice_textarea').val();
                $.ajax({
                    url: "/shopping/updateRemark.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        orderid: orderId,
                        remark: remak
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            obj.parent('div').parent('li').parent('ul').children('li').eq(1).children('p').eq(2).children('span').text(remak)
                            obj.text("修改备注")
                            //window.location.reload();
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                        }
                    }
                });
            }, '');

        }
    };

    /**
     * 处理购物车总金额
     * @param shoppingCountMoney    当前购物车总金额（单位分）
     * @param money                 变更金额（单位分）
     * @param opt                   + 总金额增加 - 总金额减少
     * @param targetDiv             显示购物车总金额的文档元素
     * @注意：
     * @TODO 这个方法主要目的是优惠的价格需要反映在购物车的总金额上
     * @TODO 有优惠订单单价减少，相对购物车总金额也要减少
     * @TODO 无优惠订单单价增加，相对购物车总金额也要增加
     * @TODO 这方法没有使用，被原始的 calculatePrice 替代
     */
    var modifyShoppingCountMoney = function (shoppingCountMoney, modifyMoney, opt, targetDiv) {
        //console.log("购物车总金额：" + shoppingCountMoney + " - 优惠金额：" + modifyMoney);

        if ("+" == opt) {   // 增加金额
            var _shoppingCountMoney = shoppingCountMoney + modifyMoney;
            targetDiv.empty();
            targetDiv.html(money.fmoney(_shoppingCountMoney / 100, 2));
        }
        if ("-" == opt) {   // 减少金额
            var _shoppingCountMoney = shoppingCountMoney - modifyMoney;
            targetDiv.empty();
            targetDiv.html(money.fmoney(_shoppingCountMoney / 100, 2));
        }
    }

    return {
        initShoppingCar: initShoppingCar
    }

});