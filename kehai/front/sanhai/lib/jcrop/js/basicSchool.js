//防止IE7,8多次调用这个方法
var flag = false;

$(function(){

    /*弹窗初始化*/
    $('.popBox').dialog({
        autoOpen:false,
        width: 816,
        modal: true,
        resizable: false,
        close: function() {
            $(this).dialog("close")
        }
    });

    //取消
    $('.cancelBtn').click(function() {
        $('.popBox').dialog("close");
    })
    /*上传头像弹出*/
    $('.uploadJsBtn').click(function() {

        //上传头像时的默认头像
        $("#target").html("");
        $(".div1").html("").append('<img src="/front/sanhai/images/person.png" width="240px" height="160px">');
        $(".div2").html("").append('<img src="/front/sanhai/images/person.png" width="120px" height="80px">');
        $(".div3").html("").append('<img src="/front/sanhai/images/person.png" width="90px" height="60px">');

        $('#upload_portrait').dialog("open");
        $('#upload_portrait').find('input').blur();
        return false;
    });

    //上传头像开始
    $('#fileupload').fileupload({
        "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
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
            var size = file.length;
            alert(size);
            if (file.error) {
                alert(file.error);
            }
        },
        "url":'/file/upload.se',
        "autoUpload": true,
        "formData": {},
        "dataType": 'json'
    });

    $("#saveImg").click(function(){

        if( $('.jcrop_w>img').width() ){
            $("#imgWidth").val($('.jcrop_w>img').width());
        }
        if( $('.jcrop_w>img').height() ){
            $("#imgHeight").val($('.jcrop_w>img').height());
        }

        $.ajax({
            type:"post",
            url:"/file/jcropImg.se",
            data:$("#crop_form").serialize(),
            success:function(data){
                if(common.checkResponse(data) == false){
                    return;
                }
                // 显示图片
                var loadImg = '<img src="/file/loadImage/' + data.resMsg + '.r?' + new Date().getTime() +'" >';
                $(".user_logo_warp").html("").append(loadImg);

                $("input[name='ppResId']").val(data.resMsg);
                $('.popBox').dialog("close");
            },
            error:function(data){
            }
        });
    });

});


//默认图像位置
function cutImage(obj) {
    if(flag){
        return;
    }
    obj =$(".jcrop_w>img");
    var w = 458,
        h = 380,
        iw = obj.width(),
        ih = obj.height();
    if(iw > w || ih > h){
        if(iw / ih > w / h){
            obj.css({
                width: w,
                height: w * ih / iw,
                top: (h - (w * ih / iw)) / 2,
                left: 0
            });
        }else{
            obj.css({
                height: h,
                width: h * iw / ih,
                top: 0,
                left: (w - (h * iw / ih)) / 2
            });
        }
    }else{
        obj.css({
            left: (w - iw) / 2,
            top: (h - ih ) / 2
        });
    }

    imgW = obj.width(),
        imgH = obj.height();
    obj.parent('#target').css({'position':'absolute','top':'50%','left':'50%','marginTop':-imgH/2+"px",'marginLeft':-imgW/2+"px"});
    jcropImg()
    flag = true;
}

function jcropImg(){

    var _Jw = ($("#target").width() - 120) / 2 ,
        _Jh = ($("#target").height() - 120) / 2 ,
        _Jw2 = _Jw + 120,
        _Jh2 = _Jh + 60;

    $('#target>img').Jcrop({
        setSelect: [_Jw, _Jh, _Jw2, _Jh2],
        onChange: showPreview,
        onSelect: showPreview,
        // aspectRatio:1/1,
        bgFade: true,
        bgColor: "white",
        bgOpacity: .5
    });
}

function showPreview(c){
    var iw = $('.jcrop_w>img').width(),
        ih = $('.jcrop_w>img').height(),
        ow = (458 - iw) / 2,
        oh = (380 - ih) / 2,
        rx = 240 / c.w,
        ry = 160 / c.h,
        rx1 = 120 / c.w,
        ry1 = 80 / c.h,
        rx2 = 90 / c.w,
        ry2 = 60 / c.h,

        _data = $(".popCont_l").attr("data");

    if( navigator.userAgent.match(/MSIE 8.0|MSIE 7.0|MSIE 6.0/) && (_data == 90 || _data == 270)){
        pre_img2($('.div1 img'), rx, ih, ry, iw, c.x, c.y, ow, oh);
        pre_img2($('.div2 img'), rx1, ih, ry1, iw, c.x, c.y, ow, oh);
        pre_img2($('.div3 img'), rx2, ih, ry2, iw, c.x, c.y, ow, oh);
    }else{
        pre_img2($('.div1 img'), rx, iw, ry, ih, c.x, c.y, ow, oh);
        pre_img2($('.div2 img'), rx1, iw, ry1, ih, c.x, c.y, ow, oh);
        pre_img2($('.div3 img'), rx2, iw, ry2, ih, c.x, c.y, ow, oh);
    }
    $('#x').val(c.x);
    $('#y').val(c.y);
    $('#w').val(c.w);
    $('#h').val(c.h);
}

function pre_img2(obj, rx, iw, ry, ih, cx, cy, ow, oh){
    obj.css({
        width: Math.round(rx * iw) + 'px',
        height: Math.round(ry * ih) + 'px',
        marginLeft: '-' + Math.round(rx * cx) + 'px',
        marginTop: '-' + Math.round(ry * cy) + 'px'
    });
};