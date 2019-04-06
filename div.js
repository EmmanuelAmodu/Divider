"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert = require("assert");
var Divider = /** @class */ (function () {
    /**
     *  Class for dividing two numbers
     */
    function Divider(dinominator, numerator) {
        this.dinominator = dinominator;
        this.numerator = numerator;
    }
    // find a reasonable range
    Divider.prototype.findRange = function (n, piv, num, l) {
        if (n * piv <= num)
            return [piv, l];
        else
            return this.findRange(n, Math.ceil(piv / 2), num, piv);
    };
    // TODO use recursive function instead
    // Use binary search algorithm to implement
    Divider.prototype.reduceRange = function (x, num, range) {
        while (true) {
            var mid = Math.floor(range.reduce(function (a, b) { return a + b; }) / 2);
            if (x * mid && x * mid > num)
                range[1] = mid;
            else
                range[0] = mid;
            if (range[1] - range[0] <= 1) {
                var result = 0;
                if (range[1] * x <= num)
                    result = range[1];
                else if (range[0] * x <= num)
                    result = range[0];
                return result;
            }
        }
    };
    Divider.prototype.calc = function (den, num) {
        if (num - den == 1)
            return 1;
        if (this.povValue(num) < this.povValue(den))
            den = 0;
        var wide_range = this.findRange(this.povValue(den), num, num, 0);
        return this.reduceRange(den, num, wide_range);
    };
    Divider.prototype.getResult = function () {
        if (this.dinominator == 0)
            throw "dinominator can either be > 0 || < 0, but can not be == 0";
        var result = { quotient: 0, remainder: 0 };
        if (this.dinominator < 0 && this.numerator < 0)
            result.quotient = this.calc(this.dinominator * -1, this.numerator * -1);
        else
            result.quotient = this.calc(this.dinominator, this.numerator);
        // Work around for negative quotient
        if ((this.dinominator < 0 || this.numerator < 0) && result.quotient > 0) {
            if (!(this.dinominator < 0 && this.numerator < 0))
                result.quotient = result.quotient * -1;
        }
        result.remainder = this.numerator - (this.dinominator * result.quotient);
        return result;
    };
    Object.defineProperty(Divider.prototype, "result", {
        get: function () {
            return this.getResult();
        },
        enumerable: true,
        configurable: true
    });
    Divider.prototype.povValue = function (value) {
        return value < 0 ? value * -1 : value;
    };
    return Divider;
}());
// Test case; Feel free to add as many here
// TODO This should come from process.argv
var test_case = [
    {
        input: [5, -6],
        result: [-2, 4]
    },
    {
        input: [-5, 6],
        result: [-2, -4]
    },
    {
        input: [-5, -6],
        result: [1, -1]
    },
    {
        input: [5, 6],
        result: [1, 1]
    },
    {
        input: [20, 6],
        result: [0, 6]
    },
    {
        input: [-20, 6],
        result: [0, 6]
    },
    {
        input: [6, 20],
        result: [3, 2]
    },
    {
        input: [6, 29],
        result: [4, 5]
    },
    {
        input: [9, 80],
        result: [8, 8]
    }
];
// Run test against test cases
for (var i = 0, len = test_case.length; i < len; i++) {
    var denominator = test_case[i].input[0];
    var numerator = test_case[i].input[1];
    var quotient = test_case[i].result[0];
    var remainder = test_case[i].result[1];
    var divider = new Divider(denominator, numerator).result;
    assert.strictEqual(divider.quotient, quotient, "for numerator equals " + numerator + " and denominator equals " + denominator + ", expected quotient to be equal " + quotient + " instead got " + divider.quotient);
    assert.strictEqual(divider.remainder, remainder, "for numerator equals " + numerator + " and denominator equals " + denominator + ", expected remainder to be equal " + remainder + " instead got " + divider.remainder);
    console.log("Test Passed for numerator equals " + numerator + " and denominator equals " + denominator + ", remainder: " + divider.remainder + ",  quotient: " + divider.quotient);
}
