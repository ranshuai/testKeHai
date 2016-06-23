
/*控制器*/

define(function(){

    var HomeCollection = require('../collections/homeCollection');

    var HomeController = function(){};
    /*网站首页的广告位控制器*/

    HomeController.prototype.Banner = function(){
        return new HomeCollection.Banner();
    };

    return new HomeController();
});