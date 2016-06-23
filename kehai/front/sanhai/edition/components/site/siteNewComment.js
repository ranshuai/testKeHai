
require('../../css/site/siteNewComment.css');

var template = require("../../template/site/siteNewComment.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteNewComment').innerHTML = html;

var siteNewCommentGet = require('../../model/site/siteNewCommentGet');



siteNewCommentGet.init();