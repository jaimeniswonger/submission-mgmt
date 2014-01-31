define(['phoenix'], function (Phoenix) {

    'use strict';

    return Phoenix.Model.extend({
        description: undefined,

        urlRoot: '/api/submissions'
    });
});