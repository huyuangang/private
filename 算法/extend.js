function extend2(){
	var args = arguments,
		i=1,
		l = args.length,
		reto,
		deep = false;
	reto = args[0];
	if(reto === true){
		deep = true;
		reto = args[1];
		i = 2;
	}
	if(!canExtend(reto) || i >= l){
		return reto;
	}
	for(; i < l; i++){
		var source = args[i];
		for(var prop in source){
			if(source.hasOwnProperty(prop)){
				if(deep && canExtend(reto[prop]) && canExtend(source[prop])){
					reto[prop] = merge(reto[prop], source[prop]);
				}
				else{
					reto[prop] = source[prop];
				}
			}
			
		}
	}
	return reto;
	function canExtend(o) {
		var s = Object.prototype.toString.apply(o);
		return s === '[object Object]' || s === '[object Array]' || s === '[object Function]'
	}
	function merge(obj1, obj2){
		for(var prop in obj2){
			if(obj2.hasOwnProperty(prop)){
				obj1[prop] = obj2[prop];
			}
		}
		return obj1;
	}
}