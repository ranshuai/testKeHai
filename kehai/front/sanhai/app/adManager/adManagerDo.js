define(["jquery","common","pageBar","dialogs",'jquery_ui_widget',
        'jquery_iframe_transport',
        'jquery_fileupload',
        'jquery_xdr_transport',
        "fileupload_process",
        "fileupload_validate"],
    function($,common,pageBar,dialogs){

        /*tab切换*/
        $('.tab .tabList li').click(function() {
            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
            if(index == 1){
                getSchAdList(1);
            }
        });

        //学校上传广告
        $('#uploadSchoolAd').fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024*1024*2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;
                var loadImg = "<img src='/file/loadImage/" + resId + ".r' />";
                $(".unload_ad_img").html("").append(loadImg);
                $(".put_out").attr("imgId",resId);
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

        //发布广告

        $(".put_out").click(function(){
            var imgId = $(this).attr("imgId");
            var adType = $("#adType").val();
            var adName =$("input[name='adName']").val();
            if(imgId){
                $.ajax({
                    url:"/orgInfo/issueAd.do",
                    type:"post",
                    data:{imgId:imgId,adType:adType,imgName:adName},
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        dialogs._timer('保存成功',1,2,function(){
                            location.reload();
                        });
                    },
                    error:function(data){}
                });

            }else{
                dialogs._timer("请上传广告图片",2,2,"");
            }
        });

        function getSchAdList(currPage) {
            $.ajax({
                url:"/orgInfo/getSchAdList.do",
                dataType:"json",
                type:"post",
                data: {currentPage:currPage},
                success: function(resp) {
                    if (common.checkResponse(resp) == false) return;
                    if (resp.resCode == "000"){
                        $(".all_record").html("").append("共"+resp.data.countSize+"条");

                        $("table tbody").empty();
                        $.each(resp.data.list ,function(index){

                            var status ;
                            switch (this.adType){
                                case "1" : status="小学";break;
                                case "2" : status="小升初";break;
                                case "3" : status="初中";break;
                                case "4" : status="中考";break;
                                case "5" : status="高中";break;
                                case "6" : status="高考";break;
                                default : status="";break;
                            }

                            var tr ="<tr valign='top'><td>" + status + "</td>" +
                                "<td>" + this.imgName + "</td>" +
                                "<td>"+ (new Date(parseFloat(this.craeteTime)).format("yyyy-MM-dd")) +"</td>" +
                                (this.usable == 0 ? "<td>已停用</td>":"<td class='blue'>使用中</td>")+
                                "</tr>";
                            $("table tbody").append(tr);
                        });
                        var params = new Array();
                        pageBar.setBasePageBar(resp.data.totalPages, resp.data.currPage, getSchAdList, params);
                    }
                },
                error: function(resp) {}
            });
        }
    });