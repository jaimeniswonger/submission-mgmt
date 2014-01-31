define(['phoenix', 'app', 'tpl!entity/unresolved/unresolved.tmpl', 'entity/unresolved/FuzzyImported.View', 'entity/unresolved/FuzzyExisting.View'], function (Phoenix, App, Template, FuzzyImportedView, FuzzyExistingView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,
        type: 'fuzzy',

        regions: {
            imported: '#imported',
            existing: '#existing'
        },

        initialize: function (options) {
            console.log('Initializing View: Fuzzy.View');
        },
        onRender: function () {
            console.log('Rendered View: Fuzzy.View');
            this.imported.show(new FuzzyImportedView());
            this.existing.show(new FuzzyExistingView({}));
        }
    });
});
