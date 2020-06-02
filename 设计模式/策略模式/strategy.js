function Strategy() {

}
Strategy.prototype.way = function() {
	console.log('猥琐发育');
}

function StrategyA() {

}
StrategyA.prototype = Object.create(Strategy.prototype);
StrategyA.prototype.way = function() {
	console.log('入侵野区');
}

function StrategyB() {

}
StrategyB.prototype = Object.create(Strategy.prototype);
StrategyB.prototype.way = function() {
	console.log('中路打团');
}
