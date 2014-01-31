define(['phoenix','tpl!entity/unresolved/existing-entities-item.tmpl'], function(Phoenix, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template : Template,

        tagName: 'tr',

        initialize: function(options) {
            console.log('Initializing Existing.Entity.View');
        },
        onRender: function() {
            console.log('Rendered Existing.Entity.View');
        }
    });
});