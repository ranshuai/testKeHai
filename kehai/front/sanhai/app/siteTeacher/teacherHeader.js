/**
 * Created by slg on 2015/12/15.
 */
/***********************这个js现在文件不用*************************************/

require(["app/siteTeacher/teacherHeaderDo"],function(teacherHeaderDo){
    if(account){

        require(["teacherHeaderDo"],function(teacherHeaderDo){
            teacherHeaderDo.top();
        })
    }else{

        $('.tabRole').addClass('hide');

    };
    //搜索
    require(["teacherHeaderDo"],function(teacherHeaderDo){
        teacherHeaderDo.hotData();
    });
})