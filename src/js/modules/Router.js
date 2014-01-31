define(['phoenix'], function (Phoenix) {

    'use strict';

    return Phoenix.AppRouter.extend({
        appRoutes: {
            '': ['home'],
            ':tabId(/:tabId)': ['showTab', 'hasRole(["ROLE1", "ROLE2")]']
        }
    });
});