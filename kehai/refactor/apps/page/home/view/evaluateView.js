import Backbone from 'backbone';

var evaluateTmpl = require('../tmpl/evaluate.hbs');


var EvaluateView = Backbone.View.extend({

    tagName: 'li',

    className: 'evaluate-box',

    template: evaluateTmpl,

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }

});

export default EvaluateView;

