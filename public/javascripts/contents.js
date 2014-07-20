$(function(){
    var Content = Backbone.Model.extend({
        urlRoot: '/contents',
        parse: function(response) {
            response.registerDateTime =  new Date(response.registerDateTime).format("Y-m-d");
            return response;
        }
    });

    var ContentList = Backbone.Collection.extend({
        model: Content,
        url: '/contents'
    });

    var BestContentView = Backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: "div",
        className: "col-lg-4",
        template: _.template('<img class="img-circle" data-src="holder.js/140x140" alt="Generic placeholder image">' +
            '<h2><%=subject%></h2>' +
            '<p><%=contents%></p>' +
            '<p><a class="btn btn-default" href="#" role="button">상세보기</a></p>'),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.data('id', this.model.get('id'));
            return this;
        },
        remove: function(){
            console.log(this.$el);
            this.$el.remove();
        }
    });

    var BestContentListView = Backbone.View.extend({
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },
        tagName: 'div',
        className: "row",
        render: function() {
            this.addAll();
            return this;
        },
        addOne: function(Content){
            var bestContentView = new BestContentView({model: Content});
            bestContentView.render();
            this.$el.append(bestContentView.el);
        },
        addAll: function() {
            this.collection.forEach(this.addOne, this);
            $('#bestContentList').html(this.el);
        }
    });

    var ContentView = Backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: "div",
        className: "row featurette",
        template: _.template('<hr class="featurette-divider">' +
            '<div class="col-md-7">'+
            '<h2 class="featurette-heading"><%=foodType%> <%=subject%></h2>' +
            '<p class="lead"><%=meetingDateTime%>|<%=count%>|<%=isPublicity%></p>' +
            '</div>' +
            '<div class="col-md-5">' +
            '<img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="500x500" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1MDAiIGhlaWdodD0iNTAwIj48cmVjdCB3aWR0aD0iNTAwIiBoZWlnaHQ9IjUwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHRleHQtYW5jaG9yPSJtaWRkbGUiIHg9IjI1MCIgeT0iMjUwIiBzdHlsZT0iZmlsbDojYWFhO2ZvbnQtd2VpZ2h0OmJvbGQ7Zm9udC1zaXplOjMxcHg7Zm9udC1mYW1pbHk6QXJpYWwsSGVsdmV0aWNhLHNhbnMtc2VyaWY7ZG9taW5hbnQtYmFzZWxpbmU6Y2VudHJhbCI+NTAweDUwMDwvdGV4dD48L3N2Zz4=">' +
            '</div>'),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.data('id', this.model.get('id'));
            return this;
        },
        remove: function(){
            console.log(this.$el);
            this.$el.remove();
        }
    });

    var contentListView = Backbone.View.extend({
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },
        tagName: 'div',
        className: "featurette-list",
        render: function() {
            this.addAll();
            return this;
        },
        addOne: function(Content){
            var contentView = new ContentView({model: Content});
            contentView.render();
            this.$el.append(contentView.el);
        },
        addAll: function() {
            this.collection.forEach(this.addOne, this);
            $('#contentList').html(this.el);
        }
    });

    var ContentSlideView = Backbone.View.extend({
        initialize: function(){
            this.model.on('change', this.render, this);
            this.model.on('destroy', this.remove, this);
        },
        tagName: "div",
        className: "item",
        template: _.template('<img data-src="holder.js/900x500/auto/#777:#7a7a7a/text:First slide" alt="First slide" />' +
            '<div class="container">' +
                '<div class="carousel-caption">' +
                    '<h1><%=foodType%> <%=subject%></h1>' +
                    '<p><%=meetingDateTime%>|<%=count%>|<%=isPublicity%></p>' +
                '</div>' +
            '</div>'),
        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.$el.data('id', this.model.get('id'));
            return this;
        },
        remove: function(){
            console.log(this.$el);
            this.$el.remove();
        }
    });

    var ContentSlideListView = Backbone.View.extend({
        initialize: function(){
            this.collection.on('add', this.addOne, this);
            this.collection.on('reset', this.addAll, this);
        },
        tagName: 'div',
        className: "carousel-inner",
        render: function() {
            this.addAll();
            return this;
        },
        addOne: function(Content){
            var contentSlideView = new ContentSlideView({model: Content});
            contentSlideView.render();

            this.$el.append(contentSlideView.el);
        },
        addAll: function() {
            this.collection.forEach(this.addOne, this);
            $('#contentSlide').append(this.el);
            $('#contentSlide .carousel-inner div.item:eq(0)').addClass('active');
        }
    });
    var ContentRouter = new (Backbone.Router.extend({
        routes: {
            "": "index"
        },
        initialize: function(){
            this.bestContentList = new ContentList();
            this.bestContentListView = new BestContentListView({ collection: this.bestContentList });

            this.contentList = new ContentList();
            this.orgContentsListUrl = this.contentList.url;
            this.PageNo = 1;
            this.contentListView = new contentListView({ collection: this.contentList });

            var me = this;
            $('#contentList').waypoint(function(direction) {

                if (direction == 'down' && $(".featurette").length > 0) {
                    console.log(direction);
                    me.PageNo++;
                    me.contentList.url = me.orgContentsListUrl  + "/1/" + me.PageNo;
                    me.contentList.fetch({data: {orderName : 'registerDateTime', order: 'desc'}});
                }
            }, { offset: 'bottom-in-view' });

            this.contentSlideListView = new ContentSlideListView({ collection: this.bestContentList });
        },
        index: function(){
            this.bestContentList.fetch({reset : true, data: {limit: 3, orderName : 'count', order: 'desc'}});
            this.contentList.url = this.orgContentsListUrl  + "/1/" + this.PageNo;
            this.contentList.fetch({reset : true, data: {orderName : 'registerDateTime', order: 'desc'}});
        },
        start: function(){
            Backbone.history.start();
        }
    }));
    ContentRouter.start();

});
