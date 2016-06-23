/**
 * Created by 蒋淼 on 2016/2/19.
 */
define("videoViewDo", ["jquery", "money", "dialogs", "pageBar"], function ($, money, dialogs, pageBar) {

    /**
     * 加载我的视频
     * @param currentPage   当前页
     */
    var loadVideoView = function (currentPage) {

        window.openWindow = function (url) {
            //console.log("打开一个窗口");

            var width = window.screen.availWidth;
            var height = window.screen.availHeight;
            var tempWindow = window.open(url, '_blank', 'channelmode=yes,fullscreen=yes,location=0,width=' + width + ",height=" + height + ",top=0, left=0");
            return false;
        };

        $.ajax({
            url: "/video/videoViewList.do",
            type: "post",
            dataType: "json",
            data: {
                currentPage: currentPage
            }
        }).success(function (response, status, xhr) {

            if ("000" == response.resCode) {

                if (0 == response.data.videoView.totalRows) {   // 是否有记录
                    $("#videoView").empty();
                    $("#videoView").html("尚未购买任何视频课程");
                } else {

                    $("#videoView").empty();

                    $.each(response.data.videoView.data, function (index, value) {

                        var videoId = value.coursesId;
                        //var videoTitle = (value.ptTitle.length > 15) ? value.ptTitle.substr(0, 15) + "..." : value.ptTitle;
                        var videoTitle = (value.theme.length > 15) ? value.theme.substr(0, 15) + "..." : value.theme;
                        var teacher = (value.realName.length > 6) ? value.realName.substr(0, 5) + "..." : value.realName;

                        var price = value.price;
                        var school = value.schName;
                        var image = "/front/sanhai/images/course.png";

                        var detail = "/site/videoCourse/" + value.coursesId + "/detail.htm";

                        if (0 != value.courseResId) image = "/file/loadImage/" + value.courseResId + "/180/110.r";

                        var content = "";
                        content += "<dl>";
                        content += "<dt>";
                        content += "<a href=" + detail + "><img src='" + image + "' alt=\"\"/></a>";
                        content += "</dt>";
                        content += "<dd>";
                        content += "<h5><a href='" + detail + "' title=\"\">" + videoTitle + "</a></h5>";
                        content += "<p class=\"clearfix\">";
                        content += "<span class=\"fl\">主讲人：" + teacher + "</span>";
                        //content += "<span class=\"fr orange\">" + money.fmoney(price / 100, 2) + "</span>";
                        content += "</p>";

                        content += "<p class=\"clearfix\">";
                        content += "<span class=\"fl schName\">学校：" + school + "</span>";
                        content += "<span class=\"fr\">" + value.videoCount + "人在学</span>";

                        content += "</p>";
                        content += "<button name='playVideo' class=\"c_bg_color1 startStudy\">开始学习<i></i></button>";
                        content += "</dd>";
                        content += "</dl>";

                        // 渲染
                        $("#videoView").append(content);

                        // 事件
                        $("button[name=playVideo]").eq(index).click(function () {
                            $.ajax({
                                url: "/video/playBack.do",
                                type: "post",
                                data: {
                                    videoId: videoId
                                },
                                dataType: "json"
                            }).success(function (response, status, xhr) {
                                if ("000" == response.resCode) {
                                    //window.open(response.data.url);
                                    //window.openWindow(response.data.url);
                                    var url = response.data.url;
                                    if (typeof url == "undefined") return false;
                                    var text_num = 9;
                                    var timer = null;
                                    dialogs._confirm('马上进入视频，准备好了吗？还有 ' + text_num + ' 秒自动关闭', '操作提示', function () {
                                        clearInterval(timer);
                                        window.openWindow(url);
                                    }, function () {
                                        clearInterval(timer);
                                    });

                                    timer = setInterval(function () {
                                        text_num--;
                                        $('.confirm_dialog_box .popbox_item p').text('马上进入视频，准备好了吗？还有 ' + text_num + '  秒自动关闭');
                                        if (text_num <= 0) {
                                            clearInterval(timer);
                                            $('.popBox ').remove();
                                        }
                                    }, 1000);
                                    /* openDialog(15);
                                     $("#pushNotice15 #url").val(url);*/
                                } else {

                                }
                            }).fail(function (response, status, xhr) {

                            });
                        });

                    });

                    // 分页
                    var params = new Array();
                    pageBar.setBasePageBar(response.data.videoView.totalPages, response.data.videoView.currPage, loadVideoView, params);
                }

            } else {

            }

        }).fail(function (response, status, xhr) {
            alert("fail");
        })

    };
    return {
        loadVideoView: loadVideoView
    };
});