(function () {

    'use strict';

    if (!window.console) {
        window.console = function () {
        };
    }


    requirejs.config({
        paths: {
            'jquery': '../libs/jquery/jquery-1.9.0.min',
            'underscore': '../libs/underscore/underscore',
            'tpl': '../libs/tpl/tpl',
            'backbone': '../libs/backbone/backbone',
            'bootstrap': '../libs/bootstrap/bootstrap',
            'google': '../libs/miller/goog',
            'async': '../libs/miller/async',
            'propertyParser': '../libs/miller/propertyParser',
            'modernizr': '../libs/modernizr/modernizr-2.6.2.min',
            'marionette': '../libs/marionette/backbone.marionette',
            'phoenix': '../libs/marionette/backbone.marionette.phoenix.1.0.0-SNAPSHOT.min',
            'backbone.wreqr': '../libs/backbone/backbone.wreqr.min',
            'backbone.babysitter': '../libs/backbone/backbone.babysitter.min',
            'vent': '../libs/backbone/vent',
            'app': 'SubmissionMgmt.App',
            'main': 'SubmissionMgmt.View',
            'controller': 'Controller',
            'router': 'Router',
            'submission.Model': 'Submission.Model',
            'importSummary.Model': 'ImportSummary.Model',
            'importHistoryItem.Collection': 'import/ImportHistoryItem.Collection',
            'importHistoryItem.Model': 'import/ImportHistoryItem.Model',
            'importHistoryItem.View': 'import/ImportHistoryItem.View',
            'entityCount.Templates': 'entity/EntityCount.Templates',
            'submission.View': 'dashboard/Submission.View',
            'dashboardItem.View': 'dashboard/DashboardItem.View'
        },
        shim: {
            'underscore': {
                exports: '_'
            },
            'jquery': {
                exports: '$'
            },
            'backbone': {
                deps: ['underscore', 'jquery'],
                exports: 'Backbone'
            },
            'marionette': {
                exports: 'Backbone.Marionette'
            },
            'phoenix': {
                exports: 'Marionette.Phoenix'
            },
            'bootstrap': ['jquery'],
            'backbone.wreqr': ['backbone'],
            'backbone.babysitter': ['backbone']
        }
    });

    require(['app', 'underscore'], function (App, _) {
        var _rootUrl = _.first(location.pathname.split('/'), 3).join('/');
        App.start({rootUrl: _rootUrl});
    });

}).call(this);

//    require(['bootstrap'], function() {
//         $("[rel=tooltip]").tooltip({trigger:'hover', delay:{ show:500, hide:100 }});
//
//    });

