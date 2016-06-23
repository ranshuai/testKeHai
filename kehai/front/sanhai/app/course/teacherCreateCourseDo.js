/**
 * Created by Administrator on 2015/12/18.
 */
define(
    [
        "jquery",
        "loadVersionAndMatch",
        "loadAreaAndMatch",
        "sanhai-course-create-standard-1.0.0",
        "dialogs",
        "umeditor_config",
        "umeditor",
        "basic"
    ], function ($, load, are, sanhai, dialogs) {

        //富文本
        var desEdit = UM.getEditor('testpaperInfo');

        // 菜单高亮
        //$("#allCourse").attr("class", "cur");

        //load.fileUpload($("#fileupload"));

        load.loadCourseTypeAndMatch($("#courseType"), null, null);
        load.loadGrandAndMatch($("#grade"), null, null);
        are.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);
        load.loadSubjectAndMatch($("#subject"), null, null);
        load.loadVersionAndMatch($("#version"), null, null);

        $("button[name='save']").on("click", function () {
            // 富文本内容是否过多
            if (desEdit.getContent().length > 60000) {
                dialogs._timer("课程大纲内容过多，请缩减填写内容", 2, 2, null);
                return false;
            } else {
                sanhai.submitSaveCourse($(this), 1);
            }
        });


            function filterGrade(){
                var gradeId;
                function filterGradeDefault(){
                    $('#grade').empty();
                    var arr = [
                        '<option value="1001">一年级</option><option value="1002">二年级</option><option value="1003">三年级</option><option value="1004">四年级</option><option value="1005">五年级</option><option value="1006">六年级</option>',
                        '<option value="1007">预初</option><option value="1008">初一</option><option value="1009">初二</option><option value="1010">初三</option>',
                        '<option value="1011">高一</option><option value="1012">高二</option><option value="1013">高三</option>'  
                    ];
                    var unm = $('#courseType option:selected') .val();
                    if(unm === '1' || unm === '2'){
                        $('#grade').append(arr[0]);
                    }else if(unm === '3' || unm ==='4'){
                        $('#grade').append(arr[1]);
                    }else if(unm === '5'|| unm ==='6'){
                        $('#grade').append(arr[2]);
                    }
                    if(gradeId) $("#grade").val(gradeId);
                     var text = $('#grade option:selected').text()
                    $('#grade').prev().text(text);
                }
                filterGradeDefault();
                  
                $('#courseType').change(function(){
                    filterGradeDefault();
                });
            }
            filterGrade();
    });
