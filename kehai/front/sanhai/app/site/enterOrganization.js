/**
 * Created by bbb on 2015/12/9.
 */



define(['jquery','common','base'],function($,common){
    function enterOrganization(){

    }

    enterOrganization.prototype.Organization= function (){
        $.ajax({
            url: "/site/newJoinOrg.r",
            dataType :"json",
            success : function (res){
                if(common.checkResponse(res)) {
                    var htmlStr ="";
                    $.each(res.data.list , function(index, item ){
                        if(item.ppResId){
                            htmlStr += '<li><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img STYLE="width:100px; height: 100px;" src="/file/loadImage/' + item.ppResId + '/120/80.r" alt="' + item.orgName + '" title="' + item.orgName + '"></a></li>';
                        } else {
                            htmlStr += '<li><a href="/site/shool/' + item.orgId + '/findCourseByorgId.htm"><img STYLE="width:100px; height: 100px;" src="/front/sanhai/images/person.png" alt="' + item.orgName + '" title="' + item.orgName + '"></a></li>';
                        }
                    });
                    if(htmlStr.length > 0 ) {
                        $(".organization_banner_list").html(htmlStr);
                    }
                    // /!*入驻机构切换*!/
                    if($('.organization_banner_list').children().size())$('.organization_banner').rOrganizationBanner();
                }
            }
        });
    };


    return enterOrganization;

});
