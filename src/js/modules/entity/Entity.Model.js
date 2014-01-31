define(['backbone'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({
        defaults:{
            externalId: undefined,
            effectivityStart : undefined,
            effectivityEnd : undefined,
            legalName: undefined,
            shortName: undefined,
            currentState: undefined
        }
    });
});