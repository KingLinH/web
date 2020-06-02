function Hero(name,msg){
	this.name = name;
	this.msg = msg;
}

Hero.prototype.update = function(){
	console.log(this.name + '收到了:' + this.msg.getState());
}