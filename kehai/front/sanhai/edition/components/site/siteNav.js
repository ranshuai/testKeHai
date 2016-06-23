require('css/site/siteNav.css');

var template = require("template/site/siteNav.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteNav').innerHTML = html;

$.fn.extend({
    //首页左侧菜单导航
    'rLeftMenuHover': function () {
        var oUl = $(this);
        var aLi = oUl.children();
        var aUl = $('.more_class_cont');
        var timer = null;
        aLi.mouseenter(function () {
            var $this = $(this);

            timer = setTimeout(function () {
                aLi.removeClass('active');
                $this.addClass('active');
                aUl.addClass('hide');
                $this.prev().find('.class_type_content').css('borderBottom', '1px solid #fff');
                var index = $this.index();
                if (index == aLi.length - 1) {
                } else {
                    $this.find('.class_type_content').css('borderBottom', '1px solid #ff7f00');
                }
                aUl.eq(index).removeClass('hide');
                aLi.css({
                    'cursor': 'pointer'
                });
            }, 150);
        });
        aLi.mouseleave(function () {
            var $this = $(this);
            clearTimeout(timer);
            var index = $this.index();
            if (index == aLi.length - 1) {
            } else {
                $this.find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
            }
            $this.prev().find('.class_type_content').css('borderBottom', '1px solid #fdbd39');
            aLi.removeClass('active');
            aUl.addClass('hide');
        });
    }
});

$('#js-sidebar').rLeftMenuHover();

/*
* 点击左侧选择课程导航
* */
var SiteSelectCourseNav = require('vendors/site/siteSelectCourse.js');

$('.class_type li div p a').click(function(){
    SiteSelectCourseNav.toSelectMainCourse($(this))
});
$('.class_type li div ul a').click(function(){
    SiteSelectCourseNav.toSelectMainCourse($(this))
});
