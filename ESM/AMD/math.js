define(function() {                   //定义模块define
	var PI = 3.1415926;

	function multiple(num1, num2) {
		return num1 * num2;
	}

	function square(n) {
		return Math.pow(n,2);
	}
	return {
		PI: PI,                  //名称（自定）：返回的函数名
		multiple: multiple,
		square: square
	}
})
