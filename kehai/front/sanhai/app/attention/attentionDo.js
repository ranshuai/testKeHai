define(["jquery","module/collectionAndattention"],
    function($,collectionAndattention){

        /*取消关注*/
        this.deleteAttention = function(){
            var objid = $('#ObjId').val();
            $.ajax({
                url: "/attention/deleteAttention.do",
                type: "post",
                dataType: "json",
                data: {
                    attentionObjId: objid
                },
                success: function (response) {
                    if ("000" == response.resCode){
                        if(attentiontype=="org"){
                            obje.parent('h3').parent('div').parent('div').remove();
                        }
                        if(attentiontype=="tea"){
                            obje.parent('div').parent('div').remove();
                        }
                        if(attentiontype=="stu"){
                            obje.parent('div').parent('div').remove();
                        }
                        $(".pushNotice,.pushNotice_agree").dialog("close");
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                }
            });
            /*如果#collectionorg没有内容就隐藏分页*/
            if($('#collectionorg').children().size() == 1){
                $('#pageBar').addClass('hide');
            }else{
                $('#pageBar').removeClass('hide');
            }
        }

        return {
            init:function(){
                $('.left_menu a').bind('click', function() {
                    $('.left_menu li').removeClass('cur');
                    $(this).parents('li').addClass('cur');
                    var index = $(this).parents('li').index();
                    var aBi = $('.left_menu i');
                    for(var i=0; i<aBi.length; i++){
                        $('.left_menu i').eq(i).removeClass('ac');

                        $('.left_menu i').eq(index).addClass('ac');
                    }

                });

                /*弹窗初始化*/
                $('.popBox').dialog({
                    autoOpen: false,
                    width: 600,
                    modal: true,
                    resizable: false,
                    close: function() {
                        $(this).dialog("close")
                    }
                });
                /*驳回申请*/
                $('.pushBtnJs').click(function() {
                    $("#pushNotice").dialog("open");
                    return false;
                });
                /*同意申请*/
                $('.pushBtnJs_agree').click(function() {
                    $("#pushNotice_agree").dialog("open");
                    
                    return false;
                });
                //清除选项
                $('.cancelBtn').click(function() {

                    $(".pushNotice,.pushNotice_agree").dialog("close");
                })

                $("#loadAttentionorgList").click(function(){
                    attention.loadAttentionorgList(1);
                });

                $("#loadAttentionteaList").click(function(){
                    attention.loadAttentionteaList(1);
                });

                $("#loadAttentionstuList").click(function(){
                    attention.loadAttentionstuList(1);
                });

                var attention = new collectionAndattention();
                attention.loadAttentionorgList(1);

                              
            }
        }
    });