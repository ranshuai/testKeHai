define('pushSubjectDo',['expandInfoDo','dialogs','base'],function(expandInfoDo,dialogs){

    var a=function(){

        /*题目展示区域定位至最顶部*/
        var ssvTop=$('.subjectShowView').offset().top;
        $(window).scroll(function () {

            if($(window).scrollTop()>=ssvTop){
                $('.subjectShowView').addClass('ssvFixed');
            }else{
                $('.subjectShowView').removeClass('ssvFixed');
            }

        });



        /*$('.determineBtnTab').click(function(){
            $('.subjectShowTab .tabItem').show();

        })*/

        /*题目切换*/
        $('.subjectShowView').on('click','ul li',function(){
            $(this).addClass('ac').siblings().removeClass('ac');
            //表单数据切换
        });

        /*表单添加按钮*/
        $('.subjectShowTab .addBtn').click(function(){
            var sstInput=$('.subjectShowTab input[type=checkbox]:checked');
            if(sstInput.length==0){
                dialogs._timer('请选择添加名单！',2,2,'')
            }else{
                dialogs._timer('添加成功！',1,2,function(){
                //sstInput.parents('tr').remove();

                });
                //dialogs._timer('添加失败！',2,2,'');


            }



        });


        /*全选*/
        expandInfoDo.allChanges();

        /*题目展示过多，横向滚动条*/
        var ssv=$('.subjectShowView');
        var ssvW=ssv.width();
        var ssvUlW=ssv.find('li').length*ssv.find('li').width();
        if(ssvW<ssvUlW){
            ssv.css('height','57px');
            ssv.find('ul').css('width',ssvUlW+'px')

        }
    }

    return{
        a:a
    }



});
