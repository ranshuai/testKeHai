require('../../../css/site/siteNav.css');

//导航模板
var Navtemplate = require('./templates/homeNav.hbs');

var HomeNavV = Backbone.View.extend({
    el:'#siteNav',
    events:{
        'click a':'linkList',
        'mouseenter .class_type li':'ulShow',
        'mouseleave .class_type li':'ulShow'
    },
    linkList:function(e){
        var $ele = $(e.target);
        var courseType = $ele.parents('.class_type_content').find('h3').attr('code');
        var subjectId = $ele.attr('code');
        window.location.href='/site/list.html#course?courseType='+courseType+'&subjectId='+subjectId
    },
    ulShow:function(e){
        var $ele = $(e.target);
        $ele.find('.more_class_cont').toggleClass('hide');
    },
    initialize:function(){
        this.render();
    },
    render:function(){
        $('#siteNav').html(this.template());
    },
    template:Navtemplate
});

var homeNavV = new HomeNavV();