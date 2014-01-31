/*jslint nomen: true */
define(['phoenix'], function (Phoenix) {

    'use strict';

    return Phoenix.Controller.extend({

        regionManager: undefined,
        tabContent: undefined,

        initialize: function (options) {
            this.regionManager = options.regionManager;
            this.tabContent = options.tabContent;
        },

        home: function () {
            this.showTab('dashboard');
        },
        showTab: function (tabId, subtabSuffix) {
            // Establish callback to run when tab is available
            this.once('tab:available', function (view) {
                // Show Top-Level tab
                $('a[href="#' + tabId + '"]').tab('show');

                // If Second-Level tab, then show it
                if (subtabSuffix) {
                    var _subtabId = '#' + tabId + '/#' + subtabSuffix;
                    view.$('a[href="' + _subtabId + '"]').tab('show');
                } else {
                    view.$('a:first').tab('show');
                }
            });

            // Insure 'Tab Region' is available
            this.insureRegionAvailable(tabId);
        },
        insureRegionAvailable: function (regionId) {
            console.log('Checking if region:', regionId, 'is loaded');
            var _region = this.regionManager.get(regionId), _this = this;
            if (!_region.currentView) {
                require([this.tabContent[regionId]], function (View) {
                    var _view = new View();
                    _view.once('show', function (e) {
                        _this.trigger('tab:available', _view);
                    });
                    _region.show(_view);
                });
            } else {
                this.trigger('tab:available', _region.currentView);
            }
        }
    });
});