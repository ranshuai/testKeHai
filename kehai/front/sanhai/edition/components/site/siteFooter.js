
require('../../css/site/siteFooter.css');

var template = require("../../template/site/siteFooter.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteFooter').innerHTML = html;