define(["jquery", "lib/jquery_validate/jquery.validate"],
	function($) {
		$.extend($.validator.messages, {
			required: "<i></i>这是必填字段<b></b>",
			remote: "<i></i>请修正此字段<b></b>",
			email: "<i></i>请输入有效的电子邮件地址<b></b>",
			url: "<i></i>请输入有效的网址<b></b>",
			date: "<i></i>请输入有效的日期<b></b>",
			dateISO: "<i></i>请输入有效的日期 (YYYY-MM-DD)<b></b>",
			number: "<i></i>请输入有效的数字<b></b>",
			digits: "<i></i>只能输入数字<b></b>",
			creditcard: "<i></i>请输入有效的信用卡号码<b></b>",
			equalTo: "<i></i>你的输入不相同<b></b>",
			extension: "<i></i>请输入有效的后缀<b></b>",
			maxlength: $.validator.format("<i></i>最多可以输入 {0} 个字<b></b>"),
			minlength: $.validator.format("<i></i>最少要输入 {0} 个字<b></b>"),
			rangelength: $.validator.format("<i></i>请输入长度在 {0} 到 {1} 之间的字符串<b></b>"),
			range: $.validator.format("<i></i>请输入范围在 {0} 到 {1} 之间的数值<b></b>"),
			max: $.validator.format("<i></i>请输入不大于 {0} 的数值<b></b>"),
			min: $.validator.format("<i></i>请输入不小于 {0} 的数值<b></b>")
		});

	});


