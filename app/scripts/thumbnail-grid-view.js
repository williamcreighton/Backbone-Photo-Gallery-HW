// Thumbnail Grid View

'use strict';

var ThumbnailView = Backbone.View.extend({

    className: 'thumbnail',

    template: _.template($('.thumbnail-template').text()),

    events: {
        'click' : 'showDetailView'
    },

    initialize: function(){

        this.listenTo(this.model, 'change', this.render);

        $('.thumbnails-container').append(this.el);
        this.render();
    },

    render: function(){
        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
    },

    showDetailView: function(){
        detailViewInstance.remove();
        detailViewInstance = new DetailView({model: this.model});
    }

});