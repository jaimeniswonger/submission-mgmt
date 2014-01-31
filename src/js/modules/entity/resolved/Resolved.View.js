define(['phoenix', 'tpl!entity/resolved/resolved.tmpl'], function (Phoenix, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template:Template,

        className: 'container-fluid',

        initialize : function (options) {
            this.id = options.id;
            console.log('Initializing View: Resolved.View');
        },
        onRender : function () {
            console.log('Rendered View: Resolved.View');
        }
    });
});