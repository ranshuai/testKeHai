/**
 * Created by Administrator on 2015/12/19.
 */
define(
	[
		"jquery",
		"loadVersionAndMatch",
		"dialogs", "sanhai-course-create-standard-1.0.0",
		"loadAreaAndMatch",
		"umeditor_config",
		"umeditor",
		"jquery_fileupload",
		"lib/jquery_validate/messages_zh"
	], function ($, loa, dialogs, cou, area) {

		// 富文本
		var desEdit = UM.getEditor('testpaperInfo');

		//loa.fileUpload($("#fileupload"), sessionScope);
		loa.loadCourseTypeAndMatch($("#courseType"), null, null);
		loa.loadGrandAndMatch($("#grade"), null, null);
		area.loadAreaAndMatch($("#prov"), $("#country"), $("#city"), null, null);
		loa.loadSubjectAndMatch($("#subject"), null, null);
		loa.loadVersionAndMatch($("#version"), null, null);

		/* --------------------------------------[匹配教师]-------------------------------------- */
		dialogs._initBaseDialog(null);

		$("#teacher").on("click", function () {
			$("#org").attr("class", "blue");
			$("#platform").attr("class", "gray");
			loa.matchTeacher(null, $('#grade'), $('#subject'), $('#version'));
		});

		$("#cleanTeacher").on("click", function () {
			loa.cleanTeacher();
		});

		//切换本校共和平台
		$("#org").on("click", function () {
			$("#org").attr("class", "blue");
			$("#platform").attr("class", "gray");
			loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'));
		});
		$("#platform").on("click", function () {
			$("#platform").attr("class", "blue");
			$("#org").attr("class", "gray");
			loa.matchTeacher($(this), $('#grade'), $('#subject'), $('#version'))
		});

		// 搜索教师
		$("#searchTeaBtn").click(function () {
			var org = $("#org").attr("class");
			var platform = $("#platform").attr("class");

			if ("blue" == org) var scope = "org";
			if ("blue" == platform) var scope = "platform";

			loa.loadSearchTeacher($("#name").val(), scope, 1);
		});
		/* --------------------------------------[匹配教师]-------------------------------------- */

		$("button[name='save']").on("click", function () {
			// 富文本内容是否过多
			if (desEdit.getContent().length > 60000) {
				dialogs._timer("课程介绍内容过多，请缩减填写内容", 2, 2, null);
				return false;
			} else {
				cou.submitSaveCourse($(this), 0);
			}
		});

		$("button[name='saveRelease']").on("click", function () {
			// 富文本内容是否过多
			if (desEdit.getContent().length > 60000) {
				dialogs._timer("课程介绍内容过多，请缩减填写内容", 2, 2, null);
				return false;
			} else {
				cou.submitSaveCourse($(this), 0);
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
