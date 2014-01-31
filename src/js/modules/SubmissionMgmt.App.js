define(['phoenix', 'bootstrap', 'controller', 'router', 'submission.Model'], function (Phoenix, Bootstrap, Controller, Router, Submission) {

    'use strict';

    var SubmissionMgmtPrototype = Phoenix.Application.extend({
        rootUrl: undefined,
        submission: undefined,
        entitySummary: undefined,

        tabContent: {
            'dashboard': 'dashboard/Dashboard.View',
            'import': 'import/Import.View',
            'entity': 'entity/Entity.View'
        },
        loadImportSummaries: function () {
            var _this = this;
            require(['importSummary.Model'], function (SummaryModel) {
                _this.entitySummary = new SummaryModel({title: 'entity'});
                _this.entitySummary.fetch({success: function (obj) {
                    _this.showEntityTabSummary(obj);
                }});
            });
        },
        showEntityTabSummary: function (entitySummary) {
            var _this = this;
            require(['entity/EntityTabSummary.View'], function (View) {
                _this.entityTabSummary.show(new View({model: entitySummary}));
            });
        }
    });

    var submissionMgmtApp = new SubmissionMgmtPrototype();

    submissionMgmtApp.addRegions({
        'entityTabSummary': 'span#entityTabSummary'
    });

    // Initialize Region mappings
    submissionMgmtApp.addInitializer(function (options) {
        this.rootUrl = options.rootUrl;
    });

    // Initialize Region mappings
    submissionMgmtApp.addInitializer(function (options) {
        var _regions = {};
        for (var prop in this.tabContent) {
            _regions[prop] = '#' + prop;
        }
        this.addRegions(_regions);
    });

    // Initialize Router
    submissionMgmtApp.addInitializer(function (options) {
        console.log("Initializing Router(s)...");
        var router = new Router({controller: new Controller({regionManager: this._regionManager, tabContent: this.tabContent})});
    });

    submissionMgmtApp.addInitializer(function (options) {
        var _submissionId = location.pathname.split('/')[2];
        var _submission = new Submission({id: _submissionId});
        var _this = this;
        _submission.fetch({success: function (obj) {
            _this.submission = obj;
            _this.loadImportSummaries();
        }});
    });

    // After all initializers have run
    submissionMgmtApp.on('initialize:after', function (options) {
        Backbone.history.on('route', function (router, event) {
            console.log('Routed', this.fragment, 'to:', event);
        });

        console.log('Starting Backbone History...');
        Backbone.history.start({pushState: true, root: this.rootUrl });

        var _this = this;
        $(document).delegate('a:not([target])', 'click', function (e) {
            e.preventDefault();
            console.log('Clicked \'a\' with hash:', e.currentTarget.hash);
            var _target = e.currentTarget.hash.replace(/#/g, '');
            Backbone.history.navigate(_target, true);
        });
    });

    return submissionMgmtApp;
});