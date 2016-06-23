
if(!Array.indexOf)
{
	Array.prototype.indexOf = function(obj)
	{
		for(var i=0; i<this.length; i++)
		{
			if(this[i]==obj)
			{
				return i;
			}
		}
		return -1;
	}
}


var Backbone = require('backbone');
require('css/base.css');
require('css/site/siteHeader.css');

var template = require("../../template/site/siteHeader.html");
var data={say_hello:"it is handlebars"};
var html = template(data);
document.getElementById('siteHeader').innerHTML = html;
/*****************************************************************/
var siteHeader =  require('../../model/site/siteHeaderGet.js');
window.account = '';
siteHeader.judgeLogin(loginState);

 function loginState(res){

	if(res.data.userIdentity == 2){
		account = res.data.name;
	}else if(res.data.userIdentity == 0){
		 account = res.data.name || res.data.account;
	 }else if(res.data.userIdentity == 3){
		account = res.data.name || res.data.account;
	}

	var M = Backbone.Model.extend({
		defaults : account ? {"user":account,"state":"退出","login":"/profile.htm","linkState":"/logout.htm"} :
		{"user":"请登录","state":"注册","login":"/login.htm","linkState":"/reg/register.htm"}
	});

	var V = Backbone.View.extend({
		initialize : function(){
			$('.loginState').append( this.template(this.model.toJSON()));
		},
		show : function(model){
		},
		template: _.template($('#template').html())
	});

	var m = new M;
	var v = new V({model:m});
}
/*****************************************************************/
var changeIdentityh = require('../../model/site/changeIdentity');
changeIdentityh();
/*****************************************************************/

$.fn.extend({
	'rNavhover': function () {
		$(this).hover(function () {
			var $this = $(this);
			$this.children('ul').removeClass('hide');
		}, function () {
			var $this = $(this);
			$this.children('ul').addClass('hide');
		});
	}
});

$('.serviceList').rNavhover();
$('.tabRole ').rNavhover();