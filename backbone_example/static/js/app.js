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

    window.Stat = Backbone.Model.extend({
        urlRoot: STAT_API
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

            model = new Face({
                resource_uri: id
            });

            model.fetch(options);
        }
    });

    window.Stats = Backbone.Collection.extend({
        urlRoot: STAT_API,
        model: Stat, 

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

            model = new Stat({
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
        tagName: 'tr',
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
            'click .data' : 'uploadData',
            'click .show' : 'show'
        },

        show: function(e){
            var windows = this.$('#window');
            console.log(windows)
            windows.show();
        },

        uploadData: function(e){
            console.log("Apply Models")
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

    window.Similarity = Backbone.Model.extend({
        urlRoot: '/api/v1/face/imageupload',

        defaults: {
            id : "Not specified",
            similar: "Not specified"
        }
    });

    window.Similarities = Backbone.Collection.extend({
        urlRoot: '/api/v1/face/imageupload',
        model: Similarity
    });

    window.faceInputView = Backbone.View.extend({
        events: {
            // 'click .face': 'createFace',
            // 'keypress #img': 'createOnEnter',
            'submit form' : 'onFormSubmit'
        },

        createFace: function(img){
            // tests = new Similarities()
            if(img){
                img = img.split(",")
                for(i in img){
                    var temp_similarity = img[i]
                    this.testloop(parseInt(i) + 1, temp_similarity)
                }
                // console.log(tests)
                this.$('#img').val('');
            }
        },

        testloop: function(i, temp_similarity){
            var image_add = new Similarity();
            // console.log(image_add)
            image_add.set({ id : i, similar: temp_similarity})
            image_add.save()
            this.collection.add(image_add)

        },

        onFormSubmit: function(e) {
            var img = 0;
            e.preventDefault();
            image = new Similarity({
            });

            // var file = this.$('#img').val();
            // console.log(file)

            // console.log(this.$('#img').files)

            // var form = this.$('form').val();
            // console.log(form)

            // var values = {};

            if(e){ e.preventDefault(); }

            _.each(this.$('#form').serializeArray(), function(input){
                values[ input.name ] = input.value;
                console.log(values)
            })

            image.fetch({
                async:false,
                success: function(rawresponse){
                    // console.log(rawresponse)
                    for (similarity in rawresponse){
                            if(similarity == "attributes"){
                                img = rawresponse[similarity]['similarity'];
                            }
                    }   
                },
                error : function(){
                    console.log("error")
                }
            });
            this.createFace(img)
        },


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
        tagName: 'tbody',

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
            var similarities = new Similarities();
            // var test = new Similarity();
            // similarities.add(test)
            var list = new FaceTestListView({
                collection: similarities,
                // collection: this.collection,
                el: this.$('#faces')
            });
            list.addAll();
            list.bind('all', this.rethrow, this);
            new faceInputView({
                collection: similarities,
                el: this.$('#input')
            });
        }        
    });

    window.FaceTestListView = Backbone.View.extend({
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

        addOne: function(similarity){
            var view = new FaceTestView({
                model: similarity
            });
            $(this.el).prepend(view.render().el);
            this.views.push(view);
            view.bind('all', this.rethrow, this);
        },

        rethrow: function(){
            this.trigger.apply(this, arguments);
        }
    });

    window.FaceTestView = Backbone.View.extend({
        tagName: 'li',
        className: 'face',

        initialize: function(){
            this.model.bind('change', this.render, this);
        },

        render: function(){
            $(this.el).html(ich.faceTemplate(this.model.toJSON()));
            return this;
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

    $(window).on("load", function () {
            var dps = []; // dataPoints
            var vdps = [];
            var stat_dps = [];
            var month_dps = [];
            var predicts = new Predicts();
            var stats = new Stats();
            CanvasJS.addColorSet("greenShades",
            [
                "#2E8B57",
                "#2F4F4F",
                "#008080",
                "#3CB371",
                "#90EE90"                
            ]);

            var chart = new CanvasJS.Chart("chartContainer", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Data Engine Summarize"              
            },
            colorSet: "greenShades",
            animationEnabled: false,   // change to true
            data: [              
                {
                // Change type to "bar", "area", "spline", "pie",etc.
                type: "column",
                dataPoints: [
                { label: "Event Type",  y: 37  },
                { label: "Location", y: 9  },
                { label: "Average Volunteer Number",  y: 25  }
                ]
                }
            ]
            });

            var chartsub = new CanvasJS.Chart("chartContainersub", {
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
                { label: "Events", y: 3152},
                { label: "Average Participation ", y: 311  },
                { label: "Average Event Budget",  y: 2525  },
                ]
                }
            ]
            });

            var chart2 = new CanvasJS.Chart("chartContainerbudget", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event Budget Predict"              
            },
            animationEnabled: false,
            interactivityEnabled: true,
            axisX: {
                    title: "Event",
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
                            // console.log("success")
                            predicted_budget = rawresponse['objects'][predict]['predicted_budget'];
                            seq = rawresponse['objects'][predict]['seq']
                            dps.push({
                                    x: seq,
                                    y: predicted_budget
                            })
                            if(dps.length >= 1230){
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
                    title: "Event",
            },
            axisY: {
                    title: "Predict Volunteer Number",
            },
            data: [{
                type: "scatter",
                dataPoints: vdps
            }]
            });

            var updateChart3 = function () {
                predicts.fetch({
                    data: { limit : 5000 },
                    success: function(predicts, rawresponse){
                        for (predict in rawresponse['objects']){
                            predicted_volunteer_number = rawresponse['objects'][predict]['predicted_volunteer_number'];
                            // console.log(predicted_budget)
                            seq = rawresponse['objects'][predict]['seq']
                            // console.log(seq)
                            vdps.push({
                                    x: seq,
                                    y: predicted_volunteer_number
                            })
                            if(vdps.length >= 1230){
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
                showInLegend: true,
                toolTipContent: "{legendText} - {y} events - <strong>#percent%</strong>",
                dataPoints: stat_dps
                }

            ]
            });

            var updateChart4 = function () {
                stats.fetch({
                    data: { limit : 5000 },
                    success: function(predicts, rawresponse){
                        for (stat in rawresponse['objects']){
                            // console.log("success")
                            geo_location = rawresponse['objects'][stat]['geo_location'];
                            // console.log(geo_location)
                            event_number = rawresponse['objects'][stat]['event_number']
                            // console.log(event_number)
                            if(geo_location != "test"){
                                stat_dps.push({
                                        label: geo_location,
                                        legendText: geo_location,
                                        y: event_number
                                })
                                chart4.render();
                            }
                        }
                    }
                });    
                chart4.render();
            };

            var chart5 = new CanvasJS.Chart("chartContainermonth", {
            theme: "theme1",//theme1
            title:{
            text: "XinViteer Event Month Distribution"              
            },
            axisY: {
                title: "Events"
            },
            animationEnabled: false,   // change to true
            data: [              
                {
                type: "bar",
                toolTipContent: "{y} events",
                dataPoints: month_dps
                }
            ]
            });

            var updateChart5 = function () {
                stats.fetch({
                    data: { limit : 5000 },
                    success: function(predicts, rawresponse){
                        for (stat in rawresponse['objects']){
                            // console.log("success")
                            month = rawresponse['objects'][stat]['month'];
                            month_event_number = rawresponse['objects'][stat]['month_event_number']
                            if(month != "test" && month_event_number != 0){
                                month_dps.push({
                                        label: month.substring(0,3),
                                        y: month_event_number
                                })
                                chart5.render();
                            }
                        }
                    }
                });    
                chart5.render();
            };

            chart.render();
            chartsub.render();
            updateChart2();
            updateChart3();
            updateChart4();
            updateChart5();
    });

    $('table').footable({
        breakpoints: {
        }
    });

    $(function(){
        window.app = window.app || {};
        app.router = new Router();
        app.tweets = new Tweets();
        app.predicts = new Predicts();
        app.faces = new Faces();
        // app.similarities = new Similarities();
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
                success: _.bind(app.predictlist.render, app.predictlist),
                data: {offset: 0, limit:5},
                add: true
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