var Handlebars = require('handlebars/runtime');
module.exports = function (text, url) {
    text = Handlebars.Utils.escapeExpression(text);
    url  = Handlebars.Utils.escapeExpression(url);

    var host = 'http://kehai.com/site/shool/';
    var nextPage = '/findCourseByorgId.htm';

    var result = '<a target="_blank" href="' + host + url + nextPage + '">' + text + '</a>';

    return new Handlebars.SafeString(result);
};