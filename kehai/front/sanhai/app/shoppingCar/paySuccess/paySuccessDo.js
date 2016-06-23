define('paySuccessDo', ['money', 'base', "module/cookie"], function (money) {

    var a = function () {

        /*只有学生身份显示购物车*/
        if (user.userIdentity == 2) {
            $('.shopping_car').removeClass('hide');
        }

        if (null != getCookie("ptCourse") && "" != getCookie("ptCourse")) {
            $("#ptCourseMsg").empty();

            var ptCourse = getCookie("ptCourse").split(",");
            $.grep(ptCourse, function (value) {
                var message = "<p>恭喜您已获得<em>《" + value + "》</em>课程，与教师互动的机会。</p><br>";
                // var message = "<p>您已成为<em>《" + value + "》</em>课程的<em>主听学生</em>（与老师一对一互动）。<br>请您注意<em>按时上课</em>，千万别错过哦！</p>";
                $("#ptCourseMsg").append(message);
            });
        }

    };

    return {
        a: a
    }

});