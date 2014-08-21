// Model

'use strict';

console.log('Model and Collection Script Loaded');

var Photo = Backbone.Model.extend({
	
	idAttribute: '_id',
  
	defaults: {
			url: '',
			name: '',
			position: '',
			squadNumber: '',
			clubTeam: ''
		},

	});

// Collection

var PhotoCollection = Backbone.Collection.extend({
	model: Photo,
	url: 'http://tiny-pizza-server.herokuapp.com/collections/WHC-Picture-Gallery'
});