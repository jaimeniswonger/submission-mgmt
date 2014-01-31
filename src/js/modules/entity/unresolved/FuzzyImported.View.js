define(['app', 'phoenix', 'tpl!entity/unresolved/imported-entities.tmpl', 'entity/Entity.Collection', 'entity/unresolved/FuzzyImported.Item.View'], function (App, Phoenix, Template, EntityCollection, FuzzyItemView) {

    'use strict';

    return Phoenix.CompositeView.extend({
        template: Template,
        itemView: FuzzyItemView,
        itemViewContainer: '#imported-entities',

        initialize: function (options) {
            console.log('Initializing FuzzyImported.View');
            this.collection = new EntityCollection([], {type: 'fuzzy'});
            this.collection.fetch();
        },
        onRender: function () {
            console.log('Rendered FuzzyImported.View');
        }
    });
});