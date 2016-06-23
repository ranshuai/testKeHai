/**
 * Created by slg on 2016/1/7.
 * 添加原题题目的脚本
 */
define('addExplaninDo',['jquery','dialogs','common', "loadVersionAndMatch",'pageBar','umeditor_config','umeditor','jquery_ui_min','ztree', 'jquery.datetimepicker', 'kpTree', 'qrcode', 'lib/jquery_validate/jquery.validate','jquery_fileupload'],function($, dialogs, common,load,pageBar){

    var init = function() {

        var edit = UM.getEditor('myEditor');

        //选择搜题方式
        $.each($('.selectWay ul li'),function(i){
            $(this).click(function(){
                $('.searchWay').removeClass('hide').siblings().addClass('hide');
                $('.searchWay>div').eq(i).removeClass('hide').siblings().addClass('hide');
            })

        })

        var topicIdtext="";

        //+ id
        $('.addPoint').click(function(){
            $("#pageBar").html('');
            var $this=$(this);
            var showResultMain=$(this).parent().siblings('.showResultMain');
            var $searchWay=$this.parents('.searchWay');
            topicIdtext=$.trim($this.prev().children('input').val());//题号
            if (topicIdtext == "") return false;
            $searchWay.addClass('hide').siblings('.subjectAdd').addClass('idWordAdd').removeClass('hide');
            loadByquestionId(topicIdtext,1,0);
        });

        function loadByquestionId(topicId,currPage,searchWay){
            var url = "/topic/find.do";
            var data = "topicId="+topicId+",currPage";
            var subjectAddLi=$('.subjectAdd').children('ul').children('li').eq(searchWay);
            $('.subjectAdd').removeClass('hide');

            $.ajax({
                url: "/topic/find.do",
                type: "post",
                dataType: "json",
                data: {
                    currPage: currPage,
                    topicId: topicId
                },
                success: function (resp) {
                    if (!common.checkResponse(resp)) {
                        return false;
                    }
                    if (resp.resCode == "000"){
                        if (resp.data.near != undefined && resp.data.near.resCode == "000"){

                            var addRecommended='';
                            //添加推荐相似题
                            $.each(resp.data.near.data.qs, function(index, value){
                                if(topicId!=value.questionId){
                                    addRecommended+="<div class='subjectDetail' data='"+topicId+"'>"+
                                        '<div class="subTit" data="'+value.questionId+'">'+
                                        '<h6>试题编号：<span>'+value.questionId+'</span></h6>'+
                                        '<div><input type="checkbox"/>讲解题目</div>'+
                                        '<h5><i></i>已经讲过：<span>'+value.explainNum+'</span>次</h5>'+
                                        '</div>'+
                                        '<div class="subMain">'+value.content+'</div>'+
                                        "</div>"
                                }

                            });

                            subjectAddLi.show();

                            $('.subjectBtn').removeClass('hide');
                            //是否有推荐讲解题目
                            if(addRecommended!=''){

                                $('.subjectAdd').find('.subjectDetails').html(addRecommended);

                                //成功搜到题目
                                $('.subMain').find('.A_cont').before($('<div class="subResolveBtn">查看答案解析<i></i></div>'));
                                $('.subMain').find('.A_cont').addClass('hide');
                                if(questionId!=0){
                                    subjectAddLi.children('h4').addClass('hide');
                                    $('.subjectAdd').find('.subTit').children('div').html('<div><input type="checkbox"/>相似题目</div>')
                                }
                                //浏览器出现滚动条时变化
                                if($(window).height()<$('.frame_12k').height()){
                                    $(".subjectBtn").css('position','fixed');
                                    $('.subjectAdd').css('padding-bottom','115px')
                                }
                                $(window).resize(function(){
                                    if($(window).height()<$('.frame_12k').height()){
                                        $(".subjectBtn").css({
                                            "position":"fixed"
                                        });
                                    }
                                });
                                //显示分页工具条
                                pageBar.showPageBar(resp.data.near.data.currentPage, resp.data.near.data.totalPages, function (currPage) {
                                    loadByquestionId(topicId,currPage,searchWay)
                                });
                            }else{
                                if(questionId!=0){
                                    $('.subjectBtn').addClass('hide');

                                    $('.subjectList li').eq(0).show().children('.subjectNo').show().html('<h4>未找到相关题目</h4>');

                                }else{
                                    subjectAddLi.children().eq(0).removeClass('hide').html('成功添加了题目 <span></span>');
                                }
                            }
                            //点击分页时判断是否显示 讲解题目
                            var pSub=$('.subjectDetails').children();
                            var pSpan=subjectAddLi.children('.subjectSelected').find('span');

                            if(pSpan.length>0){
                                subjectAddLi.children().eq(0).addClass('hide');
                                subjectAddLi.children('.subjectSelected').removeClass('hide')
                                //页面勾选的题目
                                //本页面题目列表的data值
                                $.each(pSub,function(){
                                    var pSubData=$(this).children('.subTit').attr('data');
                                    var $this = $(this);
                                    $.each(pSpan,function(){
                                        var pSpanData=$(this).attr('data');
                                        if(pSpanData == pSubData){
                                            $this.find('.subTit input').attr('checked',true)
                                        }
                                    })
                                })

                            }else{
                                subjectAddLi.children().eq(0).removeClass('hide').children('span').text(topicId);
                            }
                        }else{
                            //没有搜到题目
                            topicIdtext="";

                            subjectAddLi.show();
                            subjectAddLi.children('.subjectNo').removeClass('hide');
                            topicIdtext="";
                            if(questionId!=0){
                                $('.subjectList li').eq(0).show().children('.subjectNo').show().html('<h4>未找到相关题目</h4>');
                            }
                        }
                    }else if (resp.resCode == "200"){
                        location.href="/login.htm";
                    }else{
                        subjectAddLi.children('.subjectNo').removeClass('hide');

                    }


                }
            });
        }


        //+ key
        $('.searchTopic').click(function(){
            $("#pageBar").html('');
            var $this=$(this);

            loadByKey($this,1,1,1);
        });
        //点击录入题目
        $('.entryTitle').click(function(){
            var $richText=$(this).parent('.recomTopics').siblings('.richText');
            var $richTextNo=$(this).parent('.subjectNo').siblings('.richText');
            var $richTextSel=$(this).parent('.subjectSelected').siblings('.richText');
            $richText.removeClass('hide');
            $richTextNo.removeClass('hide');
            $richTextSel.removeClass('hide');
            $('#myEditor').html('');

        });
        //点击取消录入题目
        $('.richText .richCancel').click(function(){
            var $richText=$(this).parents('.richText');
            $richText.addClass('hide');
            //$richText.find('#myEditor').empty();
        });
        var topid="";
        //录入原题完毕
        $('.richText .richTextEnd').click(function(){
            /*原题录入清空初始数据*/
            $('.keyWordAdd').children('ul').children('li').eq(1).find('.problemList').html("");
            $("#pageBar").html("");
            /*原题录入清空初始数据*/
            var content=$.trim($('#myEditor').html());
            if(content=='<p><br></p>'||content=="") return;
            $('.subjectAdd').find('.subjectDetails').html("");
            var $richText=$(this).parents('.richText');
            $richText.addClass('hide');
            var $this=$('.searchTopic');
            content="<div class='pd25'>"+content+"</div>";
            $.ajax({
                url: "/courses/recordQuestion.do",
                type: "post",
                dataType: "json",
                data: {
                    classId:classId,
                    text: content
                },
                success: function (response) {

                    //console.log(response.resCode);

                    if ("000" == response.resCode) {
                        topid=response.data.topicId;
                        loadByKey($this,1,1,0);
                    }else{
                        dialogs._timer("录入原题失败", 2, 2, null);
                    }
                }
            });

        });
        function loadByKey($this,currPage,searchWay,type){
            var $searchWay=$this.parents('.searchWay');
            var $keywordAdd=$this.parents('.searchWay').siblings('.keywordAdd');
            var subjectAddLi=$('.subjectAdd').children('ul').children('li').eq(searchWay);
            var content = $.trim($this.prev().children('textarea').val());//题号
            if(type==0) content=$('#myEditor').html();
            if(content=='') return;
            $searchWay.addClass('hide');
            $keywordAdd.removeClass('hide');
            $('.subjectAdd').removeClass('hide');
            $searchWay.addClass('hide').siblings('.subjectAdd').addClass('keyWordAdd').removeClass('hide');
            $('.subjectAdd').children('ul').children('li').children().addClass('hide');
            if(subjectAddLi.children('.subjectSelected').find('span').length>0){
                subjectAddLi.children().eq(0).addClass('hide');
                subjectAddLi.children('.subjectSelected').removeClass('hide')
            }
            $.ajax({
                url: "/topic/search.do",
                type: "post",
                dataType: "json",
                data: {
                    currPage: currPage,
                    content: content,
                    subjectId:subjectId
                },
                success: function (resp) {
                    if (!common.checkResponse(resp)) {
                        return false;
                    }
                    var data = resp.data.topics;
                    if (data.resCode == "000"){
                        if (data.resCode == "000"){
                            /*原题录入添加题号*/
                            if(type==0&&topid!=''){
                                $('.keyWordAdd').children('ul').children('li').eq(1).find('.problemList')
                                    .append($('<span class="problem or" data="'+topid+'">' +
                                        '<em class="problemContent">'+topid+'</em>' +
                                        '<i class="delete orDel"></i>' +
                                        '</span>'));
                            }
                            /*原题录入添加题号*/
                            topid="";
                            var qs = data.data.qs;
                            var addRecommended='';
                            //添加推荐相似题
                            $.each(qs, function(index, value){
                                addRecommended+="<div class='subjectDetail' data='"+0+"'>"+
                                    '<div class="subTit" data="'+value.questionId+'">'+
                                    '<h6>试题编号：<span>'+value.questionId+'</span></h6>'+
                                    '<div><input type="checkbox"/>讲解题目</div>'+
                                    '<h5><i></i>已经讲过：<span>'+value.explainNum+'</span>次</h5>'+
                                    '</div>'+
                                    '<div class="subMain">'+value.content+'</div>'+
                                    "</div>"

                            });
                            $('.entryTitle').click(function(){
                                var $recomTopics=$(this).parent('.recomTopics');
                                $recomTopics.addClass('hide');
                            });
                            $('.richText .richCancel').click(function(){
                                var $recomTopics=$(this).parents('.richText').siblings('.recomTopics');
                                $recomTopics.removeClass('hide');
                            });

                            subjectAddLi.show();
                            $('.subjectAdd').find('.subjectDetails').html(addRecommended);
                            $('.subjectBtn').removeClass('hide');
                            //成功搜到题目
                            $('.subMain').find('.A_cont').before($('<div class="subResolveBtn">查看答案解析<i></i></div>'));
                            $('.subMain').find('.A_cont').addClass('hide');
                            if(questionId!=0){
                                subjectAddLi.children('h4').addClass('hide');
                                $('.subjectAdd').find('.subTit').children('div').html('<div><input type="checkbox"/>相似题目</div>')
                            }
                            //浏览器出现滚动条时变化
                            if($(window).height()<$('.frame_12k').height()){
                                $(".subjectBtn").css('position','fixed');
                                $('.subjectAdd').css('padding-bottom','115px')
                            }
                            $(window).resize(function(){
                                if($(window).height()<$('.frame_12k').height()){
                                    $(".subjectBtn").css({
                                        "position":"fixed"
                                    });
                                }
                            });
                            //显示分页工具条
                            pageBar.showPageBar(resp.data.topics.data.currentPage, resp.data.topics.data.totalPages, function (currPage) {
                                loadByKey($this,currPage,searchWay,type)
                            });
                            //点击分页时判断是否显示 讲解题目
                            var pSub=$('.subjectDetails').children();
                            var pSpan=subjectAddLi.children('.subjectSelected').find('span');

                            if(pSpan.length>0){
                                subjectAddLi.children().eq(0).addClass('hide');
                                subjectAddLi.children('.subjectSelected').removeClass('hide')
                                //页面勾选的题目
                                //本页面题目列表的data值
                                $.each(pSub,function(){
                                    var pSubData=$(this).children('.subTit').attr('data');
                                    var $this = $(this);
                                    $.each(pSpan,function(){
                                        var pSpanData=$(this).attr('data');
                                        if(pSpanData == pSubData){
                                            $this.find('.subTit input').attr('checked',true)
                                        }
                                    })
                                })
                            }else{
                                subjectAddLi.children().eq(0).removeClass('hide');
                            }

                        }else{
                            //没有搜到题目
                            subjectAddLi.show();
                            subjectAddLi.children('.subjectNo').removeClass('hide');
                            $('.subjectBtn').addClass('hide');

                        }
                    }else if (resp.resCode == "200"){
                        location.href="/login.htm";
                    }else{
                        subjectAddLi.show();
                        subjectAddLi.children('.subjectNo').removeClass('hide');
                        $('.subjectBtn').addClass('hide');
                        $('.entryTitle').click(function(){
                            var $subjectNo=$(this).parent('.subjectNo');
                            $subjectNo.addClass('hide');
                        });
                        $('.richText .richCancel').click(function(){
                            var $subjectNo=$(this).parents('.richText').siblings('.subjectNo');
                            $subjectNo.removeClass('hide');
                        });

                        /*原题录入添加题号*/
                        if(type==0){
                            subjectAddLi.find('.subjectSelected').removeClass('hide');
                            subjectAddLi.find('.problemList')
                                .append($('<span class="problem or" data="'+topid+'">' +
                                    '<em class="problemContent">'+topid+'</em>' +
                                    '<i class="delete orDel"></i>' +
                                    '</span>'));
                            $('.subjectBtn').removeClass('hide').css('position','static');
                        }
                    }
                }
            });
        }

        //选择讲解题目
        $('.subjectAdd').on('click','.subjectDetail input[type=checkbox]',function(){

            var $this=$(this);
            var $subjectAdd=$this.parents('.subjectAdd');
            var topicId=$this.parents('.subTit').attr('data');//题目id
            var searchWay=0;

            if($subjectAdd.hasClass('idWordAdd')){
                searchWay=0
            }else
            if($subjectAdd.hasClass('keyWordAdd')){
                searchWay=1
            }
            var subjectAddLi=$('.subjectAdd').children('ul').children('li').eq(searchWay);

            var topicIdOr=subjectAddLi.children('h4').children('span').text();

            subjectAddLi.show().children().eq(0).addClass('hide').next().removeClass('hide');

            //是否第一次添加讲解题目
            //if(!subjectAddLi.find('span.problem').html() && searchWay==0 && questionId==0){
            //    subjectAddLi.find('.problemList')
            //        .append($('<span class="problem or" data="'+topicIdOr+'">' +
            //            '<em class="problemContent">'+topicIdOr+'</em>' +
            //            '<i class="delete orDel"></i>' +
            //            '</span>'));
            //}

            if($(this).attr('checked')){
                //选中添加
                subjectAddLi.find('.problemList')
                    .append($('<span class="problem or" data="'+topicId+'">' +
                        '<em class="problemContent">'+topicId+'</em>' +
                        '<i class="delete orDel"></i>' +
                        '</span>'));
            }else{
                $this.attr('checked','checked');

                dialogs._confirm('是否确认删除？','提示',function(){
                    //取消选中删除
                    if(subjectAddLi.children('.subjectSelected').find('span').length==1){
                        if(subjectAddLi.parents('.subjectAdd').hasClass('idWordAddSame')){
                            subjectAddLi.children().eq(0).siblings('.subjectSelected').addClass('hide');
                        }else{
                            subjectAddLi.children().eq(0).removeClass('hide').siblings('.subjectSelected').addClass('hide');
                        }
                    }
                    $this.attr('checked',false);
                    subjectAddLi.children('.subjectSelected').find('span[data='+topicId+']').remove();

                },'')
            }


        })

        window.onscroll=function(){
            if(document.body.scrollTop>=115){
                $('.subjectSelected').css({'position':'fixed','top':0,'z-index':1})
            }else{
                $('.subjectSelected').css({'position':'inherit','top':0})
            }
        }



        /*按钮事件*/
        //按钮 题目解析
        $('.addExplain').on('click','.subResolveBtn',function(){
            var $this=$(this);
            $this.toggleClass('subResolveBtned');
            if($this.hasClass('subResolveBtned')){
                $this.html('收起答案解析<i></i>')
                $this.next('.A_cont').removeClass('hide');
            }else{
                $this.html('查看答案解析<i></i>')
                $this.next('.A_cont').addClass('hide');
            }

        })

        //按钮 返回
        $('button.btnReturn').click(function(){
            $.each($('.addExplain>div>div'),function(i){
                if(!$(this).hasClass('hide')){
                    if(i==0){
                        location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
                    }else
                    if(i==1){
                        $(this).prev().removeClass('hide').siblings().addClass('hide');
                        $(this).find('input').val('');
                        $(this).find('textarea').val('')

                    }else
                    if(i==2){
                        $(this).prev().find('input').val('');
                        $(this).prev().find('textarea').val('');
                        $(this).prev().removeClass('hide').siblings().addClass('hide');
                        $(this).find('.blueBar').addClass('hide');
                        $(this).find('.subjectSelected').children('div').html('');
                        $(this).find('h4 span').text('');
                        $('.subjectDetails').html('').siblings('subjectBtn').addClass('hide');

                    }

                }


            })
        })

        //按钮 删除 X
        $('.subjectSelected').on('click','.orDel',function(){
            var $this=$(this);
            var topicId=$this.parent().attr('data');
            var subjectAdd=$this.parents('.subjectAdd');
            var searchWay=0;

            if(subjectAdd.hasClass('idWordAdd')){
                searchWay=0
            }else
            if(subjectAdd.hasClass('keyWordAdd')){
                searchWay=1
            }
            var subjectAddLi=$('.subjectAdd').children('ul').children('li').eq(searchWay);
            dialogs._confirm('是否确认删除？','提示',function(){
                if(subjectAddLi.children('.subjectSelected').find('span').length==1){
                    if(subjectAddLi.parents('.subjectAdd').hasClass('idWordAddSame')){
                        subjectAddLi.children().eq(0).siblings('.subjectSelected').addClass('hide');
                    }else{
                        subjectAddLi.children().eq(0).removeClass('hide').siblings('.subjectSelected').addClass('hide');
                    }
                }
                subjectAdd.find('div[data='+topicId+']').find('input').attr('checked',false);
                $this.parent().remove();
            },'')



        })

        //按钮 保存 取消
        $('.subjectBtn').on('click','.yes',function(){
            /*保存相似题*/
            if(questionId!=0){
                var arr = [];
                $.each($('.problemList').children('span'), function(index, value){
                    arr.push($(value).attr('data') )
                });
                if(arr.toString()==""){
                    dialogs._timer("您还没有选择相似题!", 2, 2, null);
                    return;
                }
                $.ajax({
                    url: "/courses/addSimilarQuestions.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        classId:classId,
                        questionId:questionId,
                        similaQuestionIds: arr.toString()
                    },
                    success: function (response) {
                        if ("000" == response.resCode) {
                            location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                        }
                    }
                });
            }else{
                /*保存原题*/
                var arr = [];
                if(topicIdtext!="") arr.push(topicIdtext);
                $.each($('.problemList').children('span'), function(index, value){
                    arr.push($(value).attr('data') )
                });
                if(arr.toString()==""){
                    dialogs._timer("您还没有选择讲解题目!", 2, 2, null);
                    return;
                }
                $.ajax({
                    url: "/courses/addQuestions.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        classId:classId,
                        questionIds: arr.toString()
                    },
                    success: function (response) {

                        //console.log(response.resCode);

                        if ("000" == response.resCode) {
                            topicIdtext="";
                            location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                        }
                    }
                });
            }

        }).on('click','.non',function(){
            //放弃添加时把原题号保存到库中
            if(questionId==0&&topicIdtext!=""){
                $.ajax({
                    url: "/courses/addQuestions.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        classId:classId,
                        questionIds: topicIdtext
                    },
                    success: function (response) {

                        //console.log(response.resCode);

                        if ("000" == response.resCode) {
                            topicIdtext="";
                            location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                        }
                    }
                });
            }else{
                location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
            }
        });

        /*点击x取消保存原题号*/
        $('#del').on('click','',function(){
            if(questionId==0&&topicIdtext!=""){
                $.ajax({
                    url: "/courses/addQuestions.do",
                    type: "post",
                    dataType: "json",
                    data: {
                        classId:classId,
                        questionIds: topicIdtext
                    },
                    success: function (response) {

                        //console.log(response.resCode);

                        if ("000" == response.resCode) {
                            topicIdtext="";
                            location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
                        }
                        if ("200" == response.resCode) {
                            window.location.href = "/login.htm";
                        }
                    }
                });
            }else{
                location.href="/courses/"+courseMode+"/"+classId+"/modify.htm";
            }
        })

        /*图片搜题*/
        $('.picPhoneBtn').click(function(){
            var $this = $(this);
            if($this.hasClass('now')){
                $this.removeClass('now').html('<i class="add_knowledge"></i>使用手机图片选题');
                $this.siblings('.qrCode').addClass('hide').empty();
                $this.siblings('h6').addClass('hide');

            }else{
                $.post("/topic/createId.do", function(resp){
                    if (resp.resCode == "000"){

                        qId = resp.data.qId;
                        if (qId > 0){
                            var txt = "http://kehai.com/site/app/dow.r?appId=school_release&t=1&qId="+qId;
                            /*判断浏览器类型 IE8*/
                            if(navigator.userAgent.indexOf("MSIE 8.0")>0) {
                                $("#qrcode").qrcode({render: "table",width:121, height: 121, text:txt});
                            }else{
                                $("#qrcode").qrcode({width:121, height: 121, text:txt});
                            }
                        }
                        $this.addClass('now').html('查看原题');
                        $this.siblings('.qrCode').removeClass('hide');
                        $this.siblings('h6').removeClass('hide');
                    }else if (resp.resCode == "200"){
                        location.href="/login.htm";
                    }
                }, "json");

            }



        })
        /*查看原图*/


        /*搜索相似题*/
        if(questionId!=0){
            $('.subjectAdd').removeClass('hide').addClass('idWordAddSame idWordAdd');
            $('.addExplain').children('h3').children('p').html('添加 '+questionId+' 的相似题');
            $('.subjectSelected').children('h4').html('已选中相似题：');


            loadByquestionId(questionId,1,0);
        }else{
            $('.idWordAdd').addClass('idWordAddOr');
            $('.selectWay').removeClass('hide');

        }

    };

    return{
        init:init
    }
});