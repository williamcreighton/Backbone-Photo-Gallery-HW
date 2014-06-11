// Model

var Photo = Backbone.Model.extend({
  
	defaults: {
			url: 'http://placehold.it/334x226',
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