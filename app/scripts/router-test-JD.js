"use strict";

var App = Backbone.Router.extend({
	routes: {
		""				: "renderHome",
		"home"			: "renderHome",
		"new_image"		: "newImage",
		"details/:id"	: "renderThumbnail"
	},

	initialize: function () {

		PhotoGallery.collections.photoGallery = new PhotoGallery.Collections.PhotoCollection();
		PhotoGallery.collections.photoGallery.fetch().done( function () {
			Backbone.history.start();
		});

		this.listenTo(PhotoGallery.collections.photoGallery, 'add', function (picture) {
				PhotoGallery.views.thumbnail = new PhotoGallery.Views.ThumbnailView({model:picture});
		});

		PhotoGallery.models.blankPhoto = new PhotoGallery.Models.Photo();
		PhotoGallery.views.details = new PhotoGallery.Views.DetailView({model: PhotoGallery.models.blankPhoto});
	},

	renderHome: function () {
		PhotoGallery.views.details.remove();
		PhotoGallery.views.details = new PhotoGallery.Views.DetailView({model: PhotoGallery.models.blankPhoto});
	},

	newImage: function () {
		PhotoGallery.views.details.remove();
		PhotoGallery.views.details = new PhotoGallery.Views.DetailView({model: PhotoGallery.models.blankPhoto});
		PhotoGallery.views.details.newPicture();
	},

	renderThumbnail: function (id) {
		PhotoGallery.views.details.remove();
		var photoModel = PhotoGallery.collections.photoGallery.get(id);
		PhotoGallery.views.details = new PhotoGallery.Views.DetailView({model: photoModel});
	}
})