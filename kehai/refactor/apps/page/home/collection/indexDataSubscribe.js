import Backbone from 'backbone';
import utils from 'helper/utils';

var IndexDataSubscribe = Backbone.Collection.extend({
    url: '/apps/data/loadIndexData.json',

    initialize: function () {
        var self = this;
        this.fetch({
            reset: true,
            success: function (collection, response, options) {
                utils.checkReponse(response, function (status) {
                    if (status === 'success') {
                        self.trigger('indexData:load', response.data);
                    } else {
                        console.log('error');
                    }
                });
            },
            error: function () {
                console.error('load error');
            }
        });
    }
});

export default IndexDataSubscribe;

