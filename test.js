var assert = require("assert");

var Divider = require("./div.js");

assert.strictEqual(new Divider(5, -6).result.quotient, -2);
assert.strictEqual(new Divider(5, -6).result.remainder, 4, "Remainder failed");