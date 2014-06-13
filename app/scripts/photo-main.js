// Create New Instances

'use strict';

console.log('Create New Instances Script Loaded');

var photos = new PhotoCollection();
var detailViewInstance;

photos.fetch().done(function(){
	photos.each(function(photo){

		new ThumbnailView({model: photo});

	});

	detailViewInstance = new DetailView({ model: photos.first() });
});