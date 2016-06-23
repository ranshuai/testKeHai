/**
 * Created by Administrator on 2016/1/13.
 */
/*
* 2016-01-13
*
* */

/*
*
* 网站选择旁听课表
* 点击购买旁听出现弹窗
*
* */
define(['jquery'],function($){
    function selBoxAll() {
        var selBox = $('.order_table #couserlists input[type=checkbox]');
        var totail = [];
        function sum(arr) {
            var totail = 0;
            for (var i = 0; i < arr.length; i++) {
                totail += arr[i]
            }
            return totail;
        }
        $('#checkboxAll').on('click', function () {
            if ($(this)[0].checked) {
                $('.order_table input[type = checkbox]').attr('checked', true);
                totail.length = 0;
                //获取price 把selBox循环一遍
                for (var i = 0; i < selBox.length; i++) {
                    var unitPrice = Number(selBox.eq(i).parents('.courItem').find('.price').text().substring(1));
                    totail.push(unitPrice);
                }
            } else {
                $('.order_table input[type = checkbox]').attr('checked', false);
                for (var i = 0; i < selBox.length; i++) {
                    var unitPrice = Number(selBox.eq(i).parents('.courItem').find('.price').text().substring(1));
                    totail.pop(unitPrice);
                }
            }
            $('.popBuyAuditTotal strong').text("￥" + sum(totail).toFixed(2))
        });
        /**/

        selBox.on('click', function () {
            var num = 0;
            for (var i = 0; i < selBox.length; i++) {
                if (selBox[i].checked) num++;
            }
            if ($(this)[0].checked) {
                var unitPrice = Number($(this).parents('.courItem').find('.price').text().substring(1));
                totail.push(unitPrice);
            } else {
                var unitPrice = Number($(this).parents('.courItem').find('.price').text().substring(1));
                totail.pop(unitPrice);
            }
            $('.popBuyAuditTotal strong').text("￥" + sum(totail).toFixed(2))
            if (num == selBox.size()) {
                $('#checkboxAll').attr('checked', true);

            } else {
                $('#checkboxAll').attr('checked', false);
            }
        });
        for (var i = 0; i < selBox.length; i++) {
            var unitPrice = Number(selBox.eq(i).parents('.courItem').find('.price').text().substring(1));
            totail.push(unitPrice);
        }
        $('.popBuyAuditTotal strong').text("￥" + sum(totail).toFixed(2))
    }

    return {
        selBoxAll:selBoxAll
    }
});