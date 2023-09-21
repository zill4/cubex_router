"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chai_1 = require("chai");
var router_1 = require("../scripts/router");
describe('RouteUtils.getParameterNames', function () {
    it('should return an empty array for no parameters', function () {
        var params = router_1.RouteUtils.getParameterNames(function () { });
        (0, chai_1.expect)(params.length).to.equal(0);
    });
    it('should return an array of one parameter for one parameters', function () {
        var params = router_1.RouteUtils.getParameterNames(function (param0) { });
        (0, chai_1.expect)(params.length).to.equal(1);
        (0, chai_1.expect)(params[0]).to.equal('param0');
    });
    it('should return an array of many parameters for many parameters', function () {
        var params = router_1.RouteUtils.getParameterNames(function (param0, param1, param2) { });
        (0, chai_1.expect)(params.length).to.equal(3);
        (0, chai_1.expect)(params[0]).to.equal('param0');
        (0, chai_1.expect)(params[1]).to.equal('param1');
        (0, chai_1.expect)(params[2]).to.equal('param2');
    });
});
describe('RouteUtils.stringToRegex', function () {
    it('should return a regex with no parameters for a string with no parameters', function () {
        var regex = router_1.RouteUtils.stringToRegex('test');
        var match = 'test'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(1);
    });
    it('should return a regex with one parameter for a string with one parameters', function () {
        var regex = router_1.RouteUtils.stringToRegex('test/:id');
        var match = 'test/1'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(2);
        (0, chai_1.expect)(match[1]).to.equal('1');
    });
    it('should return a regex with many parameters for a string with many parameters', function () {
        var regex = router_1.RouteUtils.stringToRegex('test/:id/:name/:value');
        var match = 'test/1/thing/a value'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(4);
        (0, chai_1.expect)(match[1]).to.equal('1');
        (0, chai_1.expect)(match[2]).to.equal('thing');
        (0, chai_1.expect)(match[3]).to.equal('a value');
    });
    it('should return a regex with many parameters for a string with many parameters and a query', function () {
        var regex = router_1.RouteUtils.stringToRegex('test/:id/:name/:value?:query');
        var match = 'test/1/thing/a value?and stuff'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(5);
        (0, chai_1.expect)(match[1]).to.equal('1');
        (0, chai_1.expect)(match[2]).to.equal('thing');
        (0, chai_1.expect)(match[3]).to.equal('a value');
        (0, chai_1.expect)(match[4]).to.equal('and stuff');
    });
    it('should return a regex with many parameters for an encoded string with many parameters and a query', function () {
        var regex = router_1.RouteUtils.stringToRegex('test/:id/:complexValue0/:name/:complexValue1');
        var complexValue0 = 'a complex # value / with ? invalid characters';
        var complexValue1 = 'a complex ? value / with # invalid characters';
        var values = [
            'test',
            '1',
            encodeURIComponent(complexValue0),
            'thing',
            encodeURIComponent(complexValue1)
        ];
        var testHash = values.join('/');
        var match = testHash.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(5);
        var result = match.map(function (value) { return decodeURIComponent(value); });
        (0, chai_1.expect)(result[1]).to.equal('1');
        (0, chai_1.expect)(result[2]).to.equal(complexValue0);
        (0, chai_1.expect)(result[3]).to.equal('thing');
        (0, chai_1.expect)(result[4]).to.equal(complexValue1);
    });
});
describe('RouteUtils.functionToRegex', function () {
    it('should return a regex with no parameters for a function with no parameters', function () {
        var regex = router_1.RouteUtils.functionToRegex('test', function () { });
        var match = 'test'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(1);
    });
    it('should return a regex with one parameter for a function with one parameters', function () {
        var regex = router_1.RouteUtils.functionToRegex('test', function (id) { });
        var match = 'test/1'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(2);
        (0, chai_1.expect)(match[1]).to.equal('1');
    });
    it('should return a regex with many parameters for a function with many parameters', function () {
        var regex = router_1.RouteUtils.functionToRegex('test', function (id, name, value) { });
        var match = 'test/1/thing/a value'.match(regex);
        (0, chai_1.expect)(match).to.be.instanceof(Array);
        (0, chai_1.expect)(match.length).to.equal(4);
        (0, chai_1.expect)(match[1]).to.equal('1');
        (0, chai_1.expect)(match[2]).to.equal('thing');
        (0, chai_1.expect)(match[3]).to.equal('a value');
    });
});
//# sourceMappingURL=RouteUtils_Test.js.map