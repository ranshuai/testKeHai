
require('../../css/site/siteHelp.css');

var template = require("../../template/site/siteHelp.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteHelp').innerHTML = html;