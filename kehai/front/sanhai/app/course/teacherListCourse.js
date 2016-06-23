/**
 * Created by Administrator on 2015/12/14.
 */
requirejs.config({
    baseUrl: JS_BASEURL,
    paths:{
        "jquery": "lib/jquery-1.8.3.min",
        "course_center":'app/course/sanhai-course-list-standard-1.0.0',
        "pageBar":'module/sanhai-base-pagebar-standard-1.0.0',
        "loadVersionAndMatch":'app/course/sanhai-course-standard-1.0.0',
        "jquery_ui_min":"lib/jquery-ui.min",
        "dialogs":"module/dialogs"
    }
});

require(['app/course/teacherListCourseDo']);