define(['phoenix', 'app', 'tpl!entity/unresolved/existing-entities.tmpl', 'entity/Entity.Collection', 'entity/unresolved/Existing.Entity.View'], function (Phoenix, App, Template, EntityCollection, ExistingEntityView) {

    'use strict';

    return Phoenix.CompositeView.extend({

        type: 'fuzzy',
        template: Template,
        itemView: ExistingEntityView,
        itemViewContainer: '#existing-entities',

        ui: {
            numberMatched : '#number-matching'
        },

        initialize: function (options) {
            this.collection = new EntityCollection([], {});

            var _this = this;
            App.vent.on("fuzzy:selected", function (model) {
                _this.fetchMatchedEntities(model);
            });

            App.vent.on('entity:resolved', function(model) {
                _this.collection.reset();
            });

        },
        fetchMatchedEntities: function (relatedModel) {
            var _this = this;
            var _newCollection = new EntityCollection([], {relatedModel: relatedModel});
            _newCollection.fetch({success: function(newCollection) {
                _this.collection.reset(newCollection.models);
            }});
        },
        onCompositeCollectionRendered: function() {
            this.ui.numberMatched.text(this.collection.length);
        }
    });
});