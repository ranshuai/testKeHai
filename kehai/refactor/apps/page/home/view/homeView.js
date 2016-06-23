import Backbone from 'backbone';
import IndexDataSubscribe from '../collection/indexDataSubscribe';
import CourseCollction from '../collection/courseCollction';
import EvaluateCollction from '../collection/evaluateCollction';
import EvaluateView from './evaluateView';
import RecommendView from './recommendView';

var homeTmpl = require('../tmpl/home.hbs');

var HomeView = Backbone.View.extend({
    el: "#mainBox",

    template: homeTmpl,

    initialize: function () {
        this.collection = new IndexDataSubscribe();
        this.collection.on('indexData:load',function (response) {
            this.render(response);
        },this);
    },

    renderRecommendCourse: function (item) {
        var recommendView = new RecommendView({
            model: item
        });
        return recommendView.render().el;
    },

    renderCourseTab: function (courses, id) {
        var courseCollction = new CourseCollction(courses);
        courseCollction.each(function (model) {
            this.$(id).append(this.renderRecommendCourse(model));
        }, this)
    },


    renderEvaluate: function (item) {
        var evaluateView = new EvaluateView({
            model: item
        });
        return evaluateView.render().el;
    },

    renderEvaluateArea: function (todayCours, id) {
        var evaluateCollction = new EvaluateCollction(todayCours);
        evaluateCollction.each(function (model) {
            this.$(id).append(this.renderEvaluate(model));
        }, this)
    },

    broadcast: function (response) {
        if (response) {
            this.renderCourseTab(response.terdayCour.data, '#recommend');
            this.renderCourseTab(response.goodCour.data, '#goodCour');
            this.renderCourseTab(response.onetooneCour.data, '#onetooneCour');
            this.renderEvaluateArea(response.evaluate.data, '#evaluate');
        }
    },

    render: function (responseData) {
        this.broadcast(responseData);
    }
});

export default HomeView;