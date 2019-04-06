import * as assert from "assert";

class Divider {
    /**
     *  Class for dividing two numbers
     */
    constructor(private dinominator: number, private numerator: number) {
    }

    // find a reasonable range
    private findRange(n: number, piv: number, num: number, l: number){
        if (n * piv <= num) return [piv, l];
        else return this.findRange(n, Math.ceil(piv/2), num, piv);
    }

    // TODO use recursive function instead
    // Use binary search algorithm to implement
    private reduceRange(x: number, num: number, range: number[]){
        console.log(range);
        while(true){
            var mid = Math.floor(range.reduce((a, b) => a+b) / 2);
            if (x * mid && x * mid > num) range[1] = mid;
            else range[0] = mid;

            if (range[1] - range[0] <= 1){
                let result = 0;
                if (range[1] * x <= num) result = range[1];
                else if (range[0] * x <= num) result = range[0];
                return result;
            }
        }
    }

    private calc(den: number, num: number){
        if (num - den == 1) return 1;
        if (this.povValue(num) < this.povValue(den))
            den = 0;
        const wide_range = this.findRange(den < 0 ? den * -1 : den, num, num, 0);
        return this.reduceRange(den, num, wide_range);
    }

    private getResult() {
        if (this.dinominator == 0) throw "dinominator can either be > 0 || < 0, but can not be == 0";
        
        const result = {quotient: 0, remainder: 0};
        if (this.dinominator < 0 && this.numerator < 0)
            result.quotient = this.calc(this.dinominator * -1, this.numerator * -1);
        else result.quotient = this.calc(this.dinominator, this.numerator);

        // Work around for negative quotient
        if ((this.dinominator < 0 || this.numerator < 0) && result.quotient > 0) {
            if (!(this.dinominator < 0 && this.numerator < 0)) 
                result.quotient = result.quotient * -1;
        }

        result.remainder = this.numerator - (this.dinominator * result.quotient);
        return result;
    }

    public get result() {
        return this.getResult();
    }

    private povValue(value: number) {
        return value < 0 ? value * -1 : value;
    }
}

// Test case; Feel free to add as many here
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
]

// Run test against test cases
for (let i = 0, len = test_case.length; i < len; i++){
    let denominator = test_case[i].input[0];
    let numerator = test_case[i].input[1];
    let quotient = test_case[i].result[0];
    let remainder = test_case[i].result[1];

    const divider = new Divider(denominator, numerator).result;
    assert.strictEqual(
        divider.quotient, quotient, 
        `for numerator equals ${numerator} and denominator equals ${denominator}, expected quotient to be equal ${quotient} instead got ${divider.quotient}`
    );
    assert.strictEqual(
        divider.remainder, remainder,
        `for numerator equals ${numerator} and denominator equals ${denominator}, expected remainder to be equal ${remainder} instead got ${divider.remainder}`
    );
    console.log(`Test Passed for numerator equals ${numerator} and denominator equals ${denominator}, remainder: ${divider.remainder},  quotient: ${divider.quotient}`)
}
