function Factory(){
	
}

Factory.create = function(type){
	switch(type){
		case 'apple':
			return new Apple();
		case 'banana':
			return new Banana();
		case 'orange':
			return new Orange();
		default:
			break;
	}
}