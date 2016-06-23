/**
 * 作者：yinjiaming
 * 创建时间：2016-04-13 18:25
 * 类描述：用户行为数据采集跟踪代码
 * 修改人：
 * 修改时间：
 */

var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
    var u="//kehai.com/pwaction/";
    _paq.push(['setTrackerUrl', u+'piwik.php']);
    _paq.push(['setSiteId', 1]);
    _paq.push(['setUserId', user.userId]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'piwik.js'; s.parentNode.insertBefore(g,s);
})();
