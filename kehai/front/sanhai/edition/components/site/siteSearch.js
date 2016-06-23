require('../../css/site/siteSearch.css');

var template = require("../../template/site/siteSearch.html");
var data={say_hello:"it is handlebars"};
var html = template(data);
document.getElementById('siteSearch').innerHTML = html;

$.fn.extend({
    'rSetUpTab': function () {
        $(this).click(function () {
            var _this = $(this);
            _this.children('ul').removeClass('hide');
            _this.undelegate();
            _this.delegate('li', {
                click: function (event) {
                    var $this = $(this);
                    var txt = $this.parents('.select_type_List').find('.sele_type').text();
                    $this.parents('.select_type_List').find('.sele_type').text($this.text());
                    $this.text(txt);
                    $this.parent('ul').addClass('hide');
                    event.stopPropagation();
                }
            });
            $(document).click(function () {
                _this.children('ul').addClass('hide');
            });
            return false;
        });
    },
    'placeholder': function (opts) {
        var def = {
            value: "",//提示信息文本
            top: 0,//自定义top显示位置
            ie6Top: "",
            left: 0, //自定义left显示位置
            color: "#cccdcc"//文字颜色
        };
        var opts = $.extend(def, opts);
        return this.each(function () {
            var _this = $(this);
            var placeholder = "";
            var inputH = $(this).outerHeight();
            var lineH = parseInt(_this.css("line-height"));
            var inputTop = _this.position().top;
            var inputLeft = _this.position().left;
            var spanLeft = inputLeft + 12;

            if (opts.top == 0)var spanTop = parseInt(opts.top + inputTop);
            else spanTop = parseInt(inputTop + (inputH - lineH) / 2);
            //alert(spanTop);
            function add_placeholder() {
                _this.next('.placeholder').size() > 0 && _this.next('.placeholder').remove();
                _this.after('<span class="placeholder" style="position:absolute;top:0px;left:12px;color:' + opts.color + '; height:100%; width:100%; font-size:14px; text-align:left; line-height:36px;">' + opts.value + '</span>');
                placeholder = _this.nextAll('.placeholder');
                placeholder.click(function () {
                    $(this).remove();
                    _this.focus();//弹出框聚焦
                });
            }
            //_this.unbind('blur').blur();
            //alert(_this.val());
            if (_this.val() == "") add_placeholder();
            else $(placeholder).remove();
            _this.unbind('focus').focus(function () {
                $(placeholder).remove()
            });
            _this.unbind('blur').blur(function () {
                if (_this.val() == "") add_placeholder()
            });
        });
    }
});

$('.select_type_List').rSetUpTab();

function SiteSearchBtn() {
    this.sercherBtn = $('#sercher');
    this.searchInp = $('#search_input .subTitleBar_text1');
    this.searchType =$('.sele_type');
}
SiteSearchBtn.prototype.search = function(){
    var searchText = this.searchInp.val();
    var Type = this.searchType.text();
    var seldata = encodeURI(encodeURI(searchText));
    if($.trim(searchText) == ''){
        return
    }
    var json = {
        "课程":"/site/course/selectCourse1.htm?courseTitle=",
        "学校":"/site/selectschool.htm?orgname=",
        "教师":"/site/selectteacher.htm?name=",
        "课表":"/site/toselectPtCourse.htm?theme=",
        "课海":"/site/toselectVideoCourse.htm?theme="
    };
    if (Type) {
        window.location.href = json[Type] + seldata;
    }
};

SiteSearchBtn.prototype.init = function(){
    var $this = this;
    this.sercherBtn.click(function(){
        $this.search();
    });
};

var SiteSearch = new SiteSearchBtn();

SiteSearch.init();