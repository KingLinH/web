define(['./math'], function(m1) {                 //依赖模块需要填入参数，依赖多个模块需要填入对应参数
	function circle(r) {
		return m1.multiple(m1.PI, m1.square(r))
	}

	return {
		s_circle: circle
	}
})
