(function(){
    window.Tweet = Backbone.Model.extend({
        urlRoot: TWEET_API
    });

    window.Predict = Backbone.Model.extend({
        urlRoot: PREDICT_API
    });

    window.Face = Backbone.Model.extend({
        urlRoot: FACE_API
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

    window.Faces = Backbone.Collection.extend({
        urlRoot: FACE_API,
        model: Face, 

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

    window.FaceView = Backbone.View.extend({
        tagName: 'li',
        className: 'face',

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
            $(this.el).html(ich.faceTemplate(this.model.toJSON()));
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

    window.algorithmView = Backbone.View.extend({
        events : {
            'click .data' : 'uploadData'
        },

        uploadData: function(e){
            data = new Predict({
                resource_uri: '/api/v1/predict/dataload'
            });

            data.fetch({
                success: function(){
                    console.log("data upload success")
                },
                error : function(){
                    console.log("error")
                }
            });
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
            console.log("create")
            var message = this.$('#message').val();
            if(message){
                this.collection.create({
                    message: message
                });
                this.$('#message').val('');
            }
        }
    });

    window.faceInputView = Backbone.View.extend({
        events: {
            'click .face': 'createFace',
            'keypress #img': 'createOnEnter'
        },

        createOnEnter: function(e){
            console.log("Helper")
            if((e.keyCode || e.which) == 13){
                this.createFace();
                e.preventDefault();
            }

        },

        createFace: function(){
            console.log("sdsa")
            var img = this.$('#img').val();
            console.log(img)
            if(img){
                this.collection.create({
                    img: img
                });
                this.$('#img').val('');
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

    window.FaceListView = Backbone.View.extend({
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

        addOne: function(face){
            var view = new FaceView({
                model: face
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
            new algorithmView({
                collection: this.collection,
                el: this.$('#input')
            });
        }        
    });

    window.FaceListApp = Backbone.View.extend({
        el: "#faceapp",

        rethrow: function(){
            this.trigger.apply(this, arguments);
        },

        render: function(){
            $(this.el).html(ich.facelistApp({}));
            var list = new FaceListView({
                collection: this.collection,
                el: this.$('#faces')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
            new faceInputView({
                collection: this.collection,
                el: this.$('#input')
            });
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
            text: "XinViteer Data Engine Summarize"              
            },
            animationEnabled: false,   // change to true
            data: [              
                {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                { label: "Event Type",  y: 15  },
                { label: "Location", y: 7  },
                { label: "Average Score", y: 25  },
                { label: "Average Bonus",  y: 30  },
                { label: "Average Volunteer Number",  y: 13  }
                ]
                }
            ]
            });


            var chart2 = new CanvasJS.Chart("chartContainerbudget", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event Budget Predict"              
            },
            animationEnabled: false,   // change to true
            axisX: {
                    title: "Volunteer Number",
            },
            axisY: {
                    title: "Predict Event budget",
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

            var chart3 = new CanvasJS.Chart("chartContainervolunteer", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Volunteer Number Predict"              
            },
            animationEnabled: false,   // change to true
            axisX: {
                    title: "Location",
            },
            axisY: {
                    title: "Predict Volunteer Number",
            },
            data: [{
                type: "column",
                dataPoints: dps
            }]
            });

            var updateChart3 = function () {
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
                            if(dps.length > 6200){
                                chart3.render();
                            }
                        }
                    }
                });    
                chart3.render();
            };

            var chart4 = new CanvasJS.Chart("chartContainerlocation", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event Location Distribution"              
            },
            animationEnabled: false,   // change to true
            data: [              
                {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "pie",
                dataPoints: [
                { label: "Vancouver",  y: 22  },
                { label: "Burnaby", y: 17  },
                { label: "Richmond", y: 33  },
                { label: "West Vancouver",  y: 3  },
                { label: "North Vancouver",  y: 19  },
                { label: "Coquitlam",  y: 44 },
                { label: "Langley",  y: 50  }
                ]
                }
            ]
            });

            var chart5 = new CanvasJS.Chart("chartContainereventtype",
            {
                title:{
                    text: "XinViteer Event Type Distribution"
                },

                data: [
                {
                type: "doughnut",
                showInLegend: true,
                dataPoints: [
                    {  y: 53.37, legendText:"Contest 53%", indexLabel: "Contest 53%" },
                    {  y: 35.0, legendText:"Fundraising 35%", indexLabel: "Fundraising 35%" },
                    {  y: 7, legendText:"Festival 7%", indexLabel: "Festival 7%" },
                    {  y: 2, legendText:"Childcare 2%", indexLabel: "Childcare 2%" },
                    {  y: 5, legendText:"Others 5%", indexLabel: "Others 5%" }
                ]
            }
            ]
        });

            chart.render();
            updateChart2();
            updateChart3();
            chart4.render();
            chart5.render();
    }

    $(function(){
        window.app = window.app || {};
        app.router = new Router();
        app.tweets = new Tweets();
        app.predicts = new Predicts();
        app.faces = new Faces();
        app.facelist = new FaceListApp({
            el: $('#faceapp'),
            collection: app.faces
        });
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
            app.faces.maybeFetch({
                success: _.bind(app.facelist.render, app.facelist)
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