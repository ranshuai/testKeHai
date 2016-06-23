require('../../css/site/siteSubsidiaryBanner.css');
var template = require("../../template/site/siteSubsidiarybanner.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteSubsidiaryBanner').innerHTML = html;