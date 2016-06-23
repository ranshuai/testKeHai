
require('../../css/list/listSiteCourseClassify.css');

var template = require('../../template/list/listSiteCourseClassify.html');
var data = {say_hello:"it is handlebars"};
var html = template(data);
document.getElementById('listSiteCourseClassify').innerHTML = html;


