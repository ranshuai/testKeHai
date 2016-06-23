import Backbone from 'backbone';
import $ from 'jquery';
var recommendTmpl = require('../tmpl/recommend.hbs');

var RecommendView = Backbone.View.extend({

    tagName: 'div',

    className: 'course-box',

    template: recommendTmpl,

    events:{
        'click li': 'clickTest',
        'click .delete': 'deleteBook'
    },

    deleteBook: function () {
        this.model.destroy();
        this.remove();
    },

    clickTest: function (event) {
        event.preventDefault();
        var $currentNode = $(event.target);
        console.log($currentNode.text());
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

export default RecommendView;

