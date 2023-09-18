"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wait = void 0;
function wait(time) {
    return new Promise(function (resolve) {
        window.setTimeout(resolve, time);
    });
}
exports.wait = wait;
//# sourceMappingURL=TestUtils.js.map