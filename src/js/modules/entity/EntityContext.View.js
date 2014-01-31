define(['app', 'phoenix', 'tpl!entity/entityContext.tmpl', 'entity/EntityCount.View'], function (App, Phoenix, Template, EntityCountView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,

        regions: {
            matchedCount: 'span#entityMatchedCount',
            confirmedCount: 'span#entityConfirmedCount',
            fuzzyCount: 'span#entityFuzzyCount',
            unmatchedCount: 'span#entityUnmatchedCount'
        },

        initialize: function () {
            this.model = App.entitySummary;
        },
        onRender: function () {
            this.matchedCount.show(new EntityCountView({model: App.entitySummary, property: 'matched'}));
            this.confirmedCount.show(new EntityCountView({model: App.entitySummary, property: 'confirmed'}));
            this.fuzzyCount.show(new EntityCountView({model: App.entitySummary, property: 'fuzzy'}));
            this.unmatchedCount.show(new EntityCountView({model: App.entitySummary, property: 'unmatched'}));
        }
    });
});