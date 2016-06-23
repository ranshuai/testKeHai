/**
 * Created by huangjian on 16/6/18.
 */
// require('css/normalize.css');
require('less/home.less');

import Backbone from 'backbone';
// import BackboneAssociations from 'backbone-associations';
import $ from 'jquery';
import HomeView from 'page/home/view/homeView';

console.warn('isDebug:' + __ENV__);

$(document).ready(function () {
    var homeView = new HomeView();
    homeView.render();
});




