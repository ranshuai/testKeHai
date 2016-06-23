import Backbone from 'backbone';
import CourseModel from '../model/courseModel';

var CourseCollction = Backbone.Collection.extend({
    model: CourseModel,

    initialize: function () {

    },

    parse: function (response) {

    }
});

export default CourseCollction;

