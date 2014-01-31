define(['backbone'], function (Backbone) {

    'use strict';

    return Backbone.Model.extend({
        defaults:{
            type: '',
            when : '',
            importedEntities: 0
        },
        initialize:function () {
        }
    });
});