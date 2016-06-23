/**
 * Created by slg on 2016/1/8.
 */
//require.config({
//    baseUrl:JS_BASEURL,
//    paths:{
//        "scheduleManagementDo":"app/scheduleManagement/scheduleManagementDo",
//        "fileupload_process":"lib/jqueryupload/jquery.fileupload-process",
//        "iframe_transport":"lib/jqueryupload/jquery.iframe-transport",
//        "fileupload_validate":"lib/jqueryupload/jquery.fileupload-validate",
//        "knowledgePoint":"module/knowledgePoint",
//    }
//});

require(["scheduleManagementDo"],function(scheduleManagementDo){
    scheduleManagementDo.auditSetting();
    scheduleManagementDo.loadOrderList("", 1);
});