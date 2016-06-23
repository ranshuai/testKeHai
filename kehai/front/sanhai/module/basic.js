//防止IE7,8多次调用这个方法

define(
    [
        'jquery',
        'common',
        'dialogs',
        'jquery_Jcrop',
        'jquery_fileupload',
        'jquery_ui_min',
        "fileupload_process","fileupload_validate"
    ],
    function ($, common,dialogs) {

        var flag = false,
            imgW,imgH;

        $(function () {

            /*弹窗初始化*/
            $(function () {
                $('.popBox').dialog({
                    autoOpen: false,
                    width: 600,
                    modal: true,
                    resizable: false,
                    close: function () {
                        $(this).dialog("close")
                    }
                });

                /*大学选择母校的弹框初始化 --暂时放到这，因为初始化的时候会用750px*/
                $('.popBoxStu').dialog({
                    autoOpen: false,
                    width: 600,
                    modal: true,
                    resizable: false,
                    close: function () {
                        $(this).dialog("close")
                    }
                });

                //取消
                $('.cancelBtn').click(function () {
                    $('.popBox').dialog("close");
                })
                /*上传头像弹出*/
                $('.uploadJsBtn').click(function () {


                    //上传头像时的默认头像
                    $("#target").html("");
                    $(".div1").html("").append('<img src="/front/sanhai/images/person.png" width="140px" height="140px">');
                    $(".div2").html("").append('<img src="/front/sanhai/images/person.png" width="80px" height="80px">');
                    $(".div3").html("").append('<img src="/front/sanhai/images/person.png" width="60px" height="60px">');

                    $('#upload_portrait').dialog("open");


                    $('#upload_portrait').find('input').blur();
                    /*alert(1);*/
                    return false;
                });
            });

            //上传头像开始
            $('#fileuploadHead').fileupload({
                "acceptFileTypes": /(\.|\/)(bmp|jpg|png)$/i,
                "maxFileSize": 1024*1024*2,
                "done": function (e, data, response) {
                    var resId = data.result.data.ids;
                    //ID赋值到隐藏域
                    $("#imageId").val(resId);
                    flag = false;
                    // 显示图片
                    var loadImg = "<img src='/file/loadImage/" + resId + ".r' onload='cutImage()' />";
                    $("#target").html("").append(loadImg);

                    loadImg = "<img src='/file/loadImage/" + resId + ".r'  >";
                    $(".div1").html("").append(loadImg);
                    $(".div2").html("").append(loadImg);
                    $(".div3").html("").append(loadImg);
                },
                "processfail": function (e, data) {
                    var index = data.index, file = data.files[index];
                    if(file.size > 1024*1024*2){
                        dialogs._timer("上传的文件太大了",2,2, null);
                    } else if (file.error) {
                        dialogs._timer("文件类型错误",2,2, null);
                    }
                },
                "url": '/file/upload.se',
                "autoUpload": true,
                "formData": {},
                "dataType": 'json'
            });

            //图片旋转
            $("#idLeft").click(function(e){
                imgRotate(-90);
                return false;
            });
            $("#idRight").click(function(e){
                imgRotate(90);
                return false;
            });
            function imgRotate(deg){

                if(!$('.jcrop-holder').children('div').is('#target')){
                    var tw= $('#small').find('img').css('width');
                    var th= $('#small').find('img').css('height');

                    $('.jc-demo-box').find('div.jcrop-holder')
                        .append($('<div id="target" class="img_warpper jcrop_w"><img style="width:'+tw+';height:'+th+';" src="'+$("#target").children('img').attr('src') +'" alt=""/></div>'));

                    $('.jc-demo-box').children('div').attr('id','').children('img').hide();
                    $('#target').siblings('img').remove();
                    $('#small').find('img').remove()

                }

                var img1 = $(".jcrop_w>img"),
                    _data = parseInt($(".jc-demo-box").attr("data"));
                if($.browser.version == 8.0 || $.browser.version == 7.0 || $.browser.version == 6.0 ){
                    var sin = Math.sin(Math.PI / 180 * (_data + deg)), cos = Math.cos(Math.PI / 180 * (_data + deg));
                    var _filter = "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + "," +  "M12=" + (-sin)
                        + ",M21=" + sin+ ",M22=" + cos + ",SizingMethod='auto expand')";
                    img1.css({
                        filter: _filter
                    });
                    $('.div1 img,.div2 img,.div3 img').css({
                        filter: _filter
                    });

                }else{
                    var _deg = deg + _data;
                    var _val =  "rotate("+ _deg + "deg)";
                    img1.css({
                        "-webkit-transform": _val,
                        "-moz-transform": _val,
                        "-ms-transform": _val,
                        "-o-transform": _val,
                        "transform": _val
                    });
                    $('.div1 img,.div2 img,.div3 img').css({
                        "-webkit-transform": _val,
                        "-moz-transform": _val,
                        "-ms-transform": _val,
                        "-o-transform": _val,
                        "transform": _val
                    });
                }

                var     fiw = $('.jcrop_w>img').width(),
                    fih = $('.jcrop_w>img').height(),
                    ow = Math.floor((458 - fiw) / 2),
                    oh = Math.floor((380 - fih) / 2),
                    cx = $("#small").position().left,
                    cy = $("#small").position().top,
                    rx = 140 / $("#small").width(),
                    ry = 140 / $("#small").height(),
                    rx1 = 80 / $("#small").width(),
                    ry1 = 80 / $("#small").height(),
                    rx2 = 60 / $("#small").width(),
                    ry2 = 60 / $("#small").height();



                if($.browser.version == 8.0 || $.browser.version == 7.0 || $.browser.version == 6.0){
                    pre_img2($('.div1 img'), rx, fih, ry, fiw, cx, cy, ow, oh);
                    pre_img2($('.div2 img'), rx1, fih, ry1, fiw, cx, cy, ow, oh);
                    pre_img2($('.div3 img'), rx2,  fih, ry2, fiw, cx, cy, ow, oh);
                }else{
                    pre_img2($('.div1 img'), rx, fiw, ry, fih, cx, cy, ow, oh);
                    pre_img2($('.div2 img'), rx1, fiw, ry1, fih, cx, cy, ow, oh);
                    pre_img2($('.div3 img'), rx2, fiw, ry2, fih, cx, cy, ow, oh);
                }

                $(".jcrop_w img").css({
                    left: ow,
                    top: oh
                });

                if( deg > 0){
                    if(_data == 270){
                        _data = 0;
                    }else{
                        _data = _data + 90;
                    }
                }else{
                    if(_data == 0){
                        _data = 270;
                    }else{
                        _data = _data - 90;
                    }
                }
                $("#d").val(_data);
                $(".jc-demo-box").attr("data", _data);
            }



            $("#saveImg").click(function () {

                if ($('.jcrop_w>img').width()) {
                    $("#imgWidth").val($('.jcrop_w>img').width());
                }
                if ($('.jcrop_w>img').height()) {
                    $("#imgHeight").val($('.jcrop_w>img').height());
                }

                $.ajax({
                    type: "post",
                    url: "/file/jcropImg.se",
                    data: $("#crop_form").serialize(),
                    success: function (data) {
                        if (common.checkResponse(data) == false) {
                            return;
                        }
                        // 显示图片
                        var loadImg = '<img style="transform:'+$('.div1 img').css('transform')+'" src="/file/loadImage/' + data.resMsg + '.r?' + new Date().getTime() + '" >';
                        $(".user_logo_warp").html("").append(loadImg);
                        $("input[name='ppResId']").val(data.resMsg);
                        $('.popBox').dialog("close");
                    },
                    error: function (data) {
                    }
                });
            });

        });

//默认图像位置
        cutImage = function (obj) {
            if (flag) {
                return;
            }
            obj = $(".jcrop_w>img");
            var w = 458,
                h = 380,
                iw = obj.width(),
                ih = obj.height();
            if (iw > w || ih > h) {
                if (iw / ih > w / h) {
                    obj.css({
                        width: w,
                        height: w * ih / iw,
                        top: (h - (w * ih / iw)) / 2,
                        left: 0
                    });
                } else {
                    obj.css({
                        height: h,
                        width: h * iw / ih,
                        top: 0,
                        left: (w - (h * iw / ih)) / 2
                    });
                }
            } else {
                obj.css({
                    left: (w - iw) / 2,
                    top: (h - ih ) / 2
                });
            }

            imgW = obj.width(), imgH = obj.height();
            obj.parent('#target').css({
                'position': 'absolute',
                'top': '50%',
                'left': '50%',
                'marginTop': -imgH / 2 + "px",
                'marginLeft': -imgW / 2 + "px"
            });
            jcropImg()
            flag = true;
        }

        jcropImg = function () {

            var _Jw = (imgW - 140) / 2,
                _Jh = (imgH - 140) / 2,
                _Jw2 = _Jw + 140,
                _Jh2 = _Jh + 140;

            $('#target>img').Jcrop({
                setSelect: [_Jw, _Jh, _Jw2, _Jh2],
                onChange: showPreview,
                onSelect: showPreview,
                aspectRatio:1,
                bgFade: true,
                bgColor: "#f4f4f4",
                bgOpacity: .5
            });
        }

        showPreview = function (c) {
            var iw = $('.jcrop_w>img').width(),
                ih = $('.jcrop_w>img').height(),
                ow = (458 - iw) / 2,
                oh = (380 - ih) / 2,
                rx = 140 / c.w,
                ry = 140 / c.h,
                rx1 = 80 / c.w,
                ry1 = 80 / c.h,
                rx2 = 60 / c.w,
                ry2 = 60 / c.h,
                _data = $(".popCont_l").attr("data");

            if (navigator.userAgent.match(/MSIE 8.0|MSIE 7.0|MSIE 6.0/) && (_data == 90 || _data == 270)) {
                pre_img2($('.div1 img'), rx, ih, ry, iw, c.x, c.y, ow, oh);
                pre_img2($('.div2 img'), rx1, ih, ry1, iw, c.x, c.y, ow, oh);
                pre_img2($('.div3 img'), rx2, ih, ry2, iw, c.x, c.y, ow, oh);
            } else {
                pre_img2($('.div1 img'), rx, iw, ry, ih, c.x, c.y, ow, oh);
                pre_img2($('.div2 img'), rx1, iw, ry1, ih, c.x, c.y, ow, oh);
                pre_img2($('.div3 img'), rx2, iw, ry2, ih, c.x, c.y, ow, oh);
            }
            $('#x').val(c.x);
            $('#y').val(c.y);
            $('#w').val(c.w);
            $('#h').val(c.h);
        }

        pre_img2 = function (obj, rx, iw, ry, ih, cx, cy, ow, oh) {
            obj.css({
                width: Math.round(rx * iw) + 'px',
                height: Math.round(ry * ih) + 'px',
                marginLeft: '-' + Math.round(rx * cx) + 'px',
                marginTop: '-' + Math.round(ry * cy) + 'px'
            });
        };
    });