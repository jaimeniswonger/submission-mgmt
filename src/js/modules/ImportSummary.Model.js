/*jslint nomen: true */

define(['phoenix', 'app'], function (Phoenix, App) {
    'use strict';

    return Phoenix.Model.extend({
        defaults: {
            title: undefined,
            matched: 0,
            imported: 0,
            confirmed: 0,
            fuzzy: 0,
            unmatched: 0
        },
        url: function () {
            return App.submission.url() + '/' + this.title + '/summary';
        },
        initialize: function (options) {
            this.title = options.title;
        }
    });
});

