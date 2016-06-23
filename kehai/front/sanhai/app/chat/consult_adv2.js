/**
 * Created by liqinghua on 15/10/26.
 */

define(["jquery","common","dialogs","iscroller"], function($, common, dialogs){
    $(function(){
        $(window).height(730);
        $(window).width(960);
        $('.cs_main').css('height',$(window).height()-90+'px');
        $('.cs_mrmain').css('height',$(window).height()-151+'px');
        $('.cst .cs_mr .cs_mrmain').css('height',$(window).height()-476+'px');
        $('.cst .cs_mc .cs_mrmain').css('height',$(window).height()-90+'px');
        $('.cst .cs_ml').css('height',$(window).height()-90+'px');

        //动态改变大小
        $(window).resize(function(){
            $('.cs_main').css('height',$(window).height()-90+'px');
            $('.csc .wrap').css('height',$(window).height()-370+'px');
            $('.cs_mrmain').css('height',$(window).height()-151+'px');
            $('.cst .cs_mr .cs_mrmain').css('height',$(window).height()-476+'px');
            $('.cst .cs_mc .cs_mrmain').css('height',$(window).height()-90+'px');
            $('.cst .cs_ml').css('height',$(window).height()-90+'px');

        });

        //tab切换
        $('.cs_mrnav li').each(function(index){
            var i=index;
            $(this).click(function(){
                $(this).addClass('cs_high').siblings().removeClass('cs_high');
                $('.cs_mrmain>div').eq(i).removeClass('hide').siblings().addClass('hide');
            })
        });

        //选择正在聊天用户列表事件
        //$('.cs_talking').on('click','dl',function(){
        //    if($(this).attr('class')=='offline'){
        //        return false;
        //    }else{
        //        $(this).addClass('talking').siblings().removeClass('talking');
        //        var stu_id = $(this).attr('stu_id');
        //        showChatWindow(stu_id,'');
        //    }
        //});
        // 历史联系人列表 双击
        $('.cs_history').on('dblclick','dl',function(){
            var stu_id = $(this).attr('stu_id');
            var stu_name = $(this).attr('stu_name');
            var stu_phone = $(this).attr('stu_phone');
            var stu_consultType = '0';
            var stu_consultId = '0';
            if($(this).hasClass("offline")){
                return false;
            }
            // 正在联系列表 更新
            showTalkingList(stu_id,stu_name,stu_phone,stu_consultType,stu_consultId,'talking');
            // 切换标签
            $('#cs_left .cs_mrnav li').eq(0).addClass('cs_high').siblings().removeClass('cs_high');
            $('#cs_left .cs_mrmain > div').eq(0).removeClass('hide').siblings().addClass('hide');

            // 聊天窗口信息 更新
            showChatWindow(stu_id,'');
        });

        /* 咨询师-------*/
        //备注-填写按钮
        $('.remarks_btn').click(function(){
            $('.remarks_main').addClass('remarks_aditor').children('textarea').removeClass('hide').val("");
            $(this).css('display','none');
        });
        //保存客户信息
        $('.saveinfro_btn').click(function(){
            saveCustomerInfo();
            $('.remarks_main').removeClass('remarks_aditor').children('textarea').addClass('hide');
            $(".remarks_btn").css('display', 'block');
        });
        //正在联系
        $('.cs_talking')
            .on('mouseover','dl',function(){
                $(this).children('span').addClass('del_taking').parents('dl').siblings().children('span').removeClass('del_taking');
            })
            .on('mouseout','dl',function(){
                $(this).children('span').removeClass('del_taking');
            })
            .on('click','dl',function(){
                $(this).addClass('talking').siblings().removeClass('talking');
                //显示消息
                showChatWindow($(this).attr('stu_id'),'');

            })
            .on('click','.del_taking',function(){
                //$(this).parents('dl').slideUp();
                //$(this).parent().removeClass('talking');
                $(this).parents('dl').remove();
                e.cancelBubble = true;
            });

        /*结束-------*/

        //发送消息  点击发送按钮
        $('.dialog_message_sendbtn').click(function(){
            sendChat();
        });
        // 输入文本域中回车
        $('.dialog_message_input').keydown(function (event) {
            if(event.keyCode == 13){
                event.preventDefault();
                sendChat();
            }
        });

    });
    /**
     * 异步获得 咨询师信息
     * @constructor
     */
    function AsyncAdviserGetInfo(){
        $.ajax({
            url: "/consult/adviserGetInfo.do",
            type: "post",
            success:function(result){
                if(common.checkResponse(result)){
                    $('.consult_person').attr('f_id',result.data.adv_userId);
                    $('.consult_person').attr('f_name',result.data.adv_userName);
                    $('.consult_person').attr('f_phone',result.data.adv_phone);

                    var historyList= result.data.historyList;
                    for(var i=0;i<historyList.length;i++){
                        var img = '/file/userFace/'+historyList[i].userId+'.r';
                        var online_status = historyList[i].online == 'online'?'online':'offline';
                        $('.cs_history').append('<dl stu_id="'+historyList[i].userId+'" stu_name="'+historyList[i].userName+'" stu_phone="' + historyList[i].userPhone + '" class="'+online_status+'">'+
                            '<dt><span><img src="'+img+'" alt=""/></span></dt>'+
                            '<dd><b>'+historyList[i].userName+'</b></dd>'+
                            '</dl>');
                    }
                }
            }
        });
        initChat();
    }
    /**
     * 异步获得 该用户咨询信息
     * @constructor
     */
    function AsyncPotCustomerInfo(stu_phone){
        var old_stu_phone = $('.remarks_main').attr('stu_phone');
        if(stu_phone == old_stu_phone){
            return false;
        }
        $.ajax({
            url:'/consult/getCustomerInfo.do',
            type:'post',
            data:{stu_phone:stu_phone},
            success:function(result){
                if(common.checkResponse(result)){
                    var potInfo = result.data.info;
                    $('.remarks_main').attr('stu_phone',stu_phone);
                    if(potInfo){
                        $('.remarks_main textarea').text(potInfo.consultContent);
                    }
                }
            }
        });
    }
    /**
     * 异步加载 学生咨询信息 课程、学校、老师
     * @constructor
     */
    function AsyncConsultInfo(){
        var consultType = $('#talking .talking').attr('stu_consultType');
        var consultId = $('#talking .talking').attr('stu_consultId');
        var old_consultType = $('.cs_classinfro').attr('consultType');
        var old_consultId = $('.cs_classinfro').attr('consultId');
        if(!(consultType && consultId) || consultId==0 ){
            return false;
        }

        if(consultType == old_consultType && consultId == old_consultId){
            return false;
        }
        $.ajax({
            url: "/consult/getConsultInfo.do",
            type: "post",
            data: {
                consultType: consultType,
                consultId: consultId
            },
            success:function(data){
                if(common.checkResponse(data)) {
                    $('.cs_classinfro').attr('consultType', consultType);
                    $('.cs_classinfro').attr('consultId', consultId);
                    consultType = data.data.consultType;
                    var classInfo = '';
                    if (consultType == '0') {
                        var courseInfo = data.data.course;
                        classInfo = '<ul>' +
                            '<li><img src="/file/loadImage/' + courseInfo.advertiseResId + '.r" alt=""/></li>' +
                            '<li class="font18">' + courseInfo.courseTitle + '<span class="blue">(' + common.df.coursesType(courseInfo.courseMode) + ')</span></li>' +
                            '<li>' + courseInfo.subject + '</li>' +
                            '<li class="orange">￥' + courseInfo.price / 100 + '</li>' +
                            '</ul>';

                    } else if (consultType == '1') {
                        var orgInfo = data.data.org;
                        classInfo = '<ul>' +
                            '<li><img src="/file/loadImage/' + orgInfo.ppResId + '.r" alt=""/></li>' +
                            '<li class="font18">' + orgInfo.orgName + '<span class="blue"></span></li>' +
                            '<li></li>' +
                            '<li class="orange"></li>' +
                            '</ul>';
                    } else if (consultType == '2') {
                        var teacherInfo = data.teacher;
                        classInfo = '<ul>' +
                            '<li><img src="/file/loadImage/' + teacherInfo.ppResId + '.r" alt=""/></li>' +
                            '<li class="font18">' + teacherInfo.name + '<span class="blue"></span></li>' +
                            '<li>' + teacherInfo.major + '</li>' +
                            '<li class="orange"></li>' +
                            '</ul>';
                    }
                    $('.cs_classinfro').html(classInfo);
                }
            }
        });
    }
    /**
     * 保存客户信息
     */
    function saveCustomerInfo(){
        var customerInfo = $('.remarks_main textarea').val();
        if(customerInfo == ''){
            dialogs._alert('客户信息不能为空',null,null);
            return false;
        }
        var stu_id = $('#talking .talking').attr('stu_id');
        var stu_name = $('#talking .talking').attr('stu_name');
        var stu_phone = $('#talking .talking').attr('stu_phone');
        if(stu_id){
            $.ajax({
                url: "/consult/saveCustomerInfo.do",
                type: "post",
                data: {
                    stu_id: stu_id,
                    stu_name: stu_name,
                    stu_phone: stu_phone,
                    customerInfo: customerInfo
                },
                success:function(data){
                    if(common.checkResponse(data)){
                        dialogs._alert('保存客户信息成功',null);
                    }
                }
            });
        }
    }
    /**
     * 初始化 聊天组件
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
    /**
     * 发送聊天信息
     */
    function sendChat(){
        var msg = $('.dialog_message_input').val();
        if(msg != ''){
            var in_talking = $('#talking .talking');
            var t_id = in_talking.attr('stu_id');
            var t_name = in_talking.attr('stu_name');
            var consultType = in_talking.attr('stu_consultType');
            var consultId = in_talking.attr('stu_consultId');
            var f_id = $('.consult_person').attr('f_id');
            var f_name = $('.consult_person').attr('f_name');
            var f_phone = $('.consult_person').attr('f_phone');

            var msgType = '0';  //默认发送文本消息
            PL.publish('/user/chat','p_to='+t_id+'&t_name='+t_name+'&f_id='+f_id+'&f_name='+f_name+'&f_phone=' + f_phone + '&msg='+encodeURIComponent(msg)+'&msgType='+msgType+'&consultType='+consultType+'&consultId='+consultId);
            appendMessage($('#chatBox_'+t_id),'right',msg,'../front/sanhai/images/person.png',t_id);
        }else{
            $("span.info").show();
            setTimeout(function(){
                $("span.info").hide();
            }, 1000);
        }
    }
    /**
     * pushlet 从服务器端返回时回调函数
     * @param event
     */
    window.onEvent = function (event){
        if(event.getSubject() == '/user/chat'){
            // f_id 为咨询者的userId
            var stu_id = event.get('f_id');
            var stu_name = event.get('f_name');
            var stu_phone = event.get('f_phone');
            var stu_consultType = event.get('consultType');
            var stu_consultId = event.get('consultId');
            var msg = event.get('msg');
            var show_hide = '';
            // 如果 当前聊天列表有人 且列表中正在聊天的用户不为stu_id 则聊天窗口隐藏
            if($('#talking dl').length > 0 && $('#talking .talking').attr('stu_id') != stu_id){
                show_hide = 'hide';
            }
            var talking = $('#talking dl').length > 0 ?'':'talking';
            // 正在聊天列表 如果没有则增加
            showTalkingList(stu_id,stu_name,stu_phone,stu_consultType,stu_consultId,talking);
            // 聊天窗口 如果没有则增加
            showChatWindow(stu_id,show_hide);
            // 聊天窗口 添加消息记录
            appendMessage($('#chatBox_'+stu_id),'left',msg,'/file/userFace/' + stu_id + '.r',stu_id);
        } else if(event.getSubject() == '/user/login'){

        } else if (event.getEvent() == 'leave-ack'){
            //console.log("log out");
        }
    }

    /**
     * 显示正在联系人列表,如果在列表中;如果不在,新增该用户 根据talking 控制正在聊天标志
     * @param stu_id
     * @param stu_name
     * @param stu_phone
     * @param talking       :talking 正在聊天标志
     */
    function showTalkingList(stu_id,stu_name,stu_phone,stu_consultType,stu_consultId, talking){
        var stu_in_talking_list = $('#talking dl').filter(function(){return $(this).attr('stu_id') == stu_id;});

        //正在联系人列表没有该用户 添加，有此用户则更新用户咨询内容
        if(stu_in_talking_list.length == 0) {
            // 正在联系列表 添加该用户
            $('#talking').append('<dl id="talking_' + stu_id + '" stu_id="' + stu_id + '" stu_name="' + stu_name + '" stu_phone="' + stu_phone + '" stu_consultType="' + stu_consultType + '" stu_consultId="' + stu_consultId + '">' +
                '<dt><span><img src="/file/userFace/' + stu_id + '.r" /></span></dt>' +
                '<dd><b>' + stu_name + '</b></dd>' +
                '<span></span>'+
                '<b></b>'+
                '</dl>');
        }else{
            $('#talking_'+stu_id).attr('stu_consultType',stu_consultType);
            $('#talking_'+stu_id).attr('stu_consultId',stu_consultId);
        }
        // 如果talking  激活此聊天 ，否则更新未读记录数
        if(talking.toLowerCase() == 'talking'){
            $('#talking_'+stu_id).addClass('talking').siblings().removeClass('talking');
        }else{
            var unread_count = $.trim($('#talking_'+stu_id+' b').last().text());
            if(unread_count == ''){
                unread_count = '1';
            }else if(unread_count == '99'){
                unread_count = '99+';
            }else{
                unread_count = parseInt(unread_count)+1;
            }
            $('#talking_'+stu_id+' b').last().addClass('unread_info');
            $('#talking_'+stu_id+' b').last().text(unread_count);
        }

    }

    /**
     * 聊天框添加聊天信息
     * @param container  容器 jquery对象
     * @param position  位置 left right
     * @param msg       信息
     * @param img       头像图片url
     */
    function appendMessage(container,position,msg,img,stu_id){
        container.find('.dialog_message').append('<div class="dialog_message_'+position+' clearfix">'+
            '<img src="' + img + '" alt=""/>'+
            '<p><i></i><span>'+msg+'</span></p>'+
            '</div>');

        if(position == 'right'){
            $('.dialog_message_input').val('');
        }
        $('#chatBox_'+stu_id)._init_scroll();
    }

    /**
     * 创建聊天窗口  stu_id 不为空 如果不存在 chatBox_stuId的窗口则创建  否则显示
     * @param stu_id     学生id
     * @param show_hide   是否显示  默认显示，hide隐藏
     */
    function showChatWindow(stu_id,show_hide){
        if(stu_id){
            // 如果该聊天窗口不存在,创建  否则，显示
            if($('#chatBox_'+stu_id).length == 0){
                $('#c_container').append('<div class="pa '+show_hide+'" id="chatBox_' + stu_id + '">'+
                    '<div class="dialog_box wrap">'+
                    '<div class="dialog_message cont">'+
                    '</div>'+
                    '<div class="scroll_bar"></div>'+
                    '</div>'+
                    '</div>');
                $('#chatBox_'+stu_id)._init_scroll();
            }

            //如果 该聊天窗口隐藏；否则,改变聊天头信息和相应联系人信息
            if(show_hide.toLowerCase() == 'hide'){
                $('#chatBox_'+stu_id).addClass('hide');
            }else{
                var talking_user = $('.cs_list .talking');
                var stu_img = '/file/userFace/'+talking_user.attr('stu_id')+'.r';
                var stu_name = talking_user.attr('stu_name');
                var stu_phone = talking_user.attr('stu_phone');

                // 聊天框头部的头像和姓名
                $('.cs_headinfo img').attr('src',stu_img);
                $('.cs_headinfo b').text(stu_name);

                //右侧客户信息
                $('.cs_custominfro li:eq(0) span').text(stu_name);
                $('.cs_custominfro li:eq(1) span').text(stu_phone);
                // 右侧咨询信息
                AsyncConsultInfo();
                // 右下显示咨询者信息
                AsyncPotCustomerInfo(stu_phone);
                //显示聊天窗口
                $('#chatBox_'+stu_id).removeClass('hide').siblings().addClass('hide');
                //清空左侧聊天列表未读数
                $('#talking_'+stu_id+' b').last().text('');
                $('#talking_'+stu_id+' b').last().removeClass('unread_info');

            }
        }
    }
    return{
        AsyncAdviserGetInfo:AsyncAdviserGetInfo
    }
});