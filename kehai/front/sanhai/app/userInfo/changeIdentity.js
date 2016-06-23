/*切换身份模块*/

define(["jquery","common"],function($,common){

    return {
        changeIdentity: function( identity ) {
            $.ajax({
                type:"post",
                dataType:"json",
                url:"/perfectInfo/toIdentity.do",
                data:{identity:identity},
                success:function(data){
                    if(common.checkResponse(data) == false){
                        return;
                    }
                    location.href="/site/index.html";
                    //location.reload();
                },
                error:function(data){}
            });
        }
    }

});

