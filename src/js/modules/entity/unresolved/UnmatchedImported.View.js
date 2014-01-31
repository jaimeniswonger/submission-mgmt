define(['app', 'phoenix', 'tpl!entity/unresolved/imported-entities.tmpl', 'entity/Entity.Collection', 'entity/unresolved/UnmatchedImported.Item.View'], function (App, Phoenix, Template, EntityCollection, UnmatchedItemView) {

    'use strict';

    return Phoenix.CompositeView.extend({
        template: Template,
        itemView: UnmatchedItemView,
        itemViewContainer: '#imported-entities',

        initialize: function (options) {
            console.log('Initializing UnmatchedImported.View');
            this.collection = new EntityCollection([], {type: 'unmatched'});
            this.collection.fetch();
        },
        onRender: function () {
            console.log('Rendered UnmatchedImported.View');
        }
    });
});