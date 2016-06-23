/*轮播图模板*/
require('../../../css/site/homeBanner.css');

var template = require("./templates/homeBanners.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
 document.getElementById('siteCarousel').innerHTML = html;

var homeView = require('./views/homeCarouselView');
//首页轮播图
var homeCarouselV = new homeView.homeBannerV();

