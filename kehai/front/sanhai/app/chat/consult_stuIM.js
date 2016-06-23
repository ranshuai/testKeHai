/**
 * Created by yinjiaming on 2016/03/22
 */
define(["jquery","common","dialogs","iscroller","easemob","easemob_im","jquery_ui_min"],function ($,common,dialogs){
    var conn = null;
    var fileInputId = "fileInput";
    var flashFilename = '';
    $(function(){

        // 与环信服务器创建一个新的连接
        conn = new Easemob.im.Connection();

        // 初始化环信服务器连接
        conn.init({
            https : Easemob.im.config.https,
            url: Easemob.im.config.xmppURL,
            // 当连接成功时的回调方法
            onOpened : function() {
                handleOpen(conn);
            },
            // 当连接关闭时的回调方法
            onClosed : function() {
            },
            // 收到文本消息时的回调方法
            onTextMessage : function(message) {
                handleTextMessage(message);
            },
            // 收到图片消息时的回调方法
            onPictureMessage : function(message) {
                handlePictureMessage(message);
            },
            // 异常时的回调方法
            onError : function(message) {
                handleError(message);
            }
        });

        // 登录环信IM即时通信服务器
        loginIM();

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

        // tab切换
        $('.cs_mrnav li').each(function(index){
            var i=index;
            $(this).click(function(){
                $(this).addClass('cs_high').siblings().removeClass('cs_high');
                $('.cs_mrmain>div').eq(i).removeClass('hide').siblings().addClass('hide');
            })
        });

        // 选择咨询师列表事件
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

        // 备注-填写按钮
        $('.remarks_btn').click(function(){
            $('.remarks_main').addClass('remarks_aditor').children('textarea').removeClass('hide');
            $(this).css('display','none');
        });

        // 保存客户信息
        $('.saveinfro_btn').click(function(){
            $('.remarks_main').removeClass('remarks_aditor').children('textarea').addClass('hide').val('');
            $('.remarks_btn').css('display','block');
        });

        // 正在联系
        $('.cs_talking').on('click','dl',function(){
            $(this).addClass('talking').siblings().removeClass('talking');
        });

        // 发送消息
        $('.dialog_message_sendbtn').click(function(){
            sendText();
        });
        $('.send_main textarea').keydown(function(event){
            if(event.keyCode == 13){
                event.preventDefault();
                sendText();
            }
        });

        // 发送图片消息
        $('#sendPicSpan').click(function(){
            $('#send-file-warning').html("");
            $('.popBox').dialog({
                autoOpen:true,
                width: 500,
                modal: true,
                resizable: false,
                buttons: [{
                        text: "发送", click: function () {
                            sendPic();
                        }
                    },{
                        text: "取消", click: function () {
                        $('.popBox').dialog("close");
                     }
                    }
                ]
            })
        });
    });

    // 登录环信IM即时通信服务器
    function loginIM() {
        var user = userId;
        var pass = '123456';
        if (user == '') {
            alert("未获取到即时通讯登录信息");
            return;
        }

        // 根据用户名密码登录环信IM即时通信服务器
        conn.open({
            apiUrl : Easemob.im.config.apiURL,
            user : user,
            pwd : pass,
            appKey : Easemob.im.config.appkey // 登录环信时需要的appkey
        });
        return false;
    };

    // 处理连接时函数
    function handleOpen(conn) {
        conn.setPresence(); // 设置用户上线状态，必须调用
        // 启动心跳
        if (conn.isOpened()) {
            conn.heartBeat(conn);
        }
    };

    // 环信SDK收到文本消息的回调方法
    var handleTextMessage = function(message) {
        var f_id = message.from;
        var f_name = '';
        var msg = message.data;
        var img = '../front/sanhai/images/consultmen1.png';

        var show_hide = $('#recentContacts dl').length > 0 ?'hide':'';
        var talking = $('#recentContacts dl').length > 0 ?'':'talking';

        // 最近联系人列表更新
        showRecentList(f_id,f_name,talking);
        // 聊天窗口更新
        showChatWindow(f_id,show_hide);
        // 聊天框中添加记录
        appendMessage($('#chatBox_'+f_id),'left',msg,img,f_id);
    };

    // 环信SDK收到图片消息的回调方法
    var handlePictureMessage = function(message) {
        var filename = message.filename;//文件名称，带文件扩展名
        var from = message.from;//文件的发送者
        var mestype = message.type;//消息发送的类型是群组消息还是个人消息
        var contactDivId = from;
        var options = message;
        // 图片消息下载成功后的处理逻辑
        options.onFileDownloadComplete = function(response, xhr) {
            var objectURL = Easemob.im.Helper.parseDownloadResponse.call(this, response);
            img = document.createElement("img");
            img.onload = function(e) {
                img.onload = null;
                window.URL && window.URL.revokeObjectURL && window.URL.revokeObjectURL(img.src);
            };
            img.onerror = function() {
                img.onerror = null;
                if (typeof FileReader == 'undefined') {
                    img.alter = "当前浏览器不支持blob方式";
                    return;
                }
                img.onerror = function() {
                    img.alter = "当前浏览器不支持blob方式";
                };
                var reader = new FileReader();
                reader.onload = function(event) {
                    img.src = this.result;
                };
                reader.readAsDataURL(response);
            }
            img.src = objectURL;
            img.setAttribute('class','chat_pic');
            img.setAttribute('title','单击查看原图');
            var imgPic = '../front/sanhai/images/consultmen1.png';
            var chatImg = "<a target='_blank' href='"+ objectURL +"'>"+ img.outerHTML +"</a>";
            appendMessage($('#chatBox_'+from),'left',chatImg,imgPic,from);
        };

        var redownLoadFileNum = 0;
        options.onFileDownloadError = function(e) {
            //下载失败时只重新下载一次
            if(redownLoadFileNum < 1){
                redownLoadFileNum++;
                options.accessToken = options_c;
                Easemob.im.Helper.download(options);
            }else{
                redownLoadFileNum = 0;
            }

        };
        //环信SDK包装的下载文件对象的统一处理方法。
        Easemob.im.Helper.download(options);
    };

    // 允许发送图片消息类型
    var pictype = {
        "jpg" : true,
        "gif" : true,
        "png" : true,
        "bmp" : true
    };

    // 发送图片消息时调用方法
    var sendPic = function() {
        var in_talking = $('#recentContacts .talking');
        var to = in_talking.attr('adv_id');
        if (to == null) {
            return;
        }
        // Easemob.im.Helper.getFileUrl为easemobwebim-sdk获取发送文件对象的方法，fileInputId为 input 标签的id值
        var fileObj = Easemob.im.Helper.getFileUrl(fileInputId);
        if (Easemob.im.Helper.isCanUploadFileAsync && (fileObj.url == null || fileObj.url == '')) {
            $('#send-file-warning').html("<font color='#FF0000'>请选择发送图片</font>");
            return;
        }
        var filetype = fileObj.filetype;
        var filename = fileObj.filename;
        if (!Easemob.im.Helper.isCanUploadFileAsync || filetype in pictype) {
            var opt = {
                type : 'chat',
                fileInputId : fileInputId,
                filename : flashFilename || '',
                to : to,
                apiUrl: Easemob.im.config.apiURL,
                onFileUploadError : function(error) {
                    var messageContent = (error.msg || '') + ",发送图片文件失败:" + (filename||flashFilename);
                    console.log(messageContent);
                },
                onFileUploadComplete : function(data) {
                    $('.popBox').dialog("close");
                    var file = document.getElementById(fileInputId);
                    if (file && file.files) {
                        var objUrl = getObjectURL(file.files[0]);
                        if (objUrl) {
                            var img = document.createElement("img");
                            img.src = objUrl;
                            img.setAttribute('class','chat_pic');
                            img.setAttribute('title','单击查看原图');
                        }
                    } else {
                        filename = data.filename || '';
                        var img = document.createElement("img");
                        img.src = data.uri + '/' + data.entities[0].uuid + '?token=';
                    }
                    var f_img = "/file/userFace/"+to+".r";
                    var chatImg = "<a target='_blank' href='"+ objUrl +"'>"+ img.outerHTML +"</a>";
                    appendMessage($('#chatBox_'+to),'right',chatImg,f_img,to);
                }
            };
            conn.sendPicture(opt);
            return;
        }
        $('#send-file-warning').html("<font color='#FF0000'>不支持此图片类型" + filetype + "</font>");
    };

    function getObjectURL(file) {
        var url = null;
        if (window.createObjectURL != undefined) { // basic
            url = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file);
        }
        return url;
    };

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
                            adviserList += '<dl adv_id="' + n.userId + '" adv_name="' + adviserName + '" class="online">'+
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
                                teaImgUrl = '/front/sanhai/images/def_user_face.png';
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
                }
            }
        });
    }

    // 发送文本消息时调用方法
    function sendText(){
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
        var f_img = "/file/userFace/"+f_id+".r";
        //if(consultType == 'course'){
        //    consultType = '0';
        //}else if(consultType == 'teacher'){
        //    consultType = '2';
        //}else if(consultType == 'org'){
        //    consultType = '1';
        //}else{
        //    consultType = '0';
        //}

        var options = {
            to : adv_id,
            msg : msg,
            type : "chat",
            ext :{
                "consultType":consultType,
                "consultId":consultId
            }
        };

        // 聊天框中 添加记录
        appendMessage($('#chatBox_'+adv_id),'right',msg,f_img,adv_id);
        // 发送文本消息接口
        // conn.sendTextMessage(options);

        var json = {
            "consultType": consultType,
            "consultId": consultId,
            "msg": msg
        };

        // 调用推送服务向用户发送文本消息
        $.ajax({
            url: "/m/index/web/chat/sendMessage.do",
            type: "post",
            data: {
                toUserId: adv_id,
                userId: f_id,
                msgCode: '110101',
                msg: JSON.stringify(json)
            },
            success:function(result){
                if(common.checkResponse(result)){
                    // var data = result.data;
                    // alert('消息发送成功');
                }
            },
            error:function(){
                alert('消息发送失败');
            }
        });
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

    // 异常情况下的处理方法
    var handleError = function(e) {
        e && e.upload && $('#fileModal').modal('hide');
        var msg = e.msg;
        if (e.type == EASEMOB_IM_CONNCTION_SERVER_CLOSE_ERROR) {
            if (msg == "" || msg == 'unknown' ) {
                alert("服务器断开连接,可能是因为在别处登录");
            } else {
                alert("服务器断开连接");
            }
        } else if (e.type === EASEMOB_IM_CONNCTION_SERVER_ERROR) {
            if (msg.toLowerCase().indexOf("user removed") != -1) {
                alert("用户已经在管理后台删除");
            }
        } else {
            alert(msg);
        }
        conn.stopHeartBeat(conn);
    };

    return {
        AsyncGetAdviserList:AsyncGetAdviserList
    }
});