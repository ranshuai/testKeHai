define(["loadAreaAndMatch","common","dialogs","base","jquery"],
    function(loadAreaAndMatch,common,dialogs){

        //客服中心hover效果
        $('.serviceList').rNavhover();
        //切换身份hover效果
        $('.tabRole').rNavhover();

        /**
         *加载学校的数据
         */
        function loadSelOrg(orgName, addressName) {

            $.ajax({
                type: "POST",
                dataType: "json",
                url: "/orgInfo/findOrg.do",
                data: {
                    orgName: orgName,
                    addressName: addressName
                },
                success: function (data) {
                    var result = data.data.orgList;
                    $(".change_school").html("");
                    for (var i = 0; i < result.length; i++) {
                        $(".change_school").append($("<li code=\"" + result[i].orgId + "\" title='"+result[i].orgName+"'>" + result[i].orgName + "</li>"));

                    }
                    /*学校选中状态*/
                    $('.change_school li').toggle(function(){
                        $(this).append($('<i></i>')).siblings().children('i').remove();
                    },function(){
                        $(this).children('i').remove();
                    })
                }
            });
        }

        return{
            init:function(){
                loadAreaAndMatch.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null,null);
                $('.join_btn a').click(function(){
                    $(this).addClass('c_bg_color5').removeClass('c_bg_color8').siblings('a').removeClass('c_bg_color5').addClass('c_bg_color8');
                });

                $('.subTitleBar_text1').placeholder({'value':'请输入学校名称'});

                /*选取学校时出现的列表*/
                $('.search_wrap button').click(function(){
                    var orgName = $('.search_wrap input').val();
                    if(orgName!=''){
                        $('.change_school').removeClass('hide');
                        loadSelOrg(orgName,"");
                    }else{
                        dialogs._timer("请输入学校名称",2,2,"");
                        return;
                    }
                });

                $('.search_textarea').click(function(){
                    $('.formR').removeClass('hide').change(function(){
                        var addressName = "";
                        var prov = $("#prov").val();
                        var country = $("#country").val();
                        var city = $("#city").val();

                        if(prov != -1 && prov != null) addressName += $("#prov").find("option:selected").text();
                        if( country != -1 && country != null) addressName +=","+$("#country").find("option:selected").text();
                        if( city != -1 && city != null) addressName+=","+ $("#city").find("option:selected").text();
                        loadSelOrg("",addressName);
                        $('.change_school').removeClass('hide');
                    });
                });

                $(".joinOrgNo").click(function(){
                    location.href="/index.htm";
                });

                $(".joinOrg").click(function () {

                    var orgId=  $('.change_school li i').parent("li").attr("code");
                    if(orgId == undefined){
                        dialogs._timer("请选择您要加入的学校",2,2,"");
                        return;
                    }

                    $.ajax({
                        type: "POST",
                        dataType: "json",
                        url: "/orgInfo/joinOrg.do",
                        data: {
                            orgId: orgId
                        },
                        success: function (data) {
                            if (common.checkResponse(data) == false) {
                                return;
                            }

                            $.ajax({
                                type: "POST",
                                dataType: "json",
                                url: "/personnel/applyToSaveInvite.do",
                                data: {
                                    orgId: orgId
                                },
                                success: function (data) {
                                    //console.log(data);
                                    if (common.checkResponse(data) == false) {
                                        return;
                                    }

                                    dialogs._timer('加入机构成功',1,2,function(){
                                        location.href = "/profile.htm";
                                    });
                                },
                                error:function(data){
                                   // console.log(data);
                                }
                            });
                        }
                    });
                });
            }
        }
});
