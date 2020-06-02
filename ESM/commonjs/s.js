var m = require('./math');

function circle(r) {
	return m.mul(m.square(r), m.PI);
}

module.exports = {
	s_circle: circle
}
