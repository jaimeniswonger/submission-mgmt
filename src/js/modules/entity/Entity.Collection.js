define(['backbone', 'app', 'entity/Entity.Model'], function (Backbone, App, Model) {

    'use strict';

    return Backbone.Collection.extend({
        type: undefined,
        relatedModel: undefined,

        model: Model,

        initialize: function (models, options) {
            console.log('Initializing Entity.Collection with options: ' + options.type + ":" + options.relatedModel);
            if (options.type) {
                this.type = options.type;
            }
            if (options.relatedModel) {
                this.relatedModel = options.relatedModel;
            }

            // ULTIMATELY I WOULD LIKE THESE TO BE RE-RETRIEVED?
            if (this.type === 'fuzzy') {
                this.on('remove', function (x) {
                    App.entitySummary.set({fuzzy: App.entitySummary.get('fuzzy') - 1});
                    App.entitySummary.set({confirmed: App.entitySummary.get('confirmed') + 1});
                });
            } else if (this.type === 'unmatched') {
                this.on('remove', function (x) {
                    App.entitySummary.set({unmatched: App.entitySummary.get('unmatched') - 1});
                    App.entitySummary.set({confirmed: App.entitySummary.get('confirmed') + 1});
                });
            }
        },

        url: function () {
            var _url = App.submission.url();
            _url += '/entities';
            if (this.type) {
                _url += '/' + this.type;
            }
            if (this.relatedModel) {
                _url += '/' + this.relatedModel.id;
            }
            return _url;
        }
    });
});