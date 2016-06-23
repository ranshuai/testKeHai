/*顶部导航*/

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
require('./site/siteHeader');
/*搜索框*/
require('./site/siteSearch');
/*导航*/
require('./site/siteNav');
/*所选分类*/
require('./list/listSiteCourseClassify');
 /*学校列表内容*/
require('./list/listSite');
/*大家都在学*/
require('./list/c_listSiteAllStudied');
/*帮助*/
require('./site/siteHelp');
/*底部*/
require('./site/siteFooter');

$(function(){
    $('#mainNavBarMenu').addClass('hide');
    $('#siteNav .school_mainNav').removeClass('n_border_b');
});

