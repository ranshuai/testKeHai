require('../../css/site/siteCarousel.css');
var template = require("./siteCarousel.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteCarousel').innerHTML = html;

var siteAdvertisingGet = require('../../model/site/siteAdvertisingGet');

siteAdvertisingGet.init({callback:advertisingGet});

function advertisingGet(respons){

    /*数据*/
    var M = Backbone.Model.extend({
        defaults:respons.data.advertisings
    });
    var m = new M();
    /*视图*/
    var V = Backbone.View.extend({
        tagName:'ul',
        className:'bannerList',
        initialize:function(){
            this.render();
        },
        render:function(){
            this.$el.html(this.template(this.model.toJSON()));
        },
        template:_.template($('#siteCarousel-template').html())
    });
    var v = new V({model:m});
    $('#mySiteCarousel').html(v.el);
    /*集合*/
}


$.fn.extend({
    //////首页轮播
    'rIndexCarousel': function () {
        var oBox = $(this);
        var oBar = $('.banner');
        var oUl = $('.bannerList');
        var aLi = oUl.children();//img
        var oSliul = $('.slidernav_ul');
        var aSlili = oSliul.children(); //原点
        var oNext = $('.nextBtn');
        var oPrev = $('.prevBtn');
        var num = 0;
        var timer = null;
        var aLin = $(html).find('.mySiteCarousel .bannerlist1');
        function move() {
            num++;
            aSlili.removeClass('ac');
            aSlili.eq(num % 3).addClass('ac');

            aLi.css({'display': 'none'});
            //oBox.css({'background': arr[num % 3]});
            aLi.eq(num % 3).fadeIn(1000);
        };
        aSlili.mouseover(function () {
            var $this = $(this);
            num = aSlili.index($this);
            num--;
            move();
        });
        /*添加交互*/
        DataHover(oBar);
        //DataHover(oPrev);
        function DataHover(obj) {
            obj.hover(function () {
                $(oNext).css({'opacity': 100, 'filter': 'alpha(opacity=100)'});
                $(oPrev).css({'opacity': 100, 'filter': 'alpha(opacity=100)'})
            }, function () {
                $(oNext).css({'opacity': 0, 'filter': 'alpha(opacity=0)'});
                $(oPrev).css({'opacity': 0, 'filter': 'alpha(opacity=0)'})
            });
        }

        oNext.mousedown(function () {
            $(this).css({'backgroundPosition': '-800px -80px'});
            move();
            $(this).mouseup(
                function () {
                    $(this).css({'backgroundPosition': '-600px 0'});
                }
            )
        });
        oPrev.mousedown(function () {
            $(this).css({'backgroundPosition': '-798px 0px'});
            num--;
            if (num < 0) {
                num = 2;
            }
            aSlili.removeClass('ac');
            aSlili.eq(num % 3).addClass('ac');
            aLi.css({'display': 'none'});
            //alert(num%3);
            aLi.eq(num % 3).fadeIn(1000);
            $(this).mouseup(
                function () {
                    $(this).css({'backgroundPosition': '-558px 0'});
                }
            )
        });
        //自动轮播
        /*timer = setInterval(function(){
         move();
         },2000);
         */
        /*oBar.hover(function(){
         clearInterval(timer);
         oNext.removeClass('hide');
         oPrev.removeClass('hide');
         },function(){
         oNext.addClass('hide');
         oPrev.addClass('hide');
         timer = setInterval(function(){
         move();
         },1500);
         });*/
    }
});

$('.bannerWrap').rIndexCarousel();
