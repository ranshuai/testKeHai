/**
 * Created by bbb on 2015/12/7.
 */
define(['jquery','common','headerDo','base'],function($,common,headerDo){
    function siteTopBar(){
    }
    siteTopBar.prototype._init = function () {
        var t = this;
        
        headerDo.init();

        // if (account!='') {
        //     headerDo.init();
        // } else {
        //     $('.tabRole').addClass('hide');
        // }
    };
    siteTopBar.prototype.render = function () {
        this._init();
    };
    return siteTopBar;
});