"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteListener_1 = require("./RouteListener");
var RouteUtils_1 = require("./RouteUtils");
var Router = (function () {
    function Router() {
        var _this = this;
        this.routes = [];
        this.routeHash = {};
        this.changedRouteGroup = false;
        this.routeListener = new RouteListener_1.default(function (hash) {
            var result = undefined;
            if (_this.beforeMatch) {
                result = _this.beforeMatch(hash, _this.currentRoute);
            }
            if (typeof result === 'string') {
                hash = result;
            }
            if (result !== false) {
                _this.previousRoute = _this.currentRoute;
                _this.currentRoute = undefined;
                var params = void 0;
                if (hash) {
                    if (_this.routes) {
                        for (var index = 0, length_1 = _this.routes.length; index < length_1; index++) {
                            var route = _this.routes[index];
                            params = hash.match(route.regex);
                            if (params) {
                                _this.currentRoute = route;
                                break;
                            }
                        }
                    }
                }
                else {
                    _this.currentRoute = _this.defaultRoute;
                }
                if (!_this.currentRoute) {
                    _this.currentRoute = _this.errorRoute;
                }
                _this.changedRouteGroup = !_this.previousRoute ||
                    !_this.previousRoute.routeGroup ||
                    !_this.currentRoute ||
                    _this.previousRoute.routeGroup !== _this.currentRoute.routeGroup;
                if (_this.beforeChange) {
                    _this.beforeChange(hash, _this.currentRoute, _this.previousRoute);
                }
                if (_this.previousRoute && _this.previousRoute.exit &&
                    (!_this.previousRoute.routeGroup ||
                        !_this.currentRoute ||
                        (_this.currentRoute && _this.currentRoute.routeGroup !== _this.previousRoute.routeGroup))) {
                    if (_this.previousRoute.thisArg) {
                        _this.previousRoute.exit.call(_this.previousRoute.thisArg, hash);
                    }
                    else {
                        _this.previousRoute.exit(hash);
                    }
                }
                if (_this.currentRoute && _this.currentRoute.enter) {
                    params = params ? params.splice(1).map(function (param) { return decodeURIComponent(param); }) : [];
                    _this.currentRoute.enter.apply(_this.currentRoute.thisArg || _this.currentRoute.enter, params);
                }
                if (_this.afterChange) {
                    _this.afterChange(hash, _this.currentRoute, _this.previousRoute);
                }
            }
        });
    }
    Router.prototype.addRoute = function (route) {
        var oldRoute = this.routeHash[route.name];
        if (oldRoute) {
            var index = this.routes.indexOf(oldRoute);
            this.routes.splice(index, 1);
        }
        this.routeHash[route.name] = route;
        this.routes.push(route);
        return route;
    };
    Router.prototype.addRegex = function (definition, enter, exit) {
        return this.addRoute(RouteUtils_1.default.build(definition, enter, exit));
    };
    Router.prototype.addFunction = function (prefix, enter, exit) {
        return this.addRoute(RouteUtils_1.default.buildFromFunction(prefix, enter, exit));
    };
    Router.prototype.addFunctionGroup = function (prefix, enterFunctions, exit) {
        var _this = this;
        var routeGroup = {
            routes: []
        };
        if (enterFunctions) {
            enterFunctions.forEach(function (enter) {
                var route = _this.addFunction(prefix, enter, exit);
                route.routeGroup = routeGroup;
                routeGroup.routes.push(route);
            });
        }
        return routeGroup;
    };
    Router.prototype.removeRoute = function (route) {
        var index = this.routes.indexOf(route);
        if (index >= 0) {
            return this.routes.splice(index, 1);
        }
    };
    Router.prototype.setDefaultRoute = function (enter, exit) {
        this.defaultRoute = RouteUtils_1.default.build('', enter, exit);
    };
    Router.prototype.setErrorRoute = function (enter, exit) {
        this.errorRoute = RouteUtils_1.default.build('', enter, exit);
    };
    Router.prototype.setBeforeMatch = function (beforeMatch) {
        this.beforeMatch = beforeMatch;
    };
    Router.prototype.setBeforeChange = function (beforeChange) {
        this.beforeChange = beforeChange;
    };
    Router.prototype.setAfterChange = function (afterChange) {
        this.afterChange = afterChange;
    };
    Router.prototype.start = function (defer) {
        if (defer === void 0) { defer = false; }
        this.routeListener.start(defer);
    };
    Router.prototype.stop = function () {
        this.routeListener.stop();
        this.currentRoute = undefined;
    };
    Router.goToRoute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        window.location.hash = args.map(function (value) { return encodeURIComponent(value); }).join('/');
    };
    Router.goToPage = function (href) {
        window.location.href = href;
    };
    return Router;
}());
exports.default = Router;
//# sourceMappingURL=Router.js.map