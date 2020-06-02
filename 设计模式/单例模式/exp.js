function DM(){
	if(!dm._instance){
		DM._instance = {
			count:30,
			saySth:function(){
				
			},
			countDown:function(){
				
			},
			show:function(){
				
			},
			dead:function(){
				this.countDown();
			}
			
		}
	}
	return DM._instance;
}