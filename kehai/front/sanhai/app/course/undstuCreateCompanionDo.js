/**
 * Created by Administrator on 2015/12/19.
 * 
 */
define(['jquery','base_dialog_standard','sanhai-companion-standard-1.0.0'],function($,dia,com){
    //目前不用
    //大学生陪读的课程是已经创建好的课程
    dia.initBaseDialog();
    com.loadSubject4Companion($("#subject"), null);

    $("#saveRelease").on("click", function () {
        com.submitSaveCompanion($(this));
    });

    $('#courseType').click(function(){
        com.changeCourseType($(this));
    });

})