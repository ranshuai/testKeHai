/**
 * Created by 蒋淼 on 2015/8/3.
 */

/** ---------------------------------------------------------------------------------------------------------------- **/
/* 科目和教材版本JSON字符串 */

define('loadVersionAndMatch', ["jquery", "pageBar", "dialogs", "jquery_ui_widget", "jquery_iframe_transport", "jquery_fileupload", "jquery_xdr_transport", "fileupload_process", "fileupload_validate"], function ($, pageBar, dialogs) {


    var courseTypeJson = "{\"courseTypes\":[{\"code\":\"1\",\"codeValue\":\"小学\"},{\"code\":\"2\",\"codeValue\":\"小升初\"},{\"code\":\"3\",\"codeValue\":\"初中\"},{\"code\":\"4\",\"codeValue\":\"中考\"},{\"code\":\"5\",\"codeValue\":\"高中\"},{\"code\":\"6\",\"codeValue\":\"高考\"}]}";
    var gradeJson = " {\"grades\":[{\"code\":\"1001\",\"codeValue\":\"一年级\"},{\"code\":\"1002\",\"codeValue\":\"二年级\"},{\"code\":\"1003\",\"codeValue\":\"三年级\"},{\"code\":\"1004\",\"codeValue\":\"四年级\"},{\"code\":\"1005\",\"codeValue\":\"五年级\"},{\"code\":\"1006\",\"codeValue\":\"六年级\"},{\"code\":\"1007\",\"codeValue\":\"预初\"},{\"code\":\"1008\",\"codeValue\":\"初一\"},{\"code\":\"1009\",\"codeValue\":\"初二\"},{\"code\":\"1010\",\"codeValue\":\"初三\"},{\"code\":\"1011\",\"codeValue\":\"高一\"},{\"code\":\"1012\",\"codeValue\":\"高二\"},{\"code\":\"1013\",\"codeValue\":\"高三\"}]}";

    var subjectJson = "{\"subjects\": [{\"secondCode\": \"10010\",\"secondCodeValue\": \"语文\"},{\"secondCode\": \"10011\",\"secondCodeValue\": \"数学\"},{\"secondCode\": \"10012\",\"secondCodeValue\": \"英语\"},{\"secondCode\": \"10013\",\"secondCodeValue\": \"生物\"},{\"secondCode\": \"10014\",\"secondCodeValue\": \"物理\"},{\"secondCode\": \"10015\",\"secondCodeValue\": \"化学\"},{\"secondCode\": \"10016\",\"secondCodeValue\": \"地理\"},{\"secondCode\": \"10017\",\"secondCodeValue\": \"历史\"},{\"secondCode\": \"10018\",\"secondCodeValue\": \"政治\"}]}";

    var versionJson = "{\"versions\":[{\"secondCode\":\"20601\",\"secondCodeValue\":\"人教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"39\",\"secondCode\":\"20602\",\"secondCodeValue\":\"苏教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"40\",\"secondCode\":\"20603\",\"secondCodeValue\":\"鲁教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"93\",\"secondCode\":\"20604\",\"secondCodeValue\":\"北师大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"383\",\"secondCode\":\"20605\",\"secondCodeValue\":\"冀教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"385\",\"secondCode\":\"20606\",\"secondCodeValue\":\"鲁教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"386\",\"secondCode\":\"20607\",\"secondCodeValue\":\"人教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"387\",\"secondCode\":\"20608\",\"secondCodeValue\":\"北师大版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"578\",\"secondCode\":\"206100\",\"secondCodeValue\":\"清华版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"579\",\"secondCode\":\"206101\",\"secondCodeValue\":\"河大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"580\",\"secondCode\":\"206102\",\"secondCodeValue\":\"晋教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"390\",\"secondCode\":\"20611\",\"secondCodeValue\":\"语文版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"391\",\"secondCode\":\"20612\",\"secondCodeValue\":\"沪教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"395\",\"secondCode\":\"20613\",\"secondCodeValue\":\"北京课改版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"403\",\"secondCode\":\"20614\",\"secondCodeValue\":\"鄂教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"404\",\"secondCode\":\"20615\",\"secondCodeValue\":\"上海教育出版社\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"405\",\"secondCode\":\"20616\",\"secondCodeValue\":\"苏教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"407\",\"secondCode\":\"20618\",\"secondCodeValue\":\"浙教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"409\",\"secondCode\":\"20620\",\"secondCodeValue\":\"沪科版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"410\",\"secondCode\":\"20621\",\"secondCodeValue\":\"沪教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"411\",\"secondCode\":\"20622\",\"secondCodeValue\":\"沪科版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"413\",\"secondCode\":\"20623\",\"secondCodeValue\":\"华师大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"414\",\"secondCode\":\"20624\",\"secondCodeValue\":\"青岛版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"415\",\"secondCode\":\"20625\",\"secondCodeValue\":\"青岛版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"416\",\"secondCode\":\"20626\",\"secondCodeValue\":\"苏科版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"417\",\"secondCode\":\"20627\",\"secondCodeValue\":\"苏科版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"418\",\"secondCode\":\"20628\",\"secondCodeValue\":\"浙教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"422\",\"secondCode\":\"20631\",\"secondCodeValue\":\"牛津上海版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"423\",\"secondCode\":\"20632\",\"secondCodeValue\":\"牛津上海版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"424\",\"secondCode\":\"20633\",\"secondCodeValue\":\"牛津深圳版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"425\",\"secondCode\":\"20634\",\"secondCodeValue\":\"牛津沈阳版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"426\",\"secondCode\":\"20635\",\"secondCodeValue\":\"牛津译林版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"427\",\"secondCode\":\"20636\",\"secondCodeValue\":\"人教新版本\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"429\",\"secondCode\":\"20638\",\"secondCodeValue\":\"人教新目标版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"430\",\"secondCode\":\"20639\",\"secondCodeValue\":\"仁爱版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"431\",\"secondCode\":\"20640\",\"secondCodeValue\":\"仁爱版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"432\",\"secondCode\":\"20641\",\"secondCodeValue\":\"外研版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"433\",\"secondCode\":\"20642\",\"secondCodeValue\":\"外研社\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"434\",\"secondCode\":\"20643\",\"secondCodeValue\":\"北京课改版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"435\",\"secondCode\":\"20644\",\"secondCodeValue\":\"沪粤版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"436\",\"secondCode\":\"20645\",\"secondCodeValue\":\"教科版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"437\",\"secondCode\":\"20646\",\"secondCodeValue\":\"仁爱湘教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"438\",\"secondCode\":\"20647\",\"secondCodeValue\":\"湘教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"439\",\"secondCode\":\"20648\",\"secondCodeValue\":\"粤教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"440\",\"secondCode\":\"20649\",\"secondCodeValue\":\"粤教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"441\",\"secondCode\":\"20650\",\"secondCodeValue\":\"河北少儿版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"442\",\"secondCode\":\"20651\",\"secondCodeValue\":\"济南版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"443\",\"secondCode\":\"20652\",\"secondCodeValue\":\"鲁科版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"444\",\"secondCode\":\"20653\",\"secondCodeValue\":\"人民版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"445\",\"secondCode\":\"20654\",\"secondCodeValue\":\"陕教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"446\",\"secondCode\":\"20655\",\"secondCodeValue\":\"川教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"447\",\"secondCode\":\"20656\",\"secondCodeValue\":\"华师版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"449\",\"secondCode\":\"20658\",\"secondCodeValue\":\"岳麓版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"450\",\"secondCode\":\"20659\",\"secondCodeValue\":\"中华书局版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"451\",\"secondCode\":\"20660\",\"secondCodeValue\":\"中华书教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"452\",\"secondCode\":\"20661\",\"secondCodeValue\":\"中图版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"453\",\"secondCode\":\"20662\",\"secondCodeValue\":\"人教新课标版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"454\",\"secondCode\":\"20663\",\"secondCodeValue\":\"商务星球版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"456\",\"secondCode\":\"20664\",\"secondCodeValue\":\"北京版（08版）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"462\",\"secondCode\":\"20665\",\"secondCodeValue\":\"鲁人版（08版）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"463\",\"secondCode\":\"20666\",\"secondCodeValue\":\"人教新课标\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"464\",\"secondCode\":\"20667\",\"secondCodeValue\":\"新课标版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"465\",\"secondCode\":\"20668\",\"secondCodeValue\":\"语文版（07版）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"466\",\"secondCode\":\"20669\",\"secondCodeValue\":\"语文版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"467\",\"secondCode\":\"20670\",\"secondCodeValue\":\"新课标人教B版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"471\",\"secondCode\":\"20671\",\"secondCodeValue\":\"人教A版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"473\",\"secondCode\":\"20672\",\"secondCodeValue\":\"人教B版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"474\",\"secondCode\":\"20673\",\"secondCodeValue\":\"上海版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"477\",\"secondCode\":\"20674\",\"secondCodeValue\":\"文科库\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"478\",\"secondCode\":\"20675\",\"secondCodeValue\":\"新课标人教A版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"482\",\"secondCode\":\"20676\",\"secondCodeValue\":\"江苏版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"483\",\"secondCode\":\"20677\",\"secondCodeValue\":\"鲁科版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"484\",\"secondCode\":\"20678\",\"secondCodeValue\":\"新课标人教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"485\",\"secondCode\":\"20679\",\"secondCodeValue\":\"浙科版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"486\",\"secondCode\":\"20680\",\"secondCodeValue\":\"浙科版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"487\",\"secondCode\":\"20681\",\"secondCodeValue\":\"中图版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"488\",\"secondCode\":\"20682\",\"secondCodeValue\":\"标准实验版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"490\",\"secondCode\":\"20683\",\"secondCodeValue\":\"大象版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"494\",\"secondCode\":\"20684\",\"secondCodeValue\":\"新岳麓版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"495\",\"secondCode\":\"20685\",\"secondCodeValue\":\"湘教版（旧）\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"496\",\"secondCode\":\"20686\",\"secondCodeValue\":\"长春版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"497\",\"secondCode\":\"20687\",\"secondCodeValue\":\"重庆大学版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"499\",\"secondCode\":\"20688\",\"secondCodeValue\":\"外研版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"500\",\"secondCode\":\"20689\",\"secondCodeValue\":\"译林牛津版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"518\",\"secondCode\":\"20690\",\"secondCodeValue\":\"综合库\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"519\",\"secondCode\":\"20691\",\"secondCodeValue\":\"北京版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"520\",\"secondCode\":\"20692\",\"secondCodeValue\":\"西南师大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"571\",\"secondCode\":\"20693\",\"secondCodeValue\":\"豫教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"572\",\"secondCode\":\"20694\",\"secondCodeValue\":\"泰山版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"573\",\"secondCode\":\"20695\",\"secondCodeValue\":\"华中师大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"574\",\"secondCode\":\"20696\",\"secondCodeValue\":\"辽师大版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"575\",\"secondCode\":\"20697\",\"secondCodeValue\":\"闽教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"576\",\"secondCode\":\"20698\",\"secondCodeValue\":\"龙教版\"},{\"firstCode\":\"206\",\"firstCodeValue\":\"教材版本\",\"id\":\"577\",\"secondCode\":\"20699\",\"secondCodeValue\":\"浙江摄影版\"}]}";
    /** ---------------------------------------------------------------------------------------------------------------- **/

    /**
     * 加载课程类型且匹配选择内容
     * @param targetDiv 课程类型SELECT元素
     * @param code      匹配课程ID
     * @注意
     * @1 课程类型只有key没有传递对应的val
     */
    function loadCourseTypeAndMatch(targetDiv, code) {
        var courseTypeObj = jQuery.parseJSON(courseTypeJson);

        $.each(courseTypeObj.courseTypes, function (index, value) {
            var key = value.code;
            var val = value.codeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            targetDiv.append(opt);
        });

        if (null != code && "" != code) {
            targetDiv.find("option[value='" + code + "']").attr("selected", true);
            targetDiv.parent().find("em").html(targetDiv.find("option:selected").text());
        }

        targetDiv.change(function () {
            $(this).parent().find("em").html($(this).find("option:selected").text());
        });
    }

    /**
     * 加载年级且匹配内容
     * @param targetDiv 年级SELECT元素
     * @param gardeId   匹配年级ID
     * @param grade     匹配年级值
     * @注意
     * @1 SELECT选择内容是在父级元素<em>中显示的
     * @2 SELECT自身的selected有效，确保选择内容高亮显示
     */
    function loadGrandAndMatch(targetDiv, gardeId, grade) {
        var gradeObj = jQuery.parseJSON(gradeJson);

        $.each(gradeObj.grades, function (index, value) {
            var key = value.code;
            var val = value.codeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            targetDiv.append(opt);
        });

        // 匹配选内容
        if (null != grade && "" != grade) {
            targetDiv.parent().find("em").html(grade);
            targetDiv.find("option[value='" + gardeId + "']").attr("selected", true);
        }

        // 绑定事件
        targetDiv.change(function () {
            $(this).parent().find("em").html($(this).find("option:selected").text());
        });
    }

    /**
     * 加载科目且匹配选择内容
     * @param targetDiv     目标SELECT
     * @param subjectId     匹配科目ID
     * @param subject       匹配科目内容
     * @注意
     * @1 SELECT选择内容是在父级元素<em>中显示的
     * @2 SELECT自身的selected有效，确保选择内容高亮显示
     */
    function loadSubjectAndMatch(targetDiv, subjectId, subject) {
        var subejctObj = jQuery.parseJSON(subjectJson);

        $.each(subejctObj.subjects, function (index, value) {
            var key = value.secondCode;
            var val = value.secondCodeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            targetDiv.append(opt);
        });

        // 匹配选内容
        if (null != subject && "" != subject) {
            targetDiv.parent().find("em").html(subject);
            targetDiv.find("option[value='" + subjectId + "']").attr("selected", true);
        }

        // 绑定事件
        targetDiv.change(function () {
            $(this).parent().find("em").html($(this).find("option:selected").text());
        });
    }


    /**
     * 加载教材版本且匹配选择内容
     * @param targetDiv
     * @param versionId
     * @param version
     */
    function loadVersionAndMatch(targetDiv, versionId, version) {
        var versionObj = jQuery.parseJSON(versionJson);

        $.each(versionObj.versions, function (index, value) {
            var key = value.secondCode;
            var val = value.secondCodeValue;

            var opt = "<option value='" + key + "'>" + val + "</option>";
            targetDiv.append(opt);
        });

        // 选择内容
        if (null != version && "" != version) {
            targetDiv.parent().find("em").html(version);
            targetDiv.find("option[value='" + versionId + "']").attr("selected", true);
        }

        // 绑定事件
        targetDiv.change(function () {
            $(this).parent().find("em").html($(this).find("option:selected").text());
        });
    }

    /**
     * 上传文件
     * @param targetDiv
     * TODO 作废这个无法控制类型和大小
     */
    function fileUpload(targetDiv, userId) {
        targetDiv.fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;
                //ID赋值到隐藏域
                $("#advertiseResId").val(resId);

                // 显示图片
                $("div[class='formR']").find("img").attr("src", "/file/loadImage/" + resId + ".r?dim=250");
            },
            "processfail": function (e, data) {

                //debugger;

                var index = data.index, file = data.files[index];
                var size = file.size;

                alert(size);

                if (file.error) {
                    alert(file.error);
                }
            },
            "url": "/file/upload.se",
            "autoUpload": true,
            "formData": {
                userId: userId
            },
            "dataType": "json"
        });
    }

    /**
     * 上传文件
     */
    $('#fileupload').live("click", function () {
        $(this).fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024 * 1024 * 2,
            "done": function (e, data, response) {
                var resId = data.result.data.ids;
                //ID赋值到隐藏域
                $("#advertiseResId").val(resId);

                // 显示图片
                $("#courseImg").attr("src", "/file/loadImage/" + resId + "/350/220.r");
            },
            "processfail": function (e, data) {
                var index = data.index, file = data.files[index];
                if (file.size > 1024 * 1024 * 2) {
                    dialogs._timer("上传的文件太大了", 2, 2, null);
                } else if (file.error) {
                    dialogs._timer("文件类型错误", 2, 2, null);
                }
            },
            "url": "/file/upload.se",
            "autoUpload": true,
            "formData": {
                //userId:
            },
            "dataType": "json"
        });
    });



    /**
     *
     * 上传文件
     */
    $('#fileupload_2').live("click", function () {
        $(this).fileupload({
            "acceptFileTypes": /(\.|\/)(bmp|jpg|png|jpeg)$/i,
            "maxFileSize": 1024 * 1024 * 2,
            "done": function (e, data, response) {

                var resId = data.result.data.ids;
                //ID赋值到隐藏域
                advertiseResId=resId;
                $("#advertiseResId").val(resId);

                // 显示图片
                $("#courseImg_2").attr("src", "/file/loadImage/" + resId + "/240/135.r");
            },
            "processfail": function (e, data) {
                var index = data.index, file = data.files[index];
                if (file.size > 1024 * 1024 * 2) {
                    dialogs._timer("上传的文件太大了", 2, 2, null);
                } else if (file.error) {
                    dialogs._timer("文件类型错误", 2, 2, null);
                }
            },
            "url": "/file/upload.se",
            "autoUpload": true,
            "formData": {
                //userId:
            },
            "dataType": "json"
        });
    });

    /**
     * 查询教师
     * @param target    null = 首次加载；本校 = 选择加载本校教师；平台 = 选择加载平台教师
     * @param gradeDiv      年级ID
     * @param subjectDiv    科目ID
     * @param versionDiv    版本ID
     * @注意
     * @1 目前仅仅针对机构匹配教师，年级ID，科目ID和版本ID没有作为查询条件，但这里还是预留参数
     * @2 调用 loadMatchTeacher 方法进行查询
     */
    function matchTeacher(target, gradeDiv, subjectDiv, versionDiv) {
        var gradeId = gradeDiv.val();
        var subjectId = subjectDiv.val();
        var versionId = versionDiv.val();

        // 提示信息
        var timer;
        $('.teacher_list_cont').delegate('li', {
            'mouseenter': function () {
                var $this = $(this);
                $this.addClass('ac');
                $this.css("z-index", "1").siblings("li").css("z-index", "0");
                timer = setTimeout(function () {
                    $this.children('.teacher_introduction_list').removeClass('hide');
                }, 200);
            }, 'mouseleave': function () {
                clearTimeout(timer);
                var $this = $(this);
                $this.removeClass('ac');
                $this.children('.teacher_introduction_list').addClass('hide');

            }
        });

        // 首次打开默认查询当前登录用户所属机构教师
        if (null == target) {
            loadMatchTeacher("org", gradeId, subjectId, versionId, 1);
        } else {
            if ("本校" == target.text()) {
                loadMatchTeacher("org", gradeId, subjectId, versionId, 1);
            }
            if ("平台" == target.text()) {
                loadMatchTeacher("platform", gradeId, subjectId, versionId, 1);
            }
        }
    }

    /**
     * 查询指定范围教师
     * @param scope         own = 当前登录用户机构教师；org = 默认机构教师
     * @param gradeId       年级ID
     * @param subjectId     科目ID
     * @param versionId     版本ID
     * @param currentPage   当前页数
     * @注意
     * @1 目前仅仅针对机构匹配教师，年级ID，科目ID和版本ID没有作为查询条件，但这里还是预留参数
     */
    function loadMatchTeacher(scope, gradeId, subjectId, versionId, currentPage) {

        $.ajax({
            url: "/course/" + scope + "/" + currentPage + "/queryTeacher4Simple.do",
            type: "post",
            dataType: "json",
            success: function (response) {
                var teachers = response.data.teachers.data;
                if (null != teachers) {
                    $("#teacherTab").empty();

                    $.each(teachers, function (index, value) {
                        var teacherId = "ID：" + value.userId;
                        var seniority = "教龄：" + value.seniority + "年";
                        var courseCode = "科目：" + value.courseCode;

                        var content = "<li style='z-index: 1'>" +
                            "<h5 name='teacher' id='" + value.userId + "' >" + value.name + "</h5>" +
                            "<div class='teacher_introduction_list hide'>" +
                            "<i></i>" +
                            "<div>" +
                            "<span>科目:</span><span class='font12'>" + value.courseCode + "</span>" +
                            "</div>" +
                            "<div>" +
                            "<span>教龄:</span><span class='font12'>" + value.seniority + "</span>" +
                            "</div>" +
                                /*"<div>" +
                                 "<span>ID:</span><span>" + value.userId + "</span>" +
                                 "</div>" +*/
                            "</div>" +
                            "</li>";

                        $("#teacherTab").append(content);
                    });

                    // 事件
                    $("h5[name='teacher']").on("click", function () {
                        $("#lecturerId").val($(this).attr("id"));
                        $("#courseTeacherID").val($(this).attr("id"));
                        //$("#teacher").attr("value", $(this).html());
                        $("#teacher").val($(this).html());
                        $("#courseTeacher").val($(this).html());
                        $("#speaker").dialog("close");

                    });

                    var params = new Array();
                    params.push(scope);
                    params.push(null);
                    params.push(null);
                    params.push(null);
                    pageBar.setMatchTeacherPageBar(response.data.teachers.totalPages, response.data.teachers.currPage, loadMatchTeacher, params);

                    $('#speaker').dialog("open");
                    $(".cancelBtn").click(function () {
                        $(".popBox").dialog("close");
                    });

                } else {
                    dialogs._timer("没有教师", 2, 2, null);
                }
            },
            error: function (response) {
                dialogs._timer("请求失败稍后再试", 2, 2, null);
            }
        });
    }

    /**
     * 根据输入名称查询教师信息
     * @param name
     * @param currentPage
     * @注意
     * @1 没有分页条
     */
    function loadSearchTeacher(name, scope, currentPage) {
        if (null != name && "" != name) {
            $.ajax({
                //url: "/course/" + name + "/" + scope + "/" + currentPage + "/searchTeacher4Simple.do",
                url: "/course/searchTeacher4Simple.do",
                type: "post",
                dataType: "json",
                data: {
                    name: name,
                    scope: scope,
                    currentPage: currentPage
                },
                success: function (response) {
                    var teachers = response.data.teachers.data;
                    if (null != teachers && teachers.length != 0) {
                        $("#name").val("");
                        $("#teacherTab").empty();

                        $.each(teachers, function (index, value) {
                            var teacherId = "ID：" + value.userId;
                            var seniority = "教龄：" + value.seniority + "年";
                            var courseCode = "科目：" + value.courseCode;

                            var content = "<li style='z-index: 1'>" +
                                "<h5 name='teacher' id='" + value.userId + "' >" + value.name + "</h5>" +
                                "<div class='teacher_introduction_list hide'>" +
                                "<i></i>" +
                                "<div>" +
                                "<span>科目:</span><span class='font12'>" + value.courseCode + "</span>" +
                                "</div>" +
                                "<div>" +
                                "<span>教龄:</span><span class='font12'>" + value.seniority + "</span>" +
                                "</div>" +
                                    /*"<div>" +
                                     "<span>ID:</span><span>" + value.userId + "</span>" +
                                     "</div>" +*/
                                "</div>" +
                                "</li>";

                            $("#teacherTab").append(content);


                        });
                        // 事件
                        $("h5[name='teacher']").on("click", function () {
                            $("#lecturerId").val($(this).attr("id"));
                            $("#courseTeacherID").val($(this).attr("id"));
                            //$("#teacher").attr("value", $(this).html());
                            $("#teacher").val($(this).html());
                            $("#courseTeacher").val($(this).html());
                            $("#speaker").dialog("close");
                        });
                        var params = new Array();
                        params.push(name);
                        params.push(scope);
                        pageBar.setMatchTeacherPageBar(response.data.teachers.totalPages, response.data.teachers.currPage, loadSearchTeacher, params);

                        $('#speaker').dialog("open");
                        $(".cancelBtn").click(function () {
                            $(".popBox").dialog("close");
                        });

                    } else {
                        $("#name").val("");
                        $("div[class='page ']").empty();
                        $("#teacherTab").empty();
                        $("#teacherTab").append("<p>没有符合名称教师</p>");
                    }
                },
                error: function (response) {
                    //dialog.defaultDialog("error", "请求失败稍后再试", null);
                    dialogs._timer("请求失败稍后再试", 2, 2, null);
                }
            });
        } else {
            // 没有输入名字全部查询
            loadMatchTeacher(scope, null, null, null, 1);
        }
    }

    /**
     * 清空课程教师和隐藏教师ID
     */
    function cleanTeacher() {
        $("#lecturerId").val(0);
        $("#teacher").val("");
        $("#salary").val("");
    }

    return {
        // 加载教材版本且匹配选择内容
        loadVersionAndMatch: loadVersionAndMatch,
        loadSubjectAndMatch: loadSubjectAndMatch,
        loadCourseTypeAndMatch: loadCourseTypeAndMatch,
        subjectJson: subjectJson,
        loadGrandAndMatch: loadGrandAndMatch,
        //fileUpload: fileUpload,
        matchTeacher: matchTeacher,
        cleanTeacher: cleanTeacher,
        loadSearchTeacher: loadSearchTeacher
    }

});