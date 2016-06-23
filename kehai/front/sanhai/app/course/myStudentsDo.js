
/**
 * Created by Administrator on 2015/12/15.
 */

define(
    [
        'jquery',
        'common',
        'student-list-1.0'
    ],function($,common,student){
        student.studentList4Page(1);
        $("button[name='search']").click(function(){
            var criteria = $("#criteria").val();
            //console.log("criteria-->" + criteria);
            if (criteria == "") return;
            var data = "";
            if (common.isNumber(criteria)) data="phone="+criteria;
            else data = "name="+criteria;
            student.studentList4Page(1, data);
        });


    });