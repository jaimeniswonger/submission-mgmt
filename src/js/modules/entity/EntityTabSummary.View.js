define(['phoenix', 'tpl!entity/entity-tab-summary.tmpl'], function (Phoenix, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template: Template,
        tagName: 'span',

        initialize: function (options) {
            this.model = options.model;
            this.listenTo(this.model, "change", this.modelChanged);
        },
        modelChanged: function () {
            this.render();
        }
    });
});