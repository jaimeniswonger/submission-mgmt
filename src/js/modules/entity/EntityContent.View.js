define(['phoenix', 'app', 'tpl!entity/entityContent.tmpl', 'entity/resolved/Resolved.View', 'entity/unresolved/Fuzzy.View', 'entity/unresolved/Unmatched.View'], function (Phoenix, App, Template, ResolvedView, FuzzyView, UnmatchedView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,

        className: 'span12 tab-content',
        id: 'entityContent',

        regions: {
            matched: '#matched',
            confirmed: '#confirmed',
            fuzzy: '#fuzzy',
            unmatched: '#unmatched'
        },
        onRender: function () {
            console.log('Rendered View: EntityContent.View');
//            this.matched.show(new ResolvedView());
//            this.confirmed.show(new ResolvedView());
            this.fuzzy.show(new FuzzyView());
            this.unmatched.show(new UnmatchedView());
        }
    });
});