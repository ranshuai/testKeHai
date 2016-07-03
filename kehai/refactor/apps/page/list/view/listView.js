
var backbone = require('require');
var listViewTemplate = require('../template/listViewTemplate.hbs');
var ListView = Backbone.View.extend({
    tagName:'div',
    template:listViewTemplate,
    initialize:function(){
        this.render();
    },
    render:function(){
        this.$el.html(this.template());
    }
});

module.expors = ListView;