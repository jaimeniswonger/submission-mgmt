define(['app', 'phoenix', 'tpl!entity/unresolved/imported-entities-item.tmpl'], function (App, Phoenix, Template) {

    'use strict';

    return Phoenix.ItemView.extend({
        template: Template,

        tagName: 'tr',

        ui: {
            newButton: "button#confirmNew"
        },

        modelEvents: {
            'remove': function (model) {
                App.vent.trigger('entity:resolved', model);
            }
        },

        events: {
            'change input[type=radio]': 'unmatchedSelected',
            'click button#confirmNew': 'confirmNew'
        },

        initialize: function (options) {
            console.log('Initializing UnmatchedImported.Item.View');
            var _this = this;
            App.vent.on("unmatched:selected", function (model) {
                if (model !== _this.model) {
                    _this.disableNewButton();
                }
            });
        },
        unmatchedSelected: function (e) {
            this.enableNewButton();
            App.vent.trigger("unmatched:selected", this.model);
        },
        confirmNew: function () {
            this.model.destroy();
        },
        enableNewButton: function () {
            this.ui.newButton.removeAttr('disabled');
        },
        disableNewButton: function () {
            this.$('button#confirmNew').attr('disabled', 'disabled');
        }
    });
});