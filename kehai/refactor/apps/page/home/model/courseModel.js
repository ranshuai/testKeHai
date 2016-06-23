import Backbone from 'backbone';
var Course = Backbone.Model.extend({
    defaults:{
        courseId: '',
        courseTitle: '',
        advertiseResId: '',
        subject: '',
        price: '',
        detailAddress: '',
        orgId: '',
        orgName: ''
    },

    initialize: function (response) {
        var courseData = this.parseData(response);
        this.set(courseData);
    },

    parseData: function (response) {
        var orgEntity = response.orgEntity;
        var data = {
            courseId:response.courseId,
            courseTitle: response.courseTitle,
            advertiseResId: response.advertiseResId,
            subject: response.subject,
            price: this.changePrice(response.price),
            orgName: orgEntity.orgName,
            orgId: orgEntity.orgId,
            detailAddress: orgEntity.detailAddress
        };
        return data;
    },

    changePrice: function (price) {
        var splitPrice = Math.round(price/100)+'.'+'00';
        return splitPrice;
    }
});

export default Course;