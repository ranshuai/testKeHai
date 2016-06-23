import Backbone from 'backbone';
import EvaluateModel from '../model/evaluateModel';

var EvaluateCollction = Backbone.Collection.extend({
    model: EvaluateModel,

    initialize: function () {

    },

    parse: function (response) {

    }
});

export default EvaluateCollction;

