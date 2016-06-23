//我的学生 点击详情
define(['student-order-detail-1.0'],function(stu){
    $("#studentList").trigger('click');
    var url = location.href;
    var student = url.substring(url.lastIndexOf('/')+1, url.lastIndexOf('.'));
    stu.ajax4StudentOrderList(student, 1);

})