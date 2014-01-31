define(['phoenix', 'app', 'tpl!dashboard/submission.tmpl'], function (Phoenix, App, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template: Template,
        className: 'container-fluid',

        initialize: function () {
            console.log('Initializing View: Submission.View');

            this.listenTo(this.model, "change", this.modelChanged);
        },
        modelChanged: function () {
            this.render();
        },
        onRender: function () {
            console.log('Rendered View: Submission.View');
        }
    });
});