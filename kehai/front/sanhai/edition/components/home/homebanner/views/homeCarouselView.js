/*轮播图视图*/

define(function(){
    // var homeCollection = require('../collections/homeCollection');
    var HomeController = require('../controllers/homeController');
    var template = require("../templates/homeBanners.html");
    var data = {say_hello: "it is handlebars"};
    var html = template(data);


    function HomeView (){}
    /*首页轮播图的视图层*/
    HomeView.prototype.homeBannerV = Backbone.View.extend({
        el:'#siteCarousel',
        events:{
            'mouseenter':'btnShow',
            'mouseleave':'btnHide',
            'click .prevBtn':'moveL',
            'click .nextBtn':'moveR',
            'mouseenter .slidernav_ul li':'moveIndex'
        },
        btnShow:function(){
            this.prevBtn.css('opacity',100);
            this.nextBtn.css('opacity',100);
        },
        btnHide:function(){
            this.prevBtn.css('opacity',0);
            this.nextBtn.css('opacity',0);
        },
        moveL:function(){
            this.num--;
            var index = [this.num%3];
            this.move(index);
        },
        moveR:function(){
            this.num++;
            var index = [this.num%3];
            this.move(index);
        },
        moveIndex:function(e){
            var aLi = $(e.target);
            var aLiIndex = aLi.index();
            this.move(aLiIndex);
        },
        move:function(index){
            this.btnlists.eq(index).addClass('ac')
                .siblings().removeClass('ac');
            this.bannerlists.eq(index).removeClass('hide')
                .siblings().addClass('hide');
        },
        initialize:function(){
            this.collection = HomeController.Banner();
            this.collection.fetch({
                reset:true
            });
            this.observe();
        },
        observe:function(){
            this.listenTo(this.collection,'reset',this.render);
        },
        render:function(){

            // $('#siteCarousel').html(html);
            this.bannerlists = this.$el.find('.bannerlist1');
            this.btnlists = this.$el.find('.slidernav_ul li');
            this.prevBtn = this.$el.find('.prevBtn');
            this.nextBtn  = this.$el.find('.nextBtn ');
            this.num = 0;

            var data = this.collection.models[0].attributes.data.advertisings;
            console.log(data);
            $('#siteCarousel').html(this.template());
            $('#homeSubBanner').html(this.templateSub());
            $('#homeBanner7').html(this.templateTody());
            $('#homeBanner8').html(this.templateGood());
        },

        
        
        template:_.template($('#homeCarousel-template').html()),
        //轮播图下面的广告位
        templateSub:_.template($('#homeSubBanner-template').html()),
        //今日推荐
        templateTody:_.template($('#homeTody-template').html()),
        //热们课程
        templateGood:_.template($('#homeGood-template').html())
    });
    
    return new HomeView();
    
});


