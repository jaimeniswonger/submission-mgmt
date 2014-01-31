define(['phoenix', 'tpl!import/importHistoryItem.tmpl'], function (Phoenix, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template:Template,
        tagName: 'tr',

        initialize : function () {
            console.log('Initializing View: ImportHistoryItem.View');
        },
        onRender : function () {
            console.log('Rendered View: ImportHistoryItem.View');
        }
    });
});