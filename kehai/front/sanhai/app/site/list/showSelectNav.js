/**
 * Created by bbb on 2015/12/9.
 */
define('showSelectNav',['jquery', 'common', 'money', 'pageBar', 'base'], function ($, common, money, pageBar) {
    /**
     * 显示数据检索过滤条
     * @param selectNavCallback
     */
    var showSelectNav=function (selectNavCallback) {
        $.each($(".sele_c_list input"), function (index, item) {
            var inputId = $(this).attr("id");
             var inputVal = $("#" + inputId).val();
            if (inputId!="courseTitle"&&inputId!="orgname"&&inputId!="name"&&inputVal != "ignore"&&inputId!="sortType") {
                var title = $(".sele_list div[data=" + inputId + "]").text();
                var val = $(".sele_list ul li a[code=" + inputVal + "]").eq(0).text();
                $(".sele_list ul li a[code=" + inputVal + "]").eq(0).addClass('ac');
                var tit_index =$('.sele_li_tit').index($(".sele_list ul li a[code=" + inputVal + "]").eq(0).parents('.sele_list').find('.sele_li_tit'));
                $('<li><span class="span_bor"><span data="'+tit_index+'">'+title+'</span><span class="after">:</span><span class="ac">'+val+'</span><i class="del" data='+inputId+' num='+index+'></i></span></li>').appendTo($('.sele_c_list'));

            }
            $('.del').click(function () {
                var same = $(this).attr('num');
                $(" a[code=" + inputVal + "]").removeClass('ac');
                $(this).parents('li').remove();
                var codeKey = $(this).attr("data");
                $("#" + codeKey).val("ignore");
                if ($("#courseTitle")) {
                    $("#courseTitle").val("ignore");
                }
                if ($("#orgname")) {
                    $("#orgname").val("ignore");
                }
                if ($("#name")) {
                    $("#name").val("ignore");
                }
                selectNavCallback(1);
            });

        });
        /*网站学校列表全部课程分类下面的所有分类
         *
         * 调用的时候传进两个参数,
         *
         */

        $('.classes_sel_sel').selectedClassification(function(){

            if($("#courseTitle")){
                $("#courseTitle").val("ignore");
            }
            if ($("#orgname")) {
                $("#orgname").val("ignore");
            }
            if ($("#name")) {
                $("#name").val("ignore");
            }
            selectNavCallback(1);
        },function(oData,oCode){

            $("#" + oData).val(oCode);
            if($("#courseTitle")){
                $("#courseTitle").val("ignore");
            }
            if($("#orgname")){
                $("#orgname").val("ignore");
            }
            if($("#name")){
                $("#name").val("ignore");
            }
            selectNavCallback(1);
        });

    };


    return {
        showSelectNav:showSelectNav
    }

});
