define(['backbone', 'app', 'importHistoryItem.Model'], function (Backbone, App, Model) {

    'use strict';

    return Backbone.Collection.extend({
        model: Model,

        initialize: function (models, options) {
        },
        url: function () {
            return App.submission.url() + '/importHistory';
        }
    });
});

