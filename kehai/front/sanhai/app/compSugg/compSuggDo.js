define('compSuggDo',['dialogs','base','jquery'],function(dialogs){

    //切换机构
        $('.select_type_List').rSetUpTab();

    var submitf=function(){

        $('.subTitleBar_text1').placeholder({value: '请输入课程名称、关键词等...'});
        function submit(){
            var browser = getBrowserInfo()+"" ;
//    var verinfo = (browser+"").replace(/[^0-9.]/ig,"");
            var content= $('#complainInfor').val();
            if(content==""){
                dialogs._timer('请输入建议!',2,2,'');
                return;
            }
            if(content.length>=1080){
                dialogs._timer('最多只能输入1080字!',2,2,'');
                return;
            }

            $.ajax({
                url: "/site/complain/intoComplain.do",
                type: "post",
                dataType: "json",
                data: {
                    browserInfo:browser,
                    complainInfor: $('#complainInfor').val()
                },
                success: function (response) {

                    if ("000" === response.resCode){
                        dialogs._timer('您已提交成功!',1,2,function(){
                            $('#complainInfor').val("");
                        });
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                }
            });
        }

        /*得到浏览器的版本和名字*/
        function getBrowserInfo()
        {
            var agent = navigator.userAgent.toLowerCase() ;

            var regStr_ie = /msie [\d.]+;/gi ;
            var regStr_ff = /firefox\/[\d.]+/gi
            var regStr_chrome = /chrome\/[\d.]+/gi ;
            var regStr_saf = /safari\/[\d.]+/gi ;
//IE
            if(agent.indexOf("msie") > 0)
            {
                return agent.match(regStr_ie) ;
            }

//firefox
            if(agent.indexOf("firefox") > 0)
            {
                return agent.match(regStr_ff) ;
            }

//Chrome
            if(agent.indexOf("chrome") > 0)
            {
                return agent.match(regStr_chrome) ;
            }

//Safari
            if(agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0)
            {
                return agent.match(regStr_saf) ;
            }

        }

        $('.complainBtn').click(function(){ submit(); })

    }
    return{
        submitf:submitf

    }

})