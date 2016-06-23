define(["jquery","pageBar","common","dialogs"],
    function($,pageBar,common,dialogs){

        //加载数据
        loadAdvisoryList(1);

        function loadAdvisoryList(page){
            //console.log(page);
            $.ajax({
                url: "/personnel/loadAdvisoryList.do",
                data:{page:page},
                type: "post",
                dataType: "json",
                success: function (data) {

                    if(common.checkResponse(data) == false){
                        return;
                    }

                    $("tbody").empty();
                    $("#boundTitle").text("共有"+data.data.countSize+"条结果");
                    $.each(data.data.list,function(){

                        var src ="/front/sanhai/images/person.png";
                        if(this.ppResId){
                            src = '/file/loadImage/'+this.ppResId+'.r';
                        }

                        var tr = "<tr>" +
                            "<td class='tl'><img src='"+src+"' width='60px' height='60px'/>" + (this.nickName?this.nickName:"游客")+ "</td>" +
                            "<td>" + this.phoneNumber + "</td>" +
                            "<td>" + this.areaName+' 学生咨询 '+common.df.showcourse(this.trainCourseType)+this.trainSubject+ " 相关课程 </td>" +
                            "<td>" + (new Date(parseFloat(this.createTime)).format("yyyy-MM-dd")) + "</td>" +
                            "<td id='"+this.id+"'>" + (this.isReply==0?'<input style="width:80px;height:24px!important;line-height:0!important;margin:0" class="btn c_bg_color1 font14" type="button" onclick="checkboxOnclick(\''+this.id+'\')" value="回复"/>':'已回复') + "</td>" +
                            "</tr>";
                        $("tbody").eq(0).append(tr);
                    });
                    pageBar.showPageBar(page,data.data.totalPages,loadAdvisoryList);
                },
                error: function () { }
            });

        };

        checkboxOnclick = function(id){

            dialogs._confirm("是否确认回复用户的问题？确认状态后不可改变。","回复",function(){
                $.ajax({
                    url:"/personnel/isReply.do",
                    type:"post",
                    data:{id:id},
                    dataType:"json",
                    success:function(data){
                        if(common.checkResponse(data) == false){
                            return;
                        }
                        $("#"+id+"").html("").html("已回复");
                    },
                    error:function(data){}
                });
            },"");


        }

    });