/**
 * Created by liqinghua on 15/10/22.
 */
define(["jquery","common","iscroller"],function ($,common){
    $(function(){
        $(window).height(730);
        $(window).width(960);
        $('.cs_main').css('height',$(window).height()-90+'px');
        $('.cs_mrmain').css('height',$(window).height()-151+'px');
        $('.cst .cs_mr .cs_mrmain').css('height',$(window).height()-476+'px');
        $('.cst .cs_mc .cs_mrmain').css('height',$(window).height()-90+'px');
        //动态改变大小
        $(window).resize(function(){
            $('.cs_main').css('height',$(window).height()-90+'px');
            $('.csc .wrap').css('height',$(window).height()-370+'px');
            $('.cs_mrmain').css('height',$(window).height()-151+'px');
            $('.cst .cs_mr .cs_mrmain').css('height',$(window).height()-476+'px');
            $('.cst .cs_mc .cs_mrmain').css('height',$(window).height()-90+'px');
        });

        //tab切换
        $('.cs_mrnav li').each(function(index){
            var i=index;
            $(this).click(function(){
                $(this).addClass('cs_high').siblings().removeClass('cs_high');
                $('.cs_mrmain>div').eq(i).removeClass('hide').siblings().addClass('hide');
            })
        });
        //选择咨询师列表事件
        $('.cs_list').on('click','dl',function(){
            if($(this).attr('class')=='offline'){
                return false;
            }else{
                var cs_name=$(this).find('b').text(),
                    cs_class=$(this).find('span').text();
                $('.consult_person').show().siblings().hide();

                $('.cs_headinfo').children('b').text(cs_name);
                $('.cs_headinfo').children('span').text(cs_class);

                //备注客户信息
                $('.cs_custominfro li:eq(0) span').text(cs_name);
            }
        });

        /* 咨询师-------*/
        //备注-填写按钮
        $('.remarks_btn').click(function(){
            $('.remarks_main').addClass('remarks_aditor').children('textarea').removeClass('hide');
            $(this).css('display','none');
        });
        //保存客户信息
        $('.saveinfro_btn').click(function(){
            $('.remarks_main').removeClass('remarks_aditor').children('textarea').addClass('hide').val('');
            $('.remarks_btn').css('display','block');
        });
        //正在联系
        $('.cs_talking').on('click','dl',function(){
            $(this).addClass('talking').siblings().removeClass('talking');
        });

        /*咨询框-聊天窗口----------*/

        //发送消息
        $('.dialog_message_sendbtn').click(function(){
            sendChat();
        });
        $('.send_main textarea').keydown(function(event){
            if(event.keyCode == 13){
                event.preventDefault();
                sendChat();
            }
        });
    });

    function AsyncGetAdviserList(type,typeId){
        // 获取可选咨询师列表
        $.ajax({
            url: "/consult/getAdviserList.do",
            type: "post",
            data: {
                type: type,
                typeId: typeId
            },
            success:function(result){
                if(common.checkResponse(result)){
                    var data = result.data;
                    if(data.consultList){
                        var adviserList = '';
                        $.each(data.consultList,function(i,n){
                            var adviserName = n.nickName==''? n.name: n.nickName;
                            var online = n.online=='online'?'':'offline';
                            adviserList += '<dl adv_id="' + n.userId + '" adv_name="' + adviserName + '" class="'+online+'">'+
                                                '<dt><span></span></dt>'+
                                                '<dd><b>' + adviserName + '</b><span></span><i></i></dd>'+
                                            '</dl>';
                        });
                        $('#adviserList').html(adviserList);

                        var classInfo = '';
                        //更新课程信息
                        if(type == 'course'){
                            var courseInfo = data.course;
                            $('.cs_mr .cs_mrnav .info_text').text('课程信息');
                            var courseImgUrl = '';
                            if(courseInfo.advertiseResId == '' || courseInfo.advertiseResId == 0){
                                courseImgUrl = '/front/sanhai/images/course.png';
                            }else {
                                courseImgUrl = '/file/loadImage/' + courseInfo.advertiseResId + '.r';
                            }
                            classInfo = '<ul>'+
                                '<li><img src="' + courseImgUrl + '" alt=""/></li>'+
                                '<li class="font18">'+courseInfo.courseTitle+'<span class="blue">('+common.df.coursesType(courseInfo.courseMode)+')</span></li>'+
                                '<li>' + courseInfo.subject + '</li>'+
                                '<li class="orange">￥' + courseInfo.price/100 + '</li>'+
                                '</ul>';

                        }else if(type == 'teacher'){
                            $('.cs_mr .cs_mrnav .info_text').text('教师信息');

                            var teacherInfo = data.teacher;
                            var teaImgUrl = '';
                            if(teacherInfo.ppResId == '' || teacherInfo.ppResId == 0){
                                teaImgUrl = '/front/sanhai/images/person.png';
                            }else{
                                teaImgUrl = '/file/loadImage/' + teacherInfo.ppResId + '.r';
                            }
                            classInfo = '<ul>'+
                                '<li><img src="' + teaImgUrl + '" alt=""/></li>'+
                                '<li class="font18">'+teacherInfo.name+'<span class="blue"></span></li>'+
                                '<li>' + teacherInfo.major + '</li>'+
                                '<li class="orange"></li>'+
                                '</ul>';
                        }else if(type == 'org'){
                            $('.cs_mr .cs_mrnav .info_text').text('机构信息');

                            var orgInfo = data.org;
                            var orgImgUrl = '';
                            if(orgInfo.ppResId == '' || orgInfo.ppResId == 0){
                                orgImgUrl = '/front/sanhai/images/person.png';
                            }else{
                                orgImgUrl = '/file/loadImage/'+orgInfo.ppResId+'.r';
                            }
                            classInfo = '<ul>'+
                                '<li><img src="'+ orgImgUrl + '" alt=""/></li>'+
                                '<li class="font18">'+orgInfo.orgName+'<span class="blue"></span></li>'+
                                '<li></li>'+
                                '<li class="orange"></li>'+
                                '</ul>';
                        }

                        $('.cs_classinfro').html(classInfo);

                        //咨询师列表点击事件
                        $('#adviserList dl').click(function(){
                            if($(this).attr('class')=='offline'){
                                return false;
                            }else{
                                var adv_name = $(this).attr('adv_name'),
                                    cs_class=$(this).find('span').text();
                                $('.consult_person').show().siblings().hide();

                                // 更新 最近联系人列表
                                showRecentList($(this).attr('adv_id'),adv_name,'talking');
                                // 更新聊天窗口
                                showChatWindow($(this).attr('adv_id'),'');

                                $('.consult_person').attr('f_id',data.from_userId);
                                $('.consult_person').attr('f_name',data.from_userNickName);
                                $('.consult_person').attr('f_phone',data.from_phoneNumber);
                                //$('.consult_person').attr('t_id',$(this).attr('adviser_userId'));
                                //$('.consult_person').attr('t_name',$(this).text());
                                $('.consult_person').attr('type',type);
                                $('.consult_person').attr('typeId',typeId);

                                $('.cs_headinfo').children('b').text(adv_name);
                                $('.cs_headinfo').children('span').text(cs_class);

                            }
                        });
                    }
                    initChat();
                }
            }
        });
    }
    /**
     * 初始化聊天
     */
    function initChat(){
        //初始化
        PL.webRoot = '/';
        PL._init();
        //  与服务器建立连接 建立session  并监听事件
        //  /pushlet/ping  是为了与服务器保持心跳  知道服务器没死
        //  /user/login  登陆信息,改造ajax-pushlet-client 使其加入监听时,以此用户身份登录
        //  /user/chat  聊天信息
        PL.joinListen('/pushlet/ping,/user/login,/user/chat');
    }

    function sendChat(){
        var msg = $('.send_main textarea').val();
        if(msg == ''){
            $("span.info").show();
            setTimeout(function(){
                $("span.info").hide();
            }, 1000);
            return false;
        }
        var in_talking = $('#recentContacts .talking');
        var adv_id = in_talking.attr('adv_id');
        var adv_name = in_talking.attr('adv_name');

        var f_id = $('.consult_person').attr('f_id');
        var f_name = $('.consult_person').attr('f_name');
        var f_phone = $('.consult_person').attr('f_phone');
        var consultType = $('.consult_person').attr('type');
        var consultId = $('.consult_person').attr('typeId');
        var msgType = '0';      //默认是文本消息
        var f_img = "/file/userFace/"+f_id+".r";
        if(consultType == 'course'){
            consultType = '0';
        }else if(consultType == 'teacher'){
            consultType = '2';
        }else if(consultType == 'org'){
            consultType = '1';
        }else{
            consultType = '0';
        }
        // 聊天框中 添加记录
        appendMessage($('#chatBox_'+adv_id),'right',msg,f_img,adv_id);
        // 后台发送
        PL.publish('/user/chat','p_to='+adv_id+'&t_name='+adv_name+'&f_id='+f_id+'&f_name='+f_name+'&f_phone=' + f_phone + '&msg='+encodeURIComponent(msg)+'&msgType='+msgType+'&consultType='+consultType+'&consultId='+consultId);
    }

    /**
     * pushlet 从服务器端返回时回调函数
     * @param event
     */
    window.onEvent = function (event){
        if(event.getSubject() == '/user/login'){

        }else if(event.getSubject() == '/user/chat'){
            var f_id = event.get('f_id');
            var f_name = event.get('f_name');
            var msg = event.get('msg');
            var img = '../front/sanhai/images/consultmen1.png';

            var show_hide = $('#recentContacts dl').length > 0 ?'hide':'';
            var talking = $('#recentContacts dl').length > 0 ?'':'talking';

            // 最近联系人列表更新
            showRecentList(f_id,f_name,talking);
            // 聊天窗口 更新
            showChatWindow(f_id,show_hide);
            // 聊天框中 添加记录
            appendMessage($('#chatBox_'+f_id),'left',msg,img,f_id);
        } else if (event.getEvent() == 'leave-ack'){
            //console.log("leave-ack");
        }
    }
    /**
     * 聊天框添加聊天信息
     * @param container  容器 jquery对象
     * @param position  位置 left right
     * @param msg       信息
     * @param img       头像图片url
     */
    function appendMessage(container,position,msg,img,adv_id){
        container.find('.dialog_message').append('<div class="dialog_message_'+position+' clearfix">'+
            '<img src="' + img + '" alt=""/>'+
            '<p><i></i><span>'+msg+'</span></p>'+
            '</div>');
        if(position == 'right'){
            $('.dialog_message_input').val('');
        }
        //srollClick();
        $('#chatBox_'+adv_id)._init_scroll();
    }
    /**
     * 显示最近联系人列表
     * @param adv_id  咨询师ID
     * @param adv_name  咨询师姓名
     * @param talking  是否激活正在聊天
     */
    function showRecentList(adv_id,adv_name,talking){
        if($('#linkUser_' + adv_id).length == 0) {
            // 最近联系人列表 添加该用户
            $('#recentContacts').append('<dl id="linkUser_' + adv_id + '" adv_id="' + adv_id + '" adv_name="' + adv_name + '" >' +
                                            '<dt><span></span></dt>'+
                                            '<dd><b>' + adv_name + '</b></dd>'+

                                        '</dl>');
        }

        if(talking.toLowerCase() == 'talking'){
            $('#linkUser_'+adv_id).addClass('talking').siblings().removeClass('talking');
        }
    }

    /**
     * 创建聊天窗口  adv_id 不为空 如果不存在 chatBox_advId的窗口则创建  否则显示
     * @param adv_id     咨询师id
     * @param show_hide   是否显示  默认显示，hide隐藏
     */
    function showChatWindow(adv_id,show_hide){
        if(adv_id){
            // 如果该聊天窗口不存在,创建  否则，显示
            if($('#chatBox_'+adv_id).length == 0){
                $('#c_container').append('<div class="pa '+show_hide+'" id="chatBox_' + adv_id + '">'+
                    '<div class="dialog_box wrap">'+
                    '<div class="dialog_message cont">'+
                    '</div>'+
                    '<div class="scroll_bar"></div>'+
                    '</div>'+
                    '</div>');
            }else{
                $('#chatBox_'+adv_id).removeClass('hide').siblings().addClass('hide');
            }

            //如果 该聊天窗口隐藏不处理；否则,改变聊天头信息和相应联系人信息
            if(show_hide.toLowerCase() != 'hide'){
                var talking_user = $('.cs_list .talking');
                var adv_img = '../front/sanhai/images/consultmen1.png';
                var adv_name = talking_user.attr('adv_name');

                // 聊天框头部的头像和姓名  头像不用变，咨询师头像都一样
                //$('.cs_headinfo img').attr('src',adv_img);
                $('.cs_headinfo b').text(adv_name);

            }
        }
    }
    return {
        AsyncGetAdviserList:AsyncGetAdviserList
    }
});