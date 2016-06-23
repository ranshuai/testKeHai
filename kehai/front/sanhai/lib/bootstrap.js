/**
 * Created by Administrator on 2016/1/6.
 */
define([
    'require',
    'angular',
    'app',
],function(require,angular){
    require(['domReady!'],function(document) {
        angular.bootstrap(document, ['webApp']);
    })
});