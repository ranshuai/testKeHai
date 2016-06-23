({
    appDir: '../../',
    baseUrl:'./',
    dir:'../../../dist',
    paths:{
        /* ------------------------------------------------[第三方JS]------------------------------------------------ */
        "jquery": "lib/jquery-1.8.3.min",                                            // jquery-1.8.3
        "validata-cid": "lib/jquery_validate/validata-cid",                          // 校验身份证
        "jquery_validate": "lib/jquery_validate/jquery.validate.min",               // 校验框架
        "additional-methods":"lib/jquery_validate/additional-methods",
        "addkehai_validate": "lib/jquery_validate/addkehai_validate",                // 课海校验
        "messages_zh": "lib/jquery_validate/messages_zh",                            // 校验框架中文包
        "jquery_ui_widget": 'lib/jqueryupload/jquery.ui.widget',                  // 上传文件
        "jquery_fileupload": 'lib/jqueryupload/jquery.fileupload',                // 上传文件
        "jquery_Jcrop": 'lib/jquery.Jcrop',
        "jquery.datetimepicker": "lib/jquery.datetimepicker",                        // 日历控件
        "qrcode": "lib/qrcode/jquery.qrcode.min",
        "jquery_md5": 'lib/jquery.md5',                                          // MD5加密
        "jquery_ui_min": "lib/jquery-ui.min",                                   // jquery UI
        "njs": "module/extendJquery",

        "angular":"lib/angular.min-1.2.2",
        "bootstrap":"lib/bootstrap",
        "domReady":"lib/plugin/domReady",



        /* ------------------------------------------------[第三方JS]------------------------------------------------ */

        /* ----------------------------------------------[三海定定义模块]----------------------------------------------*/
        "birthday": "module/birthday",
        "sanhai-site-STC-standard-1.0.0": "module/sanhai-site-STC-standard-1.0.0",      // 这个文件定义不符合规范
        "sendCode": "module/sanhai-send-code-standard-1.0.0",                          // 发送验证码
        "basic": 'module/basic',
        "base": "module/base",
        "common": "module/common",                                                      // 通用功能
        "sanhai-base64": "module/sanhai-base64",                                        // BASE64
        "loadAreaAndMatch": 'module/sanhai-area-standard-1.0.0',                        // 区域信息
        "money": "module/money",                                                        // 金额转换
        "pageBar": 'module/sanhai-base-pagebar-standard-1.0.0',                         // 分页条
        /* "sanhai-base-pagebar-standard-1.0.0": "app/course/sanhai-base-pagebar-standard-1.0.0", //分页条*/

        "basicSchool": "module/basicSchool",

        "myCalendar": "module/calendar",                                                // 日历
        "orderDeatil": "app/order/orderDeatil",                                      // 订单信息
        "order-deal": "app/order/order-deal",                                        // 订单信息
        "enterClassesRecord": "app/order/stu/enterClassesRecord",
        "orderInfo4Page": "app/order/stu/orderInfo4Page",
        "tea-schedule-course-1.0.0": "app/order/tea/tea-schedule-course-1.0.0",
        "teacher-course-list-1.0": "app/order/tea/teacher-course-list-1.0",
        "student-course-list-1.0": "app/order/stu/student-course-list-1.0",
        "student-list-1.0": "app/order/student-list-1.0",
        "student-order-detail-1.0": "app/order/student-order-detail-1.0",

        "loadTeaOrderInfo": "app/order/tea/loadTeaOrderInfo",                        // 教师订单
        "confirmCourses": "app/order/tea/confirmCourses",                            // 待確認訂單
        'stuCourseHistory-1.0': "app/order/stu/stuCourseHistory-1.0",
        "teacher-list-1.0": "app/order/teacher-list-1.0",                            // 我的老师
        "loadStuOrderInfo": "app/order/stu/loadStuOrderInfo",                        // 订单管理
        "appRecords": "app/order/stu/appRecords",                                    // 调（退课）换老师
        "initStuAppRecord-1.0": "app/order/stu/initStuAppRecord-1.0",
        "loadOrgOrderList": "app/order/org/loadOrgOrderList",                        // 机构全部订单
        "requestRecords": "app/order/org/requestRecords",                            // 退换课处理
        "orgAppRecords-1.0": "app/order/org/orgAppRecords-1.0",
        "course-deal": "app/order/course-deal",
        "sanhai-companion-standard-1.0.0": "app/course/sanhai-companion-standard-1.0.0",
        "sanhai-course-create-standard-1.0.0": "app/course/sanhai-course-create-standard-1.0.0",
        "sanhai-course-modify-standard-1.0.0": "app/course/sanhai-course-modify-standard-1.0.0",

        "initAssignTeacherJs": "app/order/org/initAssignTeacherJs-1.0.0",            // 匹配老师

        "course-timetable-page-append-1.0.0": "app/order/course-timetable-page-append-1.0.0", // 我的课表 ?
        //"timetable": "module/order/course-timetable-page-append-1.0.0", /*有地方用以后删除*/       // 我的课表 ?

        "dialogs": "module/dialogs",
        "base_dialog_standard": "module/base_dialog_standard",                                  // ?
        //"base_dialog_standard": "app/assets/base_dialog_standard",    // -->位置modlue
        "balance_account": "app/assets/sanhai-balance-account-standard-1.0.0",          // 加载余额（台时费）账户
        /* ----------------------------------------------[三海定定义模块]----------------------------------------------*/

        /* ------------------------------------------------[三海业务]------------------------------------------------*/
        "course_center": 'app/course/sanhai-course-list-standard-1.0.0',                // 加载所有课
        "loadVersionAndMatch": 'app/course/sanhai-course-standard-1.0.0',               // 加载教材版本
        "teaAppRecords": "app/order/teaAppRecords",                                     // 调课处理
        "sanhai-evaluate": "app/order/sanhai-evaluate",                                 // 评价记录
        "evaluate": "app/order/evaluate",                                 // 订单评价记录
        "sanhai-tea-fund-flow-log-1.0.0": "app/assets/sanhai-tea-fund-flow-log-1.0.0",  // 加载教师收支记录
        "sanhai-stu-fund-log-1.0.0": "app/assets/sanhai-stu-fund-log-1.0.0",            // 加载学生收支记录
        "sanhai-unstu-fund-log-1.0.0": "app/assets/sanhai-unstu-fund-log-1.0.0",        // 大学生收支记录
        "sanhai-withdraw-log-1.0.0": "app/assets/sanhai-withdraw-log-1.0.0",            // 加载提现记录
        "course-history-1.0": "app/assets/course-history-1.0",                          // 讲课记录
        "teaCourseHistory-1.0": "app/assets/teaCourseHistory-1.0",                      // 讲课记录
        "org-account-center-1.0.0": "app/assets/org-account-center-1.0.0",              // 机构资金中心
        "load-org-account-info-1.0.0": "app/assets/load-org-account-info-1.0.0",
        "org-record-center-1.0.0": "app/assets/org-record-center-1.0.0",
        "load-org-record-info": "app/assets/load-org-record-info",
        "org-platform-record-1.0.0": "app/assets/org-platform-record-1.0.0",
        /* ------------------------------------------------[三海业务]------------------------------------------------*/
    },
    removeCombined: true,
    allowSourceOverwrites: true,
    keepBuildDir: true,
    modules: [
        {
            name: 'app/course/schoolCreateCourse',
            include:[
                'jquery','loadVersionAndMatch','base_dialog_standard','sanhai-course-create-standard-1.0.0','loadAreaAndMatch','jquery_fileupload',
                'app/course/schoolCreateCourseDo'
            ]
        }
    ]
})
