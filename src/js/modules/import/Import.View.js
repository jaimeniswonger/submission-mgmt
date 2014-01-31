define(['phoenix', 'app', 'tpl!import/import.tmpl', 'importHistoryItem.Collection', 'importHistoryItem.View'], function (Phoenix, App, Template, Collection, ItemView) {

    'use strict';

    return Phoenix.CompositeView.extend({
        template: Template,

        itemView: ItemView,
        itemViewContainer: '#importHistoryItems',

        events: {
            'click #import': 'performImport',
            'click #save': 'save'
        },

        initialize: function () {
            console.log('Initializing View: Import.View');
            var collection = new Collection([], {id: App.submission.id});
            collection.fetch();
            this.collection = collection;
        },
        onRender: function () {
            console.log('Rendered View: Import.View');
        },
        performImport: function () {
            console.log('import pushed');
        },
        save: function () {
            console.log('Save pushed');
        }
    });
});