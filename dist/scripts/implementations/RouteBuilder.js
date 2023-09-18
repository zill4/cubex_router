"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteBuilder = (function () {
    function RouteBuilder(parent) {
        this.entries = [];
        this.parent = parent;
    }
    RouteBuilder.getRoutebuilder = function (target) {
        if (target._routeBuilder) {
            if (!target.hasOwnProperty('_routeBuilder')) {
                target._routeBuilder = new RouteBuilder(target._routeBuilder);
            }
        }
        else {
            target._routeBuilder = new RouteBuilder();
        }
        return target._routeBuilder;
    };
    return RouteBuilder;
}());
exports.default = RouteBuilder;
//# sourceMappingURL=RouteBuilder.js.map