"use strict";

// Model
var Photo = Backbone.Model.extend({
  
	defaults: {
			url: '',
			name: '',
			position: '',
			squadNumber: '',
			clubTeam: ''
	},

		idAttribute: "_id"
	});

// Collection
var PhotoCollection = Backbone.Collection.extend({
	model: Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/WHC-Picture-Gallery'
});

// Thumbnail View
var ThumbnailView = Backbone.View.extend({

	className: 'thumbnail',

	template: _.template($('.thumbnail-template').text()),

	events: {
		"click" : "showDetailView"
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
		console.log('should render a new DetailView');
		detailViewInstance.remove();
		detailViewInstance = new DetailView({model: this.model});
	}



});

// Detail View
var DetailView = Backbone.View.extend({

	className: 'detail-view',

	template: _.template($('.detail-view-template').text()),

	events: {
		"click .save-button"	: "updateModel",
		"click .new-button"		: "createPhoto",
		"click .delete-button"  : "destroy"
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

	updateModel: function(){

		var that = this;

		this.model.set({
			url:      		this.$el.find('.url-input').val(),
			name:  			this.$el.find('.name-input').val(),
			position:  		this.$el.find('.position-input').val(),
			squadNumber:  	this.$el.find('.squadNumber-input').val(),
			clubTeam:  		this.$el.find('.clubTeam-input').val()
		});

		photos.add(this.model)

    // this.model.save().done(function(){
    //   that.$el.find('.status').html('Saved!')
    // })

		$('.position-input').val('');
	},

  // createPhoto: function(){

  //   var photoInstance = new Photo();

  //   this.model = photoInstance

  //   this.$el.find('input').val('');
  //   this.$el.find('img').attr('src',' http://placehold.it/350x400');

  // },

	destroy: function(){
		this.model.destroy();
		this.remove();
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