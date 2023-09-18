"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RouteListener = (function () {
    function RouteListener(callback) {
        var _this = this;
        this.handler = function (event) {
            var url = (event && event.newURL) ? event.newURL : window.location.href;
            var hash = _this.getHash(url);
            if (_this.callback && !_this.callback(hash) && event) {
                event.preventDefault();
            }
        };
        this.callback = callback;
    }
    RouteListener.prototype.start = function (defer) {
        if (defer === void 0) { defer = false; }
        window.addEventListener('hashchange', this.handler);
        if (!defer) {
            this.handler();
        }
    };
    RouteListener.prototype.stop = function () {
        window.removeEventListener('hashchange', this.handler);
    };
    RouteListener.prototype.getHash = function (url) {
        var hash;
        var index = url.indexOf('#');
        if (index >= 0) {
            hash = url.substring(index + 1);
        }
        else {
            hash = '';
        }
        return hash;
    };
    return RouteListener;
}());
exports.default = RouteListener;
//# sourceMappingURL=RouteListener.js.map