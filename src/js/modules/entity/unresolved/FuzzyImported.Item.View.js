define(['app', 'phoenix', 'tpl!entity/unresolved/imported-entities-item.tmpl'], function (App, Phoenix, Template) {
    'use strict';

    return Phoenix.ItemView.extend({
        template: Template,

        tagName: 'tr',

        ui: {
            newButton: "button#confirmNew",
            confirmLegalNameModal: "#confirmLegalName"
        },

        modelEvents: {
            'remove': function (model) {
                App.vent.trigger('entity:resolved', model);
            }
        },

        events: {
            'change input[type=radio]': 'fuzzySelected',
            'click button#confirmNew': 'confirmNew'
        },

        initialize: function (options) {
            console.log('Initializing FuzzyImported.Item.View');
            var _this = this;
            App.vent.on("fuzzy:selected", function (model) {
                if (model !== _this.model) {
                    _this.disableNewButton();
                }
            });
        },
        fuzzySelected: function (e) {
            this.enableNewButton();
            App.vent.trigger("fuzzy:selected", this.model);
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