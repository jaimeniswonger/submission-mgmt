define(['phoenix', 'app', 'tpl!dashboard/dashboard.tmpl', 'submission.View', 'dashboardItem.View'], function (Phoenix, App, Template, SubmissionView, SummaryView) {

    'use strict';

    return Phoenix.Layout.extend({
        template: Template,
        className: 'container-fluid',

        regions: {
            submission: '#submission-info',
            entity: '#entity-summary'
        },

        initialize: function () {
            console.log('Initializing View: Dashboard.View');
        },
        onRender: function () {
            console.log('Rendered View: Dashboard.View');
//            this.submission.show(new SubmissionView({model: App.submission}));
            this.entity.show(new SummaryView({model: App.entitySummary}));
        }
    });
});