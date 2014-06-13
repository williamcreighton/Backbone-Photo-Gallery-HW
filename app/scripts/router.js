'use strict';

var detailViewInstance = new DetailView(this.model);
 
console.log('router script loaded')

var AppRouter = Backbone.Router.extend({
 
    routes: {
        ''                           : 'renderHome',
        'photo/:id'                  : 'renderDetailViewID'
    },
 
    initialize: function() {
        console.log('Router initialization confirmed');
     
        window.photos = new PhotoCollection();

        this.fetchPromise = photos.fetch();

        console.log(this.fetchPromise)
        // console.log(photos)

    
        this.fetchPromise.done(function(){
            photos.each(function(photo){
                new ThumbnailView({model: photo});
            });
            window.detailViewInstance = new DetailView({ model: photos.first() });
        });
        
        console.log('Router initialization finished');
    },



    // renderDetailView: function() {
    //     this.fetchPromise.done(function() {
    //         detailViewInstance.remove();
    //         detailViewInstance = new DetailView({ model: photos.first() });
    //     });
    // },

    // renderPlayers: function () {
    //     $('.detail-image').attr('src','http://placehold.it/334x226');
    //     console.log('render players works');
        
    // },


    renderDetailViewID: function(id) {
        console.log(id)
        var photos = this.fetchPromise;
        console.log(photos)

    }
});

var appRouter = new AppRouter();
Backbone.history.start();