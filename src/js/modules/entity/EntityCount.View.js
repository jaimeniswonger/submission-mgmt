define(['phoenix', 'entityCount.Templates'], function (Phoenix, Templates) {

    'use strict';

    return Phoenix.ItemView.extend({

        tagName: 'span',

        initialize: function (options) {
            this.model = options.model;
            if (options.property === 'matched') {
                this.template = Templates.entityMatchedCount;
                this.listenTo(this.model, "change:matched", this.modelChanged);
            } else if (options.property === 'confirmed') {
                this.template = Templates.entityConfirmedCount;
                this.listenTo(this.model, "change:confirmed", this.modelChanged);
            } else if (options.property === 'fuzzy') {
                this.template = Templates.entityFuzzyCount;
                this.listenTo(this.model, "change:fuzzy", this.modelChanged);
            } else if (options.property === 'unmatched') {
                this.template = Templates.entityUnmatchedCount;
                this.listenTo(this.model, "change:unmatched", this.modelChanged);
            }
        },
        modelChanged: function () {
            this.render();
        }
    });
});