/**
 * Created by boys on 2016/1/6.
 */


define(['jquery', 'dialogs'], function($, dialogs){
    /**
     * 保存评价信息
     */
    return {
        'saveEvaluaStu':function () {
            $('#org_wrong').addClass('hide');
            $('#tea_wrong').addClass('hide');
            $('#sou_wrong').addClass('hide');
            $('#text_wrong').addClass('hide');
            $('#text_length_wrong').addClass('hide');
            var coursesId = $('#coursesId').val();
            var courseTitle = $('#courseTitle').val();
            var id = $('#id').val();
            var schoolId = $('#schoolId').val();
            var teacherId = $('#teacherId').val();
            var result_org = $("#result_org").text();
            var result_tea = $("#result_tea").text();
            var result_sou = $("#result_sou").text();
            var des = $('#notice_textarea').val();
            /*
            if (result_org == 0) {
                $('#org_wrong').removeClass('hide');
                return;
            }

            if (result_sou == 0) {
                $('#sou_wrong').removeClass('hide');
                return;
            }
            if (result_tea == 0) {
                $('#tea_wrong').removeClass('hide');
                return;
            }
            if(des==""){
                dialogs._alert('请输入评论!', '', '');
                return;
            }
            if(des.length>=1080){
                dialogs._alert('最多只能输入1080字!', '', '');
                return;
            }*/
            $.ajax({
                type: "post",
                url: "/evaluate/insertEvaluate.do",
                dataType: "json",
                data: {
                    "courseId": coursesId,
                    "courseName": courseTitle,
                    "orderId": id,
                    "coursesRecordId": "0",
                    "schoolId": schoolId,
                    "teacherId": teacherId,
                    "orgScore": result_org,
                    "teaScore": result_tea,
                    "sourceScore": result_sou,
                    "des": des

                },
                success: function (result) {

                    /* alert(result.resMsg);*/
                    $('#org_wrong').addClass('hide');
                    $('#tea_wrong').addClass('hide');
                    $('#sou_wrong').addClass('hide');
                    $('#text_wrong').addClass('hide');
                    $('#text_length_wrong').addClass('hide');
                    $('.p_right em i').removeClass('active');
                    $('.p_right em span').text('0');
                    $(".pushNotice").dialog("close");
                    $('#notice_textarea').val('')
                    location.replace(location.href);
                },
                error: function (xhr, status, error) {}
            });
        },
        'saveEvaluaTea':function (){
            $('#wrong_text').addClass('hide');
            $('#wrong_text_length').addClass('hide');
        var coursesId=$('#coursesId').val();
        var courseTitle=$('#courseTitle').val();
        var userId1=$('#userId1').val();
        var username=$('#username').val();
        var des=$('#notice_textarea').val();
        var username=$('#username').val();
        var orderid=$('#id').val();
        if(des==""){

            return;
        }
        if(des.length>=1080){
            return;
        }
        $.ajax({
            type:"post",
            url:"/evaluate//insertEvaluateStu.do",
            dataType:"json",
            data:{
                "stuId":userId1,
                "stuName":username,
                "courseId":coursesId,
                "courseName":courseTitle,
                "coursesRecordId":"0",
                "des":des,
                "orderid":orderid

            },
            success:function(result) {

                $('#wrong_text').addClass('hide');
                $('#wrong_text_length').addClass('hide');
                $('#notice_textarea').val('');
                location.replace(location.href);

            },
            error:function(xhr,status,error) {}
        });
    }
    }
});