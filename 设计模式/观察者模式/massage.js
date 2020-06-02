function Massage() {
	this._list = [];
	this.msg = 'hello';
}

Massage.prototype.attach = function(hero) {
	this._list.push(hero);
}

Massage.prototype.notify = function() {
	for (var i = 0; i < this._list.length; i++) {
		this._list[i].update();
	}
}

Massage.prototype.setState = function(msg) {
	this.msg = msg;
	this.notify();
}

Massage.prototype.getState = function() {
	return this.msg;
}
