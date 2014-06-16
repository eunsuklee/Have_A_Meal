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
        }
    });

    var ContentRouter = new (Backbone.Router.extend({
        routes: {
            "": "index"
        },
        initialize: function(){
            this.bestContentList = new ContentList();
            this.bestContentListtView = new BestContentListView({ collection: this.bestContentList });
            this.bestContentListtView.render();
            $('#bestContentList').append(this.bestContentListtView.el);
        },
        index: function(){
            this.bestContentList.fetch({data: {limit: 3, orderName : 'count', order: 'desc'}});
        },
        start: function(){
            Backbone.history.start();
        }
    }));
    ContentRouter.start();
});
