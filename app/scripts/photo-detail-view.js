// Detail View

'use strict';

console.log('Photo Detail View Script Loaded');

var DetailView = Backbone.View.extend({

    className: 'detail-view',

    template: _.template($('.detail-view-template').text()),

    events: {
        'click .save-button'         : 'updatePhotoModel',
        'click .delete-button'       : 'deletePhotoModel',
        'click .new-button'          : 'createNewPhoto',
        'click .add-player-tab'      : 'clearPlayerInputValues',
        // 'click .detail-view img'     : 'createDetailViewPhotoModal'
    },

    initialize: function(){
        this.listenTo(this.model, 'add', function(photo){
            new ThumbnailView({model: photo});
        });

        this.listenTo(this.model, 'change', this.render);

        $('.detail-container').prepend(this.el);
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

        });
    },

    deletePhotoModel: function(){
        
        this.model.destroy();
        this.remove();
        window.detailViewInstance = new DetailView({model: photos.last()});

    },

    clearPlayerInputValues: function(){

        this.$el.find('img').attr('src','http://placehold.it/334x222');
        this.$el.find('.url-input').val('');
        this.$el.find('.name-input').val('');
        this.$el.find('.position-input').val('');
        this.$el.find('.squadNumber-input').val('');
        this.$el.find('.clubTeam-input').val('');
        $('.player').empty();

    },

    createNewPhoto: function(){
      
        var player = new Photo();

        player.set({
            url:          this.$el.find('.createNewPhoto .url-input').val(),
            name:         this.$el.find('.createNewPhoto .name-input').val(),
            position:     this.$el.find('.createNewPhoto .position-input').val(),
            squadNumber:  this.$el.find('.createNewPhoto .squadNumber-input').val(),
            clubTeam:     this.$el.find('.createNewPhoto .clubTeam-input').val()
        });
      
        photos.add(player);

        player.save().done(function(){
            new ThumbnailView({model:player});
            new DetailView({model: player});

        });

    }

    // createDetailViewPhotoModal: function(){

    // }

});