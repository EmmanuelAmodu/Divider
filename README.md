﻿# Divider

## Basic synopsis

This a class for performing division operation without using the native division operator.

All methods are private except the getter, since they are all only useful for the class (according to the current use case) and should not be overidden if inherited.

### Methods and Properties
* The class has a constructor that generates two properties from the aurguments `dinominator` and `numerator`.

* The method `findRange` finds an estimated wide range by using binary search algorithm taking the `denominator` as the start point and the `numerator` as the end point. It return a new start point and end point.

* The `reduceRange` reduces the wide range to find the quotient, it uses the binary search algorithm: it finds the mid point between the range, selects between the left and right a new range and repeats the process until the value of the difference between the start and end point is equals 1, it then selects between the final start and end point which is the quotient.

* The `calc` method simply executes the `findRange` method and passes its value to the `reduceRange` method to find the quotient.

* The `getResult` manages edge cases and executes the `calc` method.

* The getter method `result`  simply serve as the method for exposing the value of `getResult`;

* The `povValue` simple converts neg int to positive int

### Testing

The solution is implemented in typescript and has to be compiled to JS to run in nodejs

#### Steps
Run this commands in your console
- Steps 1:  `tsc --target es5 div.ts` to compile TS to JS
- Steps 2: `node div.js` to run script

or you can just chain both command as one if your console supports `tsc --target es5 div.ts | node div.js`
