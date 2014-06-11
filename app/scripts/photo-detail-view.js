// Detail View

'use strict';

var DetailView = Backbone.View.extend({

    className: 'detail-view',

    template: _.template($('.detail-view-template').text()),

    events: {
        'click .save-button'    : 'updatePhotoModel',
        'click .delete-button'  : 'deletePhotoModel',
        'click .new-button'     : 'createNewPhotoModel'
    },

    initialize: function(){
        this.listenTo(photos, 'add', function(photo){
            new ThumbnailView({model: photo});
        });

        this.listenTo(this.model, 'change', this.render);

        $('.detail-container').append(this.el);
        this.render();
    },

    render: function(){

        var renderedTemplate = this.template(this.model.attributes);
        this.$el.html(renderedTemplate);
        return this;
    },

    updatePhotoModel: function(){

        this.model.set({
            url:          this.$el.find('.url-input').val(),
            name:         this.$el.find('.name-input').val(),
            position:     this.$el.find('.position-input').val(),
            squadNumber:  this.$el.find('.squadNumber-input').val(),
            clubTeam:     this.$el.find('.clubTeam-input').val()
        });

        photos.add(this.model);

        this.model.save().done(function(){
            that.$el.find('.new-button').html('Saved!');
            console.log('you suck!');
        });
    },

    deletePhotoModel: function(){
        
        this.model.destroy();
        this.remove();

    },

    createNewPhotoModel: function(){

        var that = this;

        this.model.set({
            url:          this.$el.find('.url-input').val(),
            name:         this.$el.find('.name-input').val(),
            position:     this.$el.find('.position-input').val(),
            squadNumber:  this.$el.find('.squadNumber-input').val(),
            clubTeam:     this.$el.find('.clubTeam-input').val()
        });

        photos.add(this.model);

        this.model.save().done(function(){
        });
    }
});