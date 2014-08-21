// Model

'use strict';

console.log('models loaded');

var Photo = Backbone.Model.extend({
  
    defaults: {
            url: '',
            name: '',
            position: '',
            squadNumber: '',
            clubTeam: ''
        },

        idAttribute: '_id'
    });

// Collection

var PhotoCollection = Backbone.Collection.extend({
    model: Photo,
    url: 'http://tiny-pizza-server.herokuapp.com/collections/WHC-Picture-Gallery'
});


// Thumbnail Grid View

console.log('thumbnail view script loaded');

var ThumbnailView = Backbone.View.extend({

    className: 'thumbnail',

    template: _.template($('.thumbnail-template').text()),

    events: {
        'click' : 'showDetailView',
    },

    initialize: function(){

        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);

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


// Detail View

console.log('photo detail view script loaded');

var DetailView = Backbone.View.extend({

    className: 'detail-view',

    template: _.template($('.detail-view-template').text()),

    events: {
        'click .save-button'    : 'updatePhotoModel',
        'click .delete-button'  : 'deletePhotoModel',
        'click .new-button'     : 'createNewPhoto',
        'click .add-player'     : 'clearPlayerInputValues'
    },

    initialize: function(){
        this.listenTo(this.model, 'add', function(photo){
            new ThumbnailView({model: photo});
        });

        this.listenTo(this.model, 'add', function(photo){
            new Photo({model: photo});
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

        // var that = this;

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
        window.detailViewInstance = new DetailView({model: photos.first()});

    },

    clearPlayerInputValues: function(){

        this.$el.find('url-input').val('');
        this.$el.find('img').attr('src','http://placehold.it/334x222');

        $('.url-input').val('');
        $('.name-input').val('');
        $('.position-input').val('');
        $('.squadNumber-input').val('');
        $('.clubTeam-input').val('');
      
    },

    createNewPhoto: function(){
    
        var renderedTemplate = this.templateEdit(this.model.attributes);
        this.$el.html(renderedTemplate);

        var photoInstance = new Photo();
        this.model = photoInstance;

    },

});


// Create New Instances

var photos = new PhotoCollection();
var detailViewInstance;

photos.fetch().done(function(){
    photos.each(function(photo){

        new ThumbnailView({model: photo});

    });

    detailViewInstance = new DetailView({ model: photos.first() });
});