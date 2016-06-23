/**
 * Created by bbb on 2015/12/17.
 */
define([
        'jquery',
        'dialogs',
        'money',
        'common',
        'base'
    ],

    function ($,dialogs,money,common) {

        function stu_experienceDo() {

        }
        attention=function (val,attentiontype){
//        alert(orgid+" "+attentiontype)
            var stuId = stuData.stuId;
            $.ajax({
                url: "/attention/intoAttention.do",
                type: "post",
                dataType: "json",
                data: {
                    attentionObjId: stuId,
                    attentionType: attentiontype
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode){
                        Kh.addAttention(val);
                    }
                    if ("200" == response.resCode) {
                        window.location.href = "/login.htm";
                    }
                    if("300" == response.resCode){
                        dialogs._timer(response.resMsg,2,2,null);
                    }

                }
            });
        };

        stu_experienceDo.prototype.init = function () {
            /*只有学生身份显示购物车*/
            if(user.userIdentity==2){
                $('.shopping_car').removeClass('hide');
            }
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
            /*取消弹窗*/
            $('.pushBtnJs').click(function() {
                $("#pushNotice").dialog("open");

                return false;
            });
            //清除选项
            $('.cancelBtn').click(function() {

                $(".pushNotice").dialog("close");
            })

            /*点击出现搜索框*/
            $('.tch_search').css('cursor','pointer');
            $('.tch_search').click(function(){
                $('.search_bar').toggleClass('hide');
            });

            $('.subTitleBar_text1').placeholder({value:'请输入课程名称、关键词等...'});

            /*置顶*/
            toTop();
            delete this.arr;
            /*关注*/
            $('.attentionTo').click(function(){
                $(this).hide().siblings('.cancelAttention').show();
            });
            /***********************************************/
            var t=this;
            var imgsrc="";
            var stuinfo=stuData.ppResId;
            if(stuinfo==0||stuinfo==undefined||stuinfo==''){
                imgsrc="/front/sanhai/images/person.png";
            }else{
                imgsrc="/file/loadImage/"+stuinfo+"/140/140.r";
            }
            $('#userimg').attr("src",imgsrc);
            if(stuData.sex=='0'){
                $('#sex').removeClass().addClass("boy")
            }else{
                $('#sex').removeClass().addClass("girl")
            }

            if(stuData.introduce&& $.trim(stuData.introduce).length>=60){
                $('#jainjie').html("简介："+stuData.introduce.substring(0,60)+"...");
            }else{
                $('#jainjie').html("简介："+stuData.introduce);
            }
            /**********************学生首页***************************/
            $('.mainNav').children('li').eq(0).removeClass();
            $('.mainNav').children('li').eq(1).removeClass();
            $('.mainNav').children('li').eq(2).addClass("ac");
            var cls=common.df.showClass(stuData.calss);
            $('#cls').text(cls);
            var date="";
            var brithday=stuData.birthday;
            date+=brithday.length>=4?brithday.substring(0,4)+'年':'无';
            date+=brithday.length>=6?brithday.substring(4,6)+'月':'';
            date+=brithday.length==8?brithday.substring(6,8)+'日':'';
            $('#birthday').text(date);
        };
        stu_experienceDo.prototype._init = function () {
            var t = this;
            t.init();
        };
        stu_experienceDo.prototype.render = function () {
            this._init();
        };
        return stu_experienceDo;
    }
);