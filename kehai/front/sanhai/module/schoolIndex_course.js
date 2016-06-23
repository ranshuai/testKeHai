
define("schoolIndex_teacher", ["jquery", 'dialogs'], function ($, dialog) {
    var showOnetoOnoCoureses=function(value){
        var tab="";
        for(var i=0;i<value.length;i++){
            var val=value[i];
//          var price= parseFloat(val.price)/100;
            var price=money.fmoney(Number(val.price) / 100, 2)
            var duration=parseFloat(val.duration)/60;
            var courseurl="";
            if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
                courseurl="/front/sanhai/images/course.png";
            }else{
                courseurl="/file/loadImage/" + val.advertiseResId + "/270/170.r";
            }

            tab+="<div class='class_item'>"+
                "<div class='class_img_warp'>"+
                "<a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:270px; height:170px;' src='"+courseurl+"'/></a>"+
                "</div>"+
                "<div class='class_item_cont'>"+
                "<h2>"+
                "<a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a>"+
                "<span>���ȱ�����</span>"+
                "</h2>"+
                "<table>"+
                "<colgrounp>"+
                " <col width='80px'/>"+
                "<col width='125px'/>"+
                "</colgrounp>"+
                "<tr>"+
                "<td class='tr'>�ܿ�ʱ����</td>"+
                "<td>" + duration +"Сʱ</td>"+
                "</tr>"+
                "<tr>"+
                "<td class='tr'>�꼶��</td>"+
                "<td>" + val.grade +"</td>"+
                "</tr>"+
                    /* "<tr>"+
                     "<td class='tr'>�̲İ汾��</td>"+
                     "<td>" + val.teaVersion +"</td>"+
                     "</tr>"+*/
                "<tr>"+
                "<td class='tr'>��Ŀ��</td>"+
                "<td>" + val.subject +"</td>"+
                "</tr>"+
                "<tr>"+
                "<td class='tr'>�۸�</td>"+
                "<td class='course_price'>" + price +"</td>"+
                "</tr>"+
                "</table>"+
                "</div>"+
                "<div class='add_shopping_car'>"+
                "<input type='hidden' value='0'/>"+
                "<input type='hidden' value='" + val.courseId +"'/>"+
                "<button type='button' class='btn ' onclick=\"window.open('/consult/chat.htm?type=course&typeId="+val.userId+"','','height=730,width=900');\">ȥ��ѯ</button>"+
                "<button type='button' class='btn ' onclick='addShoppingCart($(this))'>���빺�ﳵ</button>"+
                "</div>"+
                "</div>";

        }
        $("#cousdatas").html(tab);
        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function() {
                $(this).dialog("close")
            }
        });

        $('.pushBtnJs').click(function() {
            var courseMode=$(this).parent('div').children('input').eq(0).val();
            var courseId=$(this).parent('div').children('input').eq(1).val();
            $("#pushNotice").dialog("open");

            $('#courseMode').val(courseMode);
            $('#courseId').val(courseId);
            return false;
        });
        $('.cancelBtn').click(function() {

            $(".pushNotice").dialog("close");
        })





        };

    var showpublicCoureses=function(value){//���
        var tab="";
        for(var i=0;i<value.length;i++){

            var val=value[i];

//        var price= parseFloat(val.price)/100;
            var price=money.fmoney(Number(val.price) / 100, 2)
            var duration=parseFloat(val.duration)/60;

            var courseurl="";
            if(val.advertiseResId==""||val.advertiseResId==0||val.advertiseResId==undefined){
                courseurl="/front/sanhai/images/course.png";
            }else{
                courseurl="/file/loadImage/" + val.advertiseResId + "/270/170.r";
            }
            tab+="<div class='class_item'>"+
                "<div class='class_img_warp'>"+
                "<a href='/site/course/" + val.courseId +"/courseContent.htm'><img STYLE='width:270px; height:170px;' src='"+courseurl+"'/></a>"+
                "</div>"+
                "<div class='class_item_cont'>"+
                "<h2>"+
                "<a href='/site/course/" + val.courseId +"/courseContent.htm'>" + val.courseTitle +"</a>"+
                "<span>���ȱ�����</span>"+
                "</h2>"+
                "<table class='one_to_one'>"+
                " <colgrounp>"+
                "<col width='85px'/>"+
                "<col width='125px'/>"+
                "<col width='85px'/>"+
                "<col width='125px'/>"+
                "</colgrounp>"+
                "<tr>"+
                "<td class='tr'>�ڴ�������</td>"+
                "<td>10��</td>"+
                "<td class='tr'>����ʱ����</td>"+
                "<td>40����</td>"+
                "</tr>"+
                "<tr>"+
                "<td class='tr'> �꼶��</td>"+
                "<td>" + val.grade +"</td>"+
                "<td class='tr'>����������</td>"+
                "<td>20��</td>"+
                "</tr>"+
                    /*"<tr>"+
                     "<td class='tr'>�̲İ汾��</td>"+
                     "<td>" + val.teaVersion +"</td>"+
                     "<td class='tr'></td>"+
                     "<td></td>"+
                     "</tr>"+*/
                "<tr>"+
                "<td class='tr'>�γ����ͣ�</td>"+
                " <td colspan='3'>���</td>"+
                "</tr>"+
                "<tr>"+
                "<td class='tr'>�γ̰��ţ�</td>"+
                "<td colspan='3'>��������2015-06-06 ÿ��һ���� 18:00</td>"+
                "</tr>"+
                "</table>"+
                "</div>"+
                "<div class='add_shopping_car'>"+
                " <p>" + price +"</p>"+
                "<input type='hidden' value='0'/>"+
                "<input type='hidden' value='" + val.courseId +"'/>"+
                "<button type='button' class='btn pushBtnJs'>���빺�ﳵ</button>"+
                " </div>"+
                " </div>";





        }
        $("#cousdatas").html(tab);
        $('.popBox').dialog({
            autoOpen: false,
            width: 600,
            modal: true,
            resizable: false,
            close: function() {
                $(this).dialog("close")
            }
        });
        $('.pushBtnJs').click(function() {
            var courseMode=$(this).parent('div').children('input').eq(0).val()
            var courseId=$(this).parent('div').children('input').eq(1).val()
            $("#pushNotice").dialog("open");

            $('#courseMode').val(courseMode);
            $('#courseId').val(courseId);
            return false;
        });
        $('.cancelBtn').click(function() {

            $(".pushNotice").dialog("close");
        })
    };

    var getCous=function(par){
        var courseMode="";
        var courseType=par.text();
        if ("һ��һ" == courseType) courseMode="0";
        if ("���" == courseType) courseMode="1";
        if(courseMode==0){
            var data="orgId="+orgidid+"&courseMode="+courseMode+"&";
            loadonotoone(url, data,1) ;
        }else{
            var data="orgId="+orgidid+"&courseMode="+courseMode+"&";
            loadpublice(url, data,1);
        }


    };

    var continueCourse=function(){ //����ѡ��
        var courseMode = $('#courseMode').val();
        var courseId =$('#courseId').val();
        var auditFlag = 0;
        var remark = $('#notice_textarea').val();
        var count= parseInt($("#shoppingcount").text())+1;
        $("#shoppingcount").text(count);
        $.ajax({
            url:"/orderDeal/add.do",
            type:"post",
            dataType:"json",
            data:{
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: remark
            },
            success:function(response){

                //console.log(response.resCode);

                if("000" == response.resCode ) {
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");
                }
                if("200" == response.resCode ) {
                    $('#notice_textarea').val("");
                    window.location.href = "/login.htm";
                    $(".pushNotice").dialog("close");
                }
            }
        });
    };

    var payCourse=function(){//ȥ���ﳵ����
        var courseMode = $('#courseMode').val();
        var courseId =$('#courseId').val();
        var auditFlag = 0;
        var remark = $('#notice_textarea').val();
        var count= parseInt($("#shoppingcount").text())+1;
        $("#shoppingcount").text(count);
        $.ajax({
            url:"/orderDeal/add.do",
            type:"post",
            dataType:"json",
            data:{
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: remark
            },
            success:function(response){

                //console.log(response.resCode);

                if("000" == response.resCode ) {
                    $('#notice_textarea').val("");
                    window.location.href="/shopping/shoppingCoureses.htm";

                    $(".pushNotice").dialog("close");
                }
                if("200" == response.resCode ){
                    $('#notice_textarea').val("");
                    window.location.href = "/login.htm";
                    $(".pushNotice").dialog("close");
                }
            }
        });
    };

    var addShoppingCart=function(obj) {
        var courseMode = obj.parent('div').children('input').eq(0).val();
        var courseId = obj.parent('div').children('input').eq(1).val();
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
                if ("000" == response.resCode) {
                    dialogs._shoppingcar(function(){
                        var count = parseInt($("#shoppingcount").text()) + 1;
                        $("#shoppingcount").text(count++);
                    },function(){
                        var count = $("#shoppingcount").text();
                        $("#shoppingcount").text(count++);
                        window.location.href = "/shopping/shoppingCoureses.htm";
                    })

                }
                if ("200" == response.resCode) {
                    window.location.href = "/login.htm";
                    $('#notice_textarea').val("");
                    $(".pushNotice").dialog("close");
                }
                // 2015-10-16 ����޸�����add.do��У��ֻ��ѧ���û����Լ��빺�ﳵ
                if("300" == response.resCode){
                    dialog._wiat(response.resMsg, 2, null);
                }
            }
        });
    }


    var toShopping=function(courseId, courseMode, auditFlag, remark){
        $.ajax({
            url:"/orderDeal/add.do",
            type:"post",
            dataType:"json",
            data:{
                courseMode: courseMode,
                courseId: courseId,
                auditFlag: auditFlag,
                remark: remark
            },
            success:function(response){

                //console.log(response.resCode);

                if("000" == response.resCode ) alert("���빺�ﳵ");
                if("200" == response.resCode ) window.location.href = "/login.htm";
            }
        });
    }
    return{
        showOnetoOnoCoureses:showOnetoOnoCoureses,
        showpublicCoureses:showpublicCoureses,
        getCous:getCous,
        continueCourse:continueCourse,
        payCourse:payCourse,
        addShoppingCart:addShoppingCart,
        toShopping:toShopping

    }

})