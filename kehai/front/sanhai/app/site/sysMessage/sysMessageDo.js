/**
 * Created by bbb on 2015/12/18.
 */
define([
        'jquery',
        'app/site/siteSearchBar',
        'common',
        'pageBar',
        'dialogs',
        'base_dialog_standard',
        'money',
        'base'
    ],

    function ($, siteSearchBar, common, pageBar, dialogs, dialog) {

        function sysMessageDo() {
            this.$a = $('.li_2').children('a').eq(0);
            this.$b = $('.li_2').children('a').eq(1);
        }

        /**
         * 加载系统消息
         * @param currPage
         * @param megType
         */
        sysMessageDo.prototype.loadSysMessageList = function (currPage, megType, readStatus) {
            var t = this;
            $.ajax({
                url: "/sysMessage/loadSysMessageList.do",
                type: "post",
                dataType: "json",
                data: {
                    currentPage: currPage,
                    msgType: megType,
                    readStatus: readStatus
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    var htmlStr = "";

                    $.each(response.data.list, function (index, item) {
                        var ti = new Date(parseFloat(item.msgTime)).format("yyyy-MM-dd hh:mm:ss");
                        var url = toUrl(item.eventCode);
                        htmlStr += "<li>";
                        /*htmlStr += "<h5>" + ((item.readStatus == 1) ? "<i></i>" : "") + item.msgContent + "<a onclick='serchInfo($(this),url)' >查看详情></a></h5><i class='deleteBtn' onclick='deleteMsg($(this));'></i>";*/
                        htmlStr += "<h5>" + ((item.readStatus == 1) ? "<i></i>" : "") + item.msgContent + "</h5><i class='deleteBtn' onclick='deleteMsg($(this));'></i>";
                        htmlStr += "<input type='hidden' value='" + item.id + "'/>";
                        htmlStr += "<input type='hidden' value='" + url + "'/>";
                        htmlStr += "<div class='delete_new hide'>";
                        htmlStr += "<span class='deleteBtnJs'>删除此条消息</span>";
                        htmlStr += "<span class='shieldBtnJs'>屏蔽此条消息</span>";
                        htmlStr += "</div>";
                        htmlStr += "<span class='news_time'>消息时间：<em>" + ti + "</em></span>";
                        htmlStr += "</li>";
                    });
                    $("#message").html(htmlStr);
                    //显示分页工具条
                    pageBar.showPageBar(response.data.currPage, response.data.totalPages, function (currPage) {
                        t.loadSysMessageList(currPage, megType, readStatus)
                    });
                }


            });
        }

        /*更新阅读状态*/
        serchInfo = function (obj, url) {
            var id = obj.parent('h5').parent('li').children('input').eq(0).val();
            var url = obj.parent('h5').parent('li').children('input').eq(1).val();
            $.ajax({
                url: "/sysMessage/updateSysMessageByid.do",
                type: "post",
                dataType: "json",
                data: {
                    msgid: id
                },
                success: function (response) {
                    if (!common.checkResponse(response)) {
                        return false;
                    }
                    if ("000" == response.resCode) {
                        window.location.href = url;
                    }

                }
            });

        }

        deleteMsg = function (obj) {
            var id = obj.parent('li').children('input').eq(0).val();
            dialogs._confirm('您要删除此条消息吗？', '温馨提示', function () {
                $.ajax({
                    url: "/sysMessage/deleteSysMessageByid.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        msgid: id
                    },
                    success: function (response) {
                        if (!common.checkResponse(response)) {
                            return false;
                        }
                        if ("000" == response.resCode) {
                            obj.parent('li').remove();
                        }

                    }
                });
            }, '')
        }
        /**
         * 根据编码去向地址
         * @param val
         * @returns {*}
         */
        toUrl = function (val) {
            switch (val) {
                case "106001":
                    return "/courses/onRecords.htm";
                case "106002":
                    return "/courses/onRecords.htm";
                case "106003":
                    return "/courses/onRecords.htm";
                case "106004":
                    return "/courses/onRecords.htm";
                case "106005":
                    return "/courses/onRecords.htm";
                case "106006":
                    return "/courses/onRecords.htm";
                case "106007":
                    return "/courses/onRecords.htm";
                case "106008":
                    return "/courses/onRecords.htm";
                case "106009":
                    return "/courses/onRecords.htm";
                case "100001":
                    return "/courses/onRecords.htm";
                case "100002":
                    return "/courses/onRecords.htm";
                case "100003":
                    return "/courses/onRecords.htm";
                case "100004":
                    return "/courses/onRecords.htm";
                case "100005":
                    return "/courses/onRecords.htm";
                case "101001":
                    return "/courses/onRecords.htm";
                case "101002":
                    return "/courses/onRecords.htm";
                case "101003":
                    return "/courses/onRecords.htm";
                case "101004":
                    return "/courses/onRecords.htm";
                case "101005":
                    return "/courses/onRecords.htm";
                case "101006":
                    return "/courses/onRecords.htm";
                case "101007":
                    return "/courses/onRecords.htm";
                case "101008":
                    return "/courses/onRecords.htm";
                case "101009":
                    return "/courses/onRecords.htm";
                case "101010":
                    return "/courses/onRecords.htm";
                case "101011":
                    return "/courses/onRecords.htm";
                case "101012":
                    return "/courses/onRecords.htm";
                case "102001":
                    return "/courses/onRecords.htm";
                case "102002":
                    return "/courses/onRecords.htm";
                case "102003":
                    return "/courses/onRecords.htm";
                case "102004":
                    return "/courses/onRecords.htm";
                case "102005":
                    return "/courses/onRecords.htm";
                case "103001":
                    return "/courses/onRecords.htm";
                case "103002":
                    return "/courses/onRecords.htm";
                case "103003":
                    return "/evaluate/searchEvaluate.htm";
                case "104001":
                    return "/courses/onRecords.htm";
                case "104002":
                    return "/evaluate/searchEvaluate.htm";
                case "105001":
                    return "/courses/onRecords.htm";
                case "105002":
                    return "/courses/onRecords.htm";
                case "105003":
                    return "/courses/onRecords.htm";
                case "105004":
                    return "/courses/onRecords.htm";
                case "107001":
                    return "/courses/onRecords.htm";
                case "107002":
                    return "/courses/onRecords.htm";
                case "107003":
                    return "/courses/onRecords.htm";
                case "107004":
                    return "/courses/onRecords.htm";
                case "107005":
                    return "/courses/onRecords.htm";
                case "107006":
                    return "/courses/onRecords.htm";
                default :
                    return "/courses/onRecords.htm";
            }
        }

        sysMessageDo.prototype.loadMsg = function (msgType) {
            var t = this;
            t.loadSysMessageList(1, msgType, -1);
        }

        sysMessageDo.prototype.bindEvent = function () {
            var t = this;
            t.$a.on('click', function (event) {
                t.loadMsg(0);
            });
            t.$b.on('click', function (event) {
                t.loadMsg(1);
            });

        };

        sysMessageDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
            $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'})
            /*删除、屏蔽消息显示*/
            $('.news_main ul li i').click(function () {
                $(this).siblings('.delete_new').toggleClass('hide');
                return false;
            });
            $(document).click(function () {
                $('.delete_new').addClass('hide')
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
            /*删除弹窗*/
            $('.deleteBtnJs').click(function () {
                dialogs._confirm('您要删除此条消息吗？', '温馨提示', '', '')
            });
            /*屏蔽弹窗*/
            $('.shieldBtnJs').click(function () {
                dialogs._confirm('您确定要屏蔽此类消息吗？可能会对您的课程有影响哦。', '温馨提示', '', '')
            });

            $('.select_type_List').rSetUpTab();

        };
        sysMessageDo.prototype._init = function () {
            var t = this;
            t.init();
            t.bindEvent();
            $('input:checkbox').change(function () {

                if ($(this).attr('checked')) {
                    t.loadSysMessageList(1, 0, 1);
                } else {

                    t.loadSysMessageList(1, 0, -1);

                }

            })
            t.loadSysMessageList(1, 0, -1);
            new siteSearchBar().render();
        };
        sysMessageDo.prototype.render = function () {
            this._init();
        };
        return sysMessageDo;
    }
);