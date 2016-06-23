import Backbone from 'backbone';
var Evaluate = Backbone.Model.extend({
    defaults:{
        evaid: '',
        des: '',
        coursesRecordId: '',
        courseId: '',
        userName: '',
        schoolId: '',
        orderId: '',
        time: '',
        teacherId: '',
        courseName: ''
    },

    initialize: function (response) {
        var evaluateData = this.parseData(response);
        this.set(evaluateData);
    },

    parseData: function (response) {
        var data = {
            evaid:response.evaid,
            des: response.des,
            coursesRecordId: response.coursesRecordId,
            courseId: response.courseId,
            userName: response.userName,
            time: response.time,
            schoolId: response.schoolId,
            orderId: response.orderId,
            teacherId: response.teacherId,
            courseName: response.courseName
        };
        return data;
    }
});

export default Evaluate;