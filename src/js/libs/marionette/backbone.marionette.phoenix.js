(function (root, factory) {
    'use strict';

    if (typeof exports === 'object') {

        var underscore = require('underscore'),
            marionette = require('marionette'),
            backbone = require('backbone');

        module.exports = factory(underscore, marionette, backbone);

    } else if (typeof define === 'function' && define.amd) {

        define(['underscore', 'marionette', 'backbone'], factory);

    }
}(this, function (_, Marionette, Backbone) {

    // Override the Marionette.Renderer.render function to apply DOM 'content' security
    Backbone.Marionette.Renderer.render = function (template, data) {
        var templateFunc = typeof template === 'function' ? template : Marionette.TemplateCache.get(template);
        var html = templateFunc(data);
//        console.log('Check templated content for authorization: ', template)
        if (Phoenix.secure) {
            html = Phoenix.secure.secureHtml(html);
        }
        return html;
    };

    var Phoenix = (function (global, Marionette, _) {

        // Define and export the Marionette namespace
        var Phoenix = {};
        Marionette.Phoenix = Phoenix;

        // Get the DOM manipulator for later use
        Phoenix.$ = Marionette.$;


        // Phoenix.extend
        // -----------------

        // Borrow the Marionette `extend` method so we can use it as needed
        Phoenix.extend = Marionette.extend;

        var Secure = function (options) {
            this._configure(options || {});
            this.initialize.apply(this, arguments);
            _(this).bindAll('hasRole', 'hasAllRoles', 'hasNoRoles');
        };

        var secureOptions = ['secureTag'];

        _.extend(Secure.prototype, {
            secureTag: 'data-secure',
            secureActionTag: 'data-secure-action',

            // princial name
            principal: undefined,

            // roles assigned to the principal
            roles: undefined,

            // is authenticated
            isAuthenticate: false,

            // loaded routers need to refresh on authenticated & invalidate
            routers: [],

            // Initialize is an empty function by default. Override it with your own initialization logic.
            initialize: function () {
                // FOR TESTING ONLY
                this.principal = "jaime";
                this.roles = ['ROLE1'];
                this.isAuthenticate = true;
                //
            },

            authenticate: function (auth) {
                if (auth === undefined) throw new Error('Authentication failed');
                this.principal = auth.principal;
                this.roles = auth.roles;
                this.isAuthenticate = true;
                this.refresh();
            },

            authorize: function (restriction) {
                if (!this.isAuthenticate) {
                    return false;
                }

                var _methodName = restriction.match(/(has(All|Any)?Role(s)?)/g);
                var _rolePortionOfString = restriction.split('(')[1];
                var _rolesArray = _rolePortionOfString.match(/[A-Za-z0-9]+/g)

                var _method = this[_methodName];
                return _method(_rolesArray);
            },

            // invalidate the authentication
            invalidate: function () {
                this.roles = this.principal = undefined;
                this.isAuthenticate = false;
                this.refresh();
            },

            // reload the routers
            refresh: function () {
                _.each(this.routers, function (router) {
                    // rebind the routes
                    // this will overwrite what is currently set
                    router._bindRoutes();
                });
            },

            remove: function(e) {
                $(e).remove();
            },

            disable: function(e) {
                $(e).attr('disabled', 'disabled');
            },

            // secure the html that is passed in, and return it
            secureHtml: function (el) {
                var $el = $(el);
                _.each($el.find('[data-secure]'), function (e) {
                    var $e = $(e);
                    var _secure = $e.attr(this.secureTag);
                    var _method = _secure.split('(')[0];
                    var _roles = _secure.split('(')[1].replace(/\[|\]|\)|\'/ig, '').split(',');
                    var _handler = $e.attr(this.secureActionTag);
                    if (_.isFunction(this[_method]) && !this[_method].apply(this, _roles)) {
                        if (!_handler) {
                            _handler = 'remove';
                        }
                        this[_handler].apply(this, $(e));
                    }
                }, this);

                return $el;
            },

            // cleans all tags in the DOM
            // No html is return
            cleanDom: function () {
                this.secureHtml($('*'));
            },

            // Performs the initial configuration of a Secure with a set of options.
            _configure: function (options) {
                if (this.options) options = _.extend({}, this.options, options);
                for (var i = 0, l = secureOptions.length; i < l; i++) {
                    var attr = secureOptions[i];
                    if (options[attr]) this[attr] = options[attr];
                }
                this.options = options;
            },

            // check if Secure Object has one of the roles
            // example: hasRole('ROLE_1') or hasRole(['ROLE_1', 'ROLE_2'])
            hasRole: function (roles) {
                var _r = _.intersection(this._getRolesAsArray(this.roles), this._getRolesAsArray(roles));
                if (_r.length > 0) return true;
                return false;
            },

            // check if Secure Object has all of the roles listed
            // example: hasAllRoles('ROLE_1') or hasAllRoles(['ROLE_1', 'ROLE_2'])
            hasAllRoles: function (roles) {
                var _r = _.intersection(this._getRolesAsArray(this.roles), this._getRolesAsArray(roles));
                if (_r.length === _roles.length) return true;
                return false;
            },

            // check if Secure Object has any of the roles
            // hasNoRoles('ROLE_1') or hasNoRoles(['ROLE_1', 'ROLE_2'])
            hasNoRoles: function (roles) {
                var _r = _.intersection(this._getRolesAsArray(this.roles), this._getRolesAsArray(roles));
                if (_r.length === 0) return true;
                return false;
            },

            // get the roles as array
            _getRolesAsArray: function (roles) {
                    var _roles;
                    if (_.isFunction(roles)) _roles = roles();
                    else _roles = roles;
                    if (!_.isArray(_roles)) _roles = [_roles];
                    return _roles;
            }
        });
// should auto load
        Phoenix.secure = new Secure();

// Phoenix.AppRouter
// ---------------

        Phoenix.AppRouter = Marionette.AppRouter.extend({
            constructor: function () {
                var args = Array.prototype.slice.apply(arguments);
                Marionette.AppRouter.prototype.constructor.apply(this, args);
            },
            // !---- OVERRIDE OF STANDARD MARIONETTE ----->
            // Internal method to process the `appRoutes` for the
            // router, and turn them in to routes that trigger the
            // specified method on the specified `controller`.
            processAppRoutes: function (controller, appRoutes) {
                _.each(appRoutes, function (routeArray, route) {
                    var _methodName = routeArray[0];
                    var _restriction = routeArray.length > 1 ? routeArray[1] : undefined;

                    var _methodName = _restriction ? (this.authorize(_restriction) ? _methodName : 'notAuthorized') : _methodName;

                    var method = controller[_methodName];
                    if (!method) {
                        throw new Error("Method '" + _methodName + "' was not found on the controller");
                    }

                    this.route(route, _methodName, _.bind(method, controller));
                }, this);
            },
            authorize: function (restriction) {
                return Phoenix.secure.authorize(restriction);
            }
        });


// Phoenix.Controller
// ---------------

        Phoenix.Controller = Marionette.Controller.extend({
            constructor: function () {
                var args = Array.prototype.slice.apply(arguments);
                Marionette.Controller.prototype.constructor.apply(this, args);
            },
            notAuthorized: function () {
                window.location = '/401.html';
//                throw new Error("Uses does not have permissions to view this page!");
            }
        });

// Phoenix.Application
// ---------------

        Phoenix.Application = Marionette.Application.extend({
        });

// Phoenix.Layout
// ---------------

        Phoenix.Layout = Marionette.Layout.extend({
        });

// Phoenix.ItemView
// ---------------

        Phoenix.ItemView = Marionette.ItemView.extend({
//            constructor: function () {
//                var args = Array.prototype.slice.apply(arguments);
//                Marionette.ItemView.prototype.constructor.apply(this, args);
//            }
        });

// Phoenix.CollectionView
// ---------------

        Phoenix.CollectionView = Marionette.CollectionView.extend({
        });

// Phoenix.CompositeView
// ---------------

        Phoenix.CompositeView = Marionette.CompositeView.extend({
        });

// Phoenix.Model
// ---------------

        Phoenix.Model = Backbone.Model.extend({
        });

        return Phoenix;

    })
        (this, Marionette, _);

    return Marionette.Phoenix;

}));
