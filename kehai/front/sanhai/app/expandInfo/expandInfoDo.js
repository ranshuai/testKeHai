define('expandInfoDo',['jquery','dialogs','base'],function($,dialogs){


    var allChanges=function(){
        /*全选*/
        function allChange(id){

            var check = $('#'+id).parent().parent();
            $('#'+id).click(function(){
                if($('#'+id).attr('checked')){
                    check.find('input').attr('checked',true);
                }else{
                    check.find('input').attr('checked',false);
                }
            });
            check.find("input[id!="+id+"]").click(function(){
                var num =0;
                check.find("input[id!="+id+"]").each(function(i){
                    if(check.find("input[id!="+id+"]")[i].checked) num++;
                });
                if(num == check.find("input[id!="+id+"]").size()){
                    $('#'+id).attr('checked',true);
                }else{
                    $('#'+id).attr('checked',false);
                }
            });
        }

        allChange('areaCheckBoxAll1');
        allChange('areaCheckBoxAll2');
        allChange('areaCheckBoxAll3');
        allChange('areaCheckBoxAll4');
        allChange('areaCheckBoxAll5');

        /*表单全选*/
        function allChangeTable(id){

            var check = $('#'+id).parents('table');
            $('#'+id).click(function(){
                if($('#'+id).attr('checked')){
                    check.find('input').attr('checked',true);
                }else{
                    check.find('input').attr('checked',false);
                }
            });
            check.on('click','input[id!="+id+"]',function(){
                var num =0;
                check.find("input[id!="+id+"]").each(function(i){
                    if(check.find("input[id!="+id+"]")[i].checked) num++;
                });
                if(num == check.find("input[id!="+id+"]").size()){
                    $('#'+id).attr('checked',true);
                }else{
                    $('#'+id).attr('checked',false);
                }
            });
        }

        allChangeTable('tabCheckBoxAll');

    };

    var a=function(){

        /*待推广按钮-删除和推送*/
        $('.tabItem2').on('click','.sbtnBar button',function(){

            var inputChecked=$(".tabItem2 .sh_table input[type=checkbox]:checked");
            var len=inputChecked.length;
            var cla=$(this).text();
            if(len==0){
                dialogs._timer('请选择推送名单！',2,2,'');
            }else{
                if(cla=='删除'){
                    dialogs._confirm('您确定删除本课程吗？','提示',function(){
                        inputChecked.parents('tr').remove()
                    },'')
                }
                else if(cla=='推送'){
                    dialogs._timer('推送成功！',1,2,function(){
                        inputChecked.parents('tr').remove();
                    })
                }


            }
        });

        /*tab切换*/
        $('.tab .tabList li').click(function () {

            var index = $(this).index();
            $(this).children('a').addClass('ac').parent('li').siblings('li').children('a').removeClass('ac');
            $('.tabCont .tabItem:eq(' + index + ')').show().siblings().hide();
        });

/*
        var expandInfo=angular.module('expandInfo',[]);
        expandInfo.controller('expandInfo',['$scope',function($scope){
            $scope.list=[1,2,3]
            
        }]);

        expandInfo.direction('',function(){
            return{
                restrict: 'EA',
                replace: true,
                transclude: true,
                template:'<table class="sh_table">'+
                '<colgroup>'+
                    '<col width="110px">'+
                    '<col width="231px">'+
                    '<col width="100px">'+
                    '<col width="152px">'+
                    '<col width="72px">'+
                    '<col width="125px">'+
                    '<col width="100px">'+
                '</colgroup>'+
                '<tbody>'+
                '<tr>'+
                    '<th>课程编号</th>'+
                    '<th>课程名</th>'+
                    '<th>推广类型</th>'+
                    '<th>学校</th>'+
                    '<th>旁听价格</th>'+
                    '<th>更新时间</th>'+
                    '<th>操作</th>'+
                    '</tr>'+
                '<tr ng-repeat="i in list">'+
                    '<td>PT00000001</td>'+
                    '<td><p class="tl">第二节：一元二次方程全民直击高考数学总复习集</p></td>'+
                    '<td>按知识点</td>'+
                    '<td><p class="tl">北京新东方教育教育机构教育机构</p></td>'+
                    '<td class="orange_l">￥20</td>'+
                    '<td><span>2015-12-12</span><span>18:00</span></td>'+
                    '<td class="blue"><a class="blue">预览</a>|<a class="blue">推广</a></td>'+
                '</tr>'
            }

        })

*/

    }

    return{
        allChanges:allChanges,
        a:a
    }

});