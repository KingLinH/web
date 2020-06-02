var PI = 3.14;

function mul(num1, num2) {
	return num1 * num2;
}

function square(n) {
	return n * n;
}
module.exports = {      //相当于return
	PI: PI,
	mul: mul,
	square: square
}
