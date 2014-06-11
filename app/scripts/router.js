'use strict';
 
var AppRouter = Backbone.Router.extend({
 
    routes: {
        ''                           : 'renderHome',
        'photo/:id'                  : 'renderPhoto'
    },
 
    initialize: function() {
        console.log('Router initialization confirmed');
     
        this.fetchPromise = photos.fetch();
    
        this.fetchPromise.done(function(){
            photos.each(function(photo){
                new ThumbnailView({model: photo});
            });
            detailViewInstance = new DetailView({ model: photos.first() });
        });
        
        Backbone.history.start();
        console.log('Router initialization finished');
    },



    renderDetailView: function() {
        this.fetchPromise.done(function() {
            detailViewInstance.remove();
            detailViewInstance = new DetailView({ model: photos.first() });
        });
    },



    renderDetailViewID: function(id) {
        this.fetchPromise.done(function() {
            detailViewInstance.remove();
            detailViewInstance = new DetailView({ model: photos.get(id) });
        });
    },



    imageIDRouter: function(idAttribute) {
    },


});