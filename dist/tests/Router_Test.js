"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var router_1 = require("../scripts/router");
var TestUtils_1 = require("../scripts/util/TestUtils");
describe('Router', function () {
    var router = new router_1.default();
    var changeCount = 0;
    var defaultCount = 0;
    var errorCount = 0;
    var test0Count = 0;
    var test0ExitCount = 0;
    var test1Count = 0;
    var test1ValueId = undefined;
    var test2Count = 0;
    var test2ValueId = undefined;
    var test2ValueName = undefined;
    function resetCounts() {
        changeCount = 0;
        defaultCount = 0;
        errorCount = 0;
        test0Count = 0;
        test0ExitCount = 0;
        test1Count = 0;
        test1ValueId = undefined;
        test2Count = 0;
        test2ValueId = undefined;
        test2ValueName = undefined;
    }
    router.setAfterChange(function () {
        changeCount++;
    });
    router.setDefaultRoute(function () {
        defaultCount++;
    });
    router.setErrorRoute(function () {
        errorCount++;
    });
    router.addRegex('test', function () {
        test0Count++;
    }, function () {
        test0ExitCount++;
    });
    router.addRegex('test/:id', function (id) {
        test1Count++;
        test1ValueId = id;
    });
    router.addFunction('test', function (id, name) {
        test2Count++;
        test2ValueId = id;
        test2ValueName = name;
    });
    it('should run on listen', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start();
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(1);
                    (0, chai_1.expect)(defaultCount).to.equal(1);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(0);
                    (0, chai_1.expect)(test0ExitCount).to.equal(0);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should handle a change from default to simple', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start();
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(2);
                    (0, chai_1.expect)(defaultCount).to.equal(1);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(1);
                    (0, chai_1.expect)(test0ExitCount).to.equal(0);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should handle a change from simple to default', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start();
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(2);
                    (0, chai_1.expect)(defaultCount).to.equal(1);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(1);
                    (0, chai_1.expect)(test0ExitCount).to.equal(1);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should ignore a change from default to default', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(0);
                    (0, chai_1.expect)(defaultCount).to.equal(0);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(0);
                    (0, chai_1.expect)(test0ExitCount).to.equal(0);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should handle a change from simple to simple', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = 'abcd';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(1);
                    (0, chai_1.expect)(defaultCount).to.equal(0);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(1);
                    (0, chai_1.expect)(test0ExitCount).to.equal(0);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should handle default to error', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'abcd';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(1);
                    (0, chai_1.expect)(defaultCount).to.equal(0);
                    (0, chai_1.expect)(errorCount).to.equal(1);
                    (0, chai_1.expect)(test0Count).to.equal(0);
                    (0, chai_1.expect)(test0ExitCount).to.equal(0);
                    (0, chai_1.expect)(test1Count).to.equal(0);
                    (0, chai_1.expect)(test1ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2Count).to.equal(0);
                    (0, chai_1.expect)(test2ValueId).to.equal(undefined);
                    (0, chai_1.expect)(test2ValueName).to.equal(undefined);
                    return [2];
            }
        });
    }); });
    it('should handle parameters', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    window.location.hash = 'test/1';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 4:
                    _a.sent();
                    window.location.hash = 'test/2/value with spaces';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 5:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(changeCount).to.equal(3);
                    (0, chai_1.expect)(defaultCount).to.equal(0);
                    (0, chai_1.expect)(errorCount).to.equal(0);
                    (0, chai_1.expect)(test0Count).to.equal(1);
                    (0, chai_1.expect)(test0ExitCount).to.equal(1);
                    (0, chai_1.expect)(test1Count).to.equal(1);
                    (0, chai_1.expect)(test1ValueId).to.equal('1');
                    (0, chai_1.expect)(test2Count).to.equal(1);
                    (0, chai_1.expect)(test2ValueId).to.equal('2');
                    (0, chai_1.expect)(test2ValueName).to.equal('value with spaces');
                    return [2];
            }
        });
    }); });
});
describe('Router.beforeMatch', function () {
    var router = new router_1.default();
    var testCount = 0;
    var otherCount = 0;
    function resetCounts() {
        testCount = 0;
        otherCount = 0;
    }
    router.addFunction('test', function () {
        testCount++;
    });
    router.addFunction('other', function () {
        otherCount++;
    });
    router.setBeforeMatch(function (hash) {
        if (hash === 'other') {
            return 'test';
        }
        else {
            return undefined;
        }
    });
    it('should not cancel on return undefined', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(testCount).to.equal(1);
                    (0, chai_1.expect)(otherCount).to.equal(0);
                    return [2];
            }
        });
    }); });
    it('should cancel on return false', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'other';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(testCount).to.equal(1);
                    (0, chai_1.expect)(otherCount).to.equal(0);
                    return [2];
            }
        });
    }); });
    it('should change hash on return string', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'another';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(testCount).to.equal(0);
                    (0, chai_1.expect)(otherCount).to.equal(0);
                    return [2];
            }
        });
    }); });
});
describe('Router.addFunctionGroup', function () {
    var router = new router_1.default();
    var route0Count = 0;
    var route0GroupChange = false;
    var route1Count = 0;
    var route1GroupChange = false;
    var exitCount = 0;
    var exitGroupChange = false;
    function resetCounts() {
        route0Count = 0;
        route0GroupChange = false;
        route1Count = 0;
        route1GroupChange = false;
        exitCount = 0;
        exitGroupChange = false;
    }
    router.addFunctionGroup('test', [
        function () {
            route0Count++;
            route0GroupChange = router.changedRouteGroup;
        }, function (id) {
            route1Count++;
            route1GroupChange = router.changedRouteGroup;
        }
    ], function () {
        exitCount++;
        exitGroupChange = router.changedRouteGroup;
    });
    it('should add multiple Routes into a RouteGroup', function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    resetCounts();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 1:
                    _a.sent();
                    router.start(true);
                    return [4, (0, TestUtils_1.wait)(0)];
                case 2:
                    _a.sent();
                    window.location.hash = 'test';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 3:
                    _a.sent();
                    window.location.hash = 'test/1';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 4:
                    _a.sent();
                    window.location.hash = '';
                    return [4, (0, TestUtils_1.wait)(0)];
                case 5:
                    _a.sent();
                    router.stop();
                    (0, chai_1.expect)(route0Count).to.equal(1);
                    (0, chai_1.expect)(route0GroupChange).to.equal(true);
                    (0, chai_1.expect)(route1Count).to.equal(1);
                    (0, chai_1.expect)(route1GroupChange).to.equal(false);
                    (0, chai_1.expect)(exitCount).to.equal(1);
                    (0, chai_1.expect)(exitGroupChange).to.equal(true);
                    return [2];
            }
        });
    }); });
});
//# sourceMappingURL=Router_Test.js.map