require('../../css/site/siteOTO.css');
require('../../css/site/c_SiteCourseList.css');
require('../../css/site/siteNewComment.css');
/**************************************************************/
/*今日推荐模板*/
var template = require("../../template/site/siteToDayCour.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteTodyRecommend').innerHTML = html;
/*------------------------------------------------------------*/
/*热门课程模板*/
var template = require("../../template/site/siteGoodCourse.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteGoodCourse').innerHTML = html;
/*------------------------------------------------------------*/
/*一对一模板*/
var template = require("../../template/site/siteOTO.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteOTO').innerHTML = html;
/*------------------------------------------------------------*/
/*最新评论模板*/
var template = require('../../template/site/siteNewComment.html');
var data = {say_hello:"it is handlebars"};
var html = template(data);
document.getElementById('siteNewComment').innerHTML = html;
/**************************************************************/
/*网站首页初始化的接口*/
var siteLoadIndexDataGet = require('../../model/site/siteLoadIndexDataGet');
var money = require('../../vendors/libs/money');
siteLoadIndexDataGet.init(siteloadIndex);
/*------------------------------------------------------------*/
/*今日推荐的接口*/
var siteTodyRecommendGet = require('../../model/site/siteTodyRecommendGet');
/*热门课程的接口*/
var siteGoodCourseGet = require('../../model/site/siteGoodCourseGet');
/*------------------------------------------------------------*/
/*点击 li 导航 跳转到课程中心*/
var SiteSelectCourseNav = require('../../vendors/site/siteSelectCourse');
/**************************************************************/
function siteloadIndex(response) {
    /*一对一*/
    var OTOvalueArr = response.data.onetooneCour;
    var MSiteOTO = Backbone.Model.extend({
        defaults: OTOvalueArr,
        money: money
    });
    var VSiteOTO = Backbone.View.extend({
        initialize: function () {
            $('#onetooneCour').append(this.template(this.model.toJSON()));
        },
        template: _.template($('#onetooneCourItem').html())
    });
    var mSiteOTO = new MSiteOTO;
    var vSiteOTO = new VSiteOTO({model: mSiteOTO});

    /**************************************************************/
    /*今日推荐*/
    var todayCour = response.data.terdayCour;
    var MSiteToday = Backbone.Model.extend({
        defaults: todayCour,
        money: money
    });
    var VSiteTerday = Backbone.View.extend({
        el: '#siteTodyRecommend',
        events: {
            'mouseover li a': function (e) {
                $(e.target).addClass('ac');
                $(e.target).parent().siblings().find('a').removeClass('ac');
                var subjectType = $(e.target).html();
                var json = {
                    "语文": "10010",
                    "数学": "10011",
                    "英语": "10012",
                    "物理": "10014",
                    "化学": "10015"
                };
                var subjectId = json[subjectType];
                siteTodyRecommendGet.init({
                    subjectId: subjectId,
                    callback: getData
                });
                function getData(respons) {
                    var data = respons.data.terdayCour.data;
                    mSiteToday.set({'data': data});
                }
            },
            'click li a': function (e) {
                SiteSelectCourseNav.toSelectMainCourse($(e.target), 3);
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            $('#siteToDataCour').empty();
            $('#siteToDataCour').html(this.template(this.model.toJSON()));
        },
        template: _.template($('#siteToDataCourItem').text())
    });
    var mSiteToday = new MSiteToday;
    var vSiteToday = new VSiteTerday({model : mSiteToday});

    /**************************************************************/
    /*热门课程*/
    var goodCour = response.data.goodCour;
    var MgoodCour = Backbone.Model.extend({
        defaults: goodCour,
        money: money
    });
    var VgoodCour = Backbone.View.extend({
        el: '#siteGoodCourse',
        events: {
            'mouseover li a': function (e) {
                $(e.target).addClass('ac');
                $(e.target).parent().siblings().find('a').removeClass('ac');
                var subjectType = $(e.target).html();
                var json = {
                    "语文": "10010",
                    "数学": "10011",
                    "英语": "10012",
                    "物理": "10014",
                    "化学": "10015"
                };
                var subjectId = json[subjectType];
                siteGoodCourseGet.init({
                    subjectId: subjectId,
                    callback: getData
                });
                function getData(respons) {
                    var data = respons.data.goodCour.data;
                    mSiteGood.set({'data': data});
                }
            },
            'click li a': function (e) {
                SiteSelectCourseNav.toSelectMainCourse($(e.target), 3);
            }
        },
        initialize: function () {
            this.render();
            this.listenTo(this.model, 'change', this.render);
        },
        render: function () {
            $('#siteToDataCour1').empty();
            $('#siteToDataCour1').html(this.template(this.model.toJSON()));
        },
        template: _.template($('#siteToDataCourItem1').html())
    });
    var mSiteGood = new MgoodCour;
    var vSiteGood = new VgoodCour({model : mSiteGood});

    /**************************************************************/
    /*最新评论*/
    var evaluate = response.data.evaluate;//最新评论
    var evaluateRey = response.data.evaluateRey;//最新回复
    var MSiteNewComment = Backbone.Model.extend({
        defaults:{
            evaluate:evaluate,
            evaluateRey:evaluateRey
        },
        $:require('jquery')
    });
    var VSiteNewComment = Backbone.View.extend({
        el:'#sereva',
        events:{
            "click .bottom_tools .bottom_r a":function(e){
                var num = $(e.target).parents('.bottom_r').find('.bot_span').text();
                if(num != 0){
                        $(e.target).parents('.bottom_tools').next().toggleClass('hide');
                }

            }
        },
        initialize:function(){
            this.render();
        },
        render:function(){
            $('#sereva').html(this.template(this.model.toJSON()));
        },
        template:_.template($('#evaluate').html())
    });

    var mSiteNewComment = new MSiteNewComment;
    var vSiteNewcomment = new VSiteNewComment({model : mSiteNewComment});

}







