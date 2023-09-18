"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/mg;
var RouteUtils = (function () {
    function RouteUtils() {
    }
    RouteUtils.getParameterNames = function (functionHandle) {
        var definition = functionHandle.toString().replace(STRIP_COMMENTS, '');
        if (definition.startsWith('function')) {
            return definition.slice(definition.indexOf('(') + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
        }
        else {
            var arrowIndex = definition.indexOf('=>');
            var parenthesisIndex = definition.indexOf('(');
            if (parenthesisIndex > -1 && parenthesisIndex < arrowIndex) {
                return definition.slice(parenthesisIndex + 1, definition.indexOf(')')).match(/([^\s,]+)/g) || [];
            }
            else {
                return definition.slice(0, arrowIndex).match(/([^\s,]+)/g) || [];
            }
        }
    };
    RouteUtils.stringToRegex = function (definition) {
        return new RegExp('^' + definition.replace(/\//g, '\\/').replace(/\?:(\w*)/g, '\\?(.*)').replace(/:(\w*)/g, '([^\/\?]*)') + '$');
    };
    RouteUtils.functionToRegex = function (prefix, enter) {
        var params = RouteUtils.getParameterNames(enter);
        params.unshift(prefix);
        return RouteUtils.stringToRegex(params.join('/:'));
    };
    RouteUtils.build = function (definition, enter, exit, thisArg) {
        if (typeof definition === 'string') {
            var regex = RouteUtils.stringToRegex(definition);
            var name = definition;
        }
        else {
            var regex = definition;
            var name = definition.toString();
        }
        return {
            name: name,
            regex: regex,
            enter: enter,
            exit: exit,
            thisArg: thisArg
        };
    };
    RouteUtils.buildFromFunction = function (prefix, enter, exit) {
        var params = RouteUtils.getParameterNames(enter);
        params.unshift(prefix);
        var definition = params.join('/:');
        return RouteUtils.build(definition, enter, exit);
    };
    RouteUtils.buildDefinitionGroup = function (prefix, definitionGroup, routes) {
        routes = routes || [];
        for (var subPrefix in definitionGroup) {
            if (definitionGroup.hasOwnProperty(subPrefix)) {
                var definitions = definitionGroup[subPrefix];
                var fullPrefix = prefix ? prefix + '/' + subPrefix : subPrefix;
                if (definitions instanceof Array) {
                    for (var index = 0, length = definitions.length; index < length; index++) {
                        var definition = definitions[index];
                        if (typeof definition === 'function') {
                            routes.push(RouteUtils.buildFromFunction(fullPrefix, definition));
                        }
                        else {
                            RouteUtils.buildDefinitionGroup(fullPrefix, definition, routes);
                        }
                    }
                }
                else {
                    routes.push(RouteUtils.buildFromFunction(fullPrefix, definitions));
                }
            }
        }
        return routes;
    };
    RouteUtils.createUrl = function () {
        var parts = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            parts[_i] = arguments[_i];
        }
        var joined = parts.join('/');
        return RouteUtils.normalize(joined);
    };
    RouteUtils.normalize = function (str) {
        str = str.replace(/:\//g, '://');
        str = str.replace(/([^:\s])\/+/g, '$1/');
        str = str.replace(/\/(\?|&|#[^!])/g, '$1');
        str = str.replace(/(\?.+)\?/g, '$1&');
        return str;
    };
    RouteUtils.objectToQueryString = function (obj) {
        var values = [];
        for (var name in obj) {
            if (obj.hasOwnProperty(name)) {
                var value = obj[name];
                if (value instanceof Array) {
                    for (var index = 0, length = value.length; index < length; index++) {
                        values.push(name + '[]=' + encodeURIComponent(value[index]));
                    }
                }
                else if (value !== undefined) {
                    values.push(name + '=' + encodeURIComponent(value));
                }
            }
        }
        return values.join('&');
    };
    RouteUtils.createRoute = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return args.map(function (value) { return encodeURIComponent(value); }).join('/');
    };
    return RouteUtils;
}());
exports.default = RouteUtils;
//# sourceMappingURL=RouteUtils.js.map