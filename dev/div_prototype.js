// find a reasonable range
function findRange(n, piv, num, l){
	if (n * piv <= num) return [piv, l];
	else return findRange(n, Math.ceil(piv/2), num, piv);
}

// TODO use recursive function instead
// Use binary search logic to implement
function minimizeRange(x, num, range){
    while(true){
        var mid = Math.floor(range.reduce((a, b) => a+b)/2);
        if (x * mid > num) range[1] = mid;
        else range[0] = mid;

        if (range[1] - range[0] <= 1){
            if (range[1] * x <= num) return range[1];
            else if (range[0] * x <= num) return range[0];
            // just incase
            return new Error("Could not evaluate result");
        }
    }
}

function run(num, den) {
    var wide_range = findRange(5, num - den, num, 0);
    return minimizeRange(den, num, wide_range);
}

main(23, 5);
