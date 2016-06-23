/**
 * Created by Administrator on 2015/12/17.
 */

define(
    [
        'jquery',
        'app/order/undStu/initOrderList-1.0'
    ], function ($,init) {
    $("#allOrderList").trigger('click');

    var oSelect_body = $('.sel_body');
    var oSelect_plus = $('.select_plus');

    oSelect_body.change(function () {
//      var $this = $(this);
//      var oEm = oSelect_plus.children('em');
//      oEm.text($this.val());
        $(this).siblings("em").text($(this).find("option:selected").text());
    });

    $(function () {
        init.initOrderList();
        if ($(".tabItem:eq(0)").is(':visible')) {
            $(".tabItem:eq(1)").hide();
        }
    })

});
