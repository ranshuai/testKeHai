
require('../../css/site/siteJoinOrganizations.css');

var template = require("../../template/site/siteJoinOrganizations.html");
var data = {say_hello: "it is handlebars"};
var html = template(data);
document.getElementById('siteJoinOrganizations').innerHTML = html;

var enterOrganization = require('../../model/site/siteJoinOrganizationsGet');

enterOrganization.Organization();