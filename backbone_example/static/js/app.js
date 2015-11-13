(function(){
    window.Tweet = Backbone.Model.extend({
        urlRoot: TWEET_API
    });

    window.Predict = Backbone.Model.extend({
        urlRoot: PREDICT_API
    });

    window.Tweets = Backbone.Collection.extend({
        urlRoot: TWEET_API,
        model: Tweet, 

        maybeFetch: function(options){
            // Helper function to fetch only if this collection has not been fetched before.
            if(this._fetched){
                // If this has already been fetched, call the success, if it exists
                options.success && options.success();
                return;
            }

            // when the original success function completes mark this collection as fetched
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success && success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, options){
            // Helper function to use this collection as a cache for models on the server
            var model = this.get(id);

            if(model){
                options.success && options.success(model);
                return;
            }

            model = new Tweet({
                resource_uri: id
            });

            model.fetch(options);
        }
        

    });

    window.Predicts = Backbone.Collection.extend({
        urlRoot: PREDICT_API,
        model: Predict, 

        maybeFetch: function(options){
            // Helper function to fetch only if this collection has not been fetched before.
            if(this._fetched){
                // If this has already been fetched, call the success, if it exists
                options.success && options.success();
                return;
            }

            // when the original success function completes mark this collection as fetched
            var self = this,
                successWrapper = function(success){
                    return function(){
                        self._fetched = true;
                        success && success.apply(this, arguments);
                    };
                };
            options.success = successWrapper(options.success);
            this.fetch(options);
        },

        getOrFetch: function(id, options){
            // Helper function to use this collection as a cache for models on the server
            var model = this.get(id);

            if(model){
                options.success && options.success(model);
                return;
            }

            model = new Predict({
                resource_uri: id
            });

            model.fetch(options);
        }
    });

    window.TweetView = Backbone.View.extend({
        tagName: 'li',
        className: 'tweet',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ich.tweetTemplate(this.model.toJSON()));
            return this;
        }                                        
    });

    window.PredictView = Backbone.View.extend({
        tagName: 'li',
        className: 'predict',

        events: {
            'click .permalink': 'navigate'           
        },

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        navigate: function(e){
            this.trigger('navigate', this.model);
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ich.predictTemplate(this.model.toJSON()));
            return this;
        }                                        
    });

    window.DetailApp = Backbone.View.extend({
        events: {
            'click .home': 'home'
        },
        
        home: function(e){
            this.trigger('home');
            e.preventDefault();
        },

        render: function(){
            $(this.el).html(ich.detailApp(this.model.toJSON()));
            return this;
        }                                        
    });

    window.InputView = Backbone.View.extend({
        events: {
            'click .tweet': 'createTweet',
            'keypress #message': 'createOnEnter'
        },

        createOnEnter: function(e){
            if((e.keyCode || e.which) == 13){
                this.createTweet();
                e.preventDefault();
            }

        },

        createTweet: function(){
            var message = this.$('#message').val();
            if(message){
                this.collection.create({
                    message: message
                });
                this.$('#message').val('');
            }
        }

    });

    window.ListView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(tweet){
            var view = new TweetView({
                model: tweet
            });
            $(this.el).prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        }

    });

    window.PredictListView = Backbone.View.extend({
        initialize: function(){
            _.bindAll(this, 'addOne', 'addAll');

            this.collection.bind('add', this.addOne);
            this.collection.bind('reset', this.addAll, this);
            this.views = [];
        },

        addAll: function(){
            this.views = [];
            this.collection.each(this.addOne);
        },

        addOne: function(predict){
            var view = new PredictView({
                model: predict
            });
            $(this.el).prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        }

    });

    window.ListApp = Backbone.View.extend({
        el: "#app",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html(ich.listApp({}));
            var list = new ListView({
                collection: this.collection,
                el: this.$('#tweets')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
            new InputView({
                collection: this.collection,
                el: this.$('#input')
            });
        }        
    });

    window.PredictListApp = Backbone.View.extend({
        el: "#predictapp",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html(ich.predictlistApp({}));
            var list = new PredictListView({
                collection: this.collection,
                el: this.$('#predicts')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
        }        
    });

    
    window.Router = Backbone.Router.extend({
        routes: {
            '': 'list',
            ':id/': 'detail'
        },

        navigate_to: function(model){
            var path = (model && model.get('id') + '/') || '';
            this.navigate(path, true);
        },

        detail: function(){},

        list: function(){}
    });

    window.onload = function () {
            var dps = []; // dataPoints
            var predicts = new Predicts();
            var chart = new CanvasJS.Chart("chartContainer", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event Number Analytics"              
            },
            animationEnabled: false,   // change to true
            data: [              
                {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                { label: "December",  y: 10  },
                { label: "November", y: 15  },
                { label: "October", y: 25  },
                { label: "September",  y: 30  },
                { label: "August",  y: 28  }
                ]
                }
            ]
            });


            var chart2 = new CanvasJS.Chart("chartContainerbudget", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event budget Analytics"              
            },
            animationEnabled: false,   // change to true
            axisX: {
                    title: "Event number",
            },
            axisY: {
                    title: "Event budget",
            },
            data: [{
                type: "line",
                dataPoints: dps
            }]
            });

            var updateChart2 = function () {
                predicts.fetch({
                    data: { limit : 5000 },
                    success: function(predicts, rawresponse){
                        for (predict in rawresponse['objects']){
                            console.log("success")
                            budget = rawresponse['objects'][predict]['budget'];
                            seq = rawresponse['objects'][predict]['seq']
                            dps.push({
                                    x: seq,
                                    y: budget
                            })
                            if(dps.length > 3100){
                                chart2.render();
                            }
                        }
                    }
                });    
                chart2.render();
            };

            chart.render();
            updateChart2();
    }

    $(function(){
        window.app = window.app || {};
        app.router = new Router();
        app.tweets = new Tweets();
        app.predicts = new Predicts();
        app.predictlist = new PredictListApp({
            el: $('#predictapp'),
            collection: app.predicts
        });
        app.list = new ListApp({
            el: $("#app"),
            collection: app.tweets
        });
        app.detail = new DetailApp({
            el: $("#app")
        });
        app.router.bind('route:list', function(){
            app.tweets.maybeFetch({
                success: _.bind(app.list.render, app.list)                
            });
            app.predicts.maybeFetch({
                success: _.bind(app.predictlist.render, app.predictlist)
            });
        });
        app.router.bind('route:detail', function(id){
            app.tweets.getOrFetch(app.tweets.urlRoot + id + '/', {
                success: function(model){
                    app.detail.model = model;
                    app.detail.render();                    
                }
            });
        });

        app.list.bind('navigate', app.router.navigate_to, app.router);
        app.detail.bind('home', app.router.navigate_to, app.router);
        Backbone.history.start({
            pushState: true, 
            silent: app.loaded
        });
    });
})();