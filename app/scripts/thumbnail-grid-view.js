// Thumbnail Grid View

'use strict';

console.log('Thumbnail Grid View Script Loaded');

var ThumbnailView = Backbone.View.extend({

    className: 'thumbnail',

    template: _.template($('.thumbnail-template').text()),

    events: {
        'click' : 'showDetailView',
    },

    initialize: function(){

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);

        // this.listenTo(this.model, 'add', function(photo){
        //     new Photo({model: photo});
        // });

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