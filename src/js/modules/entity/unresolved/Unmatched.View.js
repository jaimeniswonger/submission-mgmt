define(['phoenix', 'app', 'tpl!entity/unresolved/unresolved.tmpl', 'entity/unresolved/UnmatchedImported.View', 'entity/unresolved/UnmatchedExisting.View'], function (Phoenix, App, Template, UnmatchedImportedView, UnmatchedExistingView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,
        type: 'unmatched',

        regions: {
            imported: '#imported',
            existing: '#existing'
        },

        initialize: function (options) {
            console.log('Initializing View: Unresolved.View');
        },
        onRender: function () {
            console.log('Rendered View: Unresolved.View');
            this.imported.show(new UnmatchedImportedView());
            this.existing.show(new UnmatchedExistingView({}));
        }
    });
});