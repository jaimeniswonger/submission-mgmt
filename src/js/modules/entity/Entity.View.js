define(['phoenix', 'tpl!entity/entity.tmpl', 'entity/EntityContext.View', 'entity/EntityContent.View'], function (Phoenix, Template, EntityContextView, EntityContentView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,

        className: 'container-fluid',

        regions: {
            context: '#entity-context',
            content: '#entity-content'
        },
        initialize: function () {
            console.log('Initializing View: Entity.View');
        },
        onBeforeRender: function () {
        },
        onRender: function () {
            console.log('Rendered View: Entity.View');
            this.context.show(new EntityContextView());
            this.content.show(new EntityContentView());
        }
    });
});