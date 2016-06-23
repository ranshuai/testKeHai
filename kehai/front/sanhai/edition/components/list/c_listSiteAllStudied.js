
require('../../css/list/c_listSiteAllStudied.css');

var template = require("../../template/list/c_listSiteAllStudied.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('c_listSiteAllStudied').innerHTML = html;