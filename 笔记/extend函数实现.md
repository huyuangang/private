# extend函数实现

描述：extend函数即扩展函数，在zepto、underscore等js库里都能找到，我根据自己的理解和想法实现了一下。

> 通过源对象扩展目标对象的属性，源对象属性将覆盖目标对象属性。
默认情况下为为浅拷贝（浅复制）。如果第一个参数为true表示深度拷贝（深度复制）。这是zepto.js对extend函数的解释。

## 各库对extend函数的实现对比
```js
// jquery
console.log($.extend());
//结果：Object {}
//underscore
console.log(_.extend());
//结果：undefined
//zepto
console.log($.extend());
//结果：undefined
```
从上面对比结果可见，当不传任何参数时，jquery返回一个空对象，而其他返回undefined，由此可见，jquery对目标对象进行了判断，而其他库则直接返回undefined。
```js
// jquery
console.log($.extend(1, [1,2,3], {a: 2}));
//结果：Object {0: 1, 1: 2, 2: 3, a: 2}
//underscore
console.log(_.extend(1, [1,2,3], {a: 2}));
//结果：1
//zepto
console.log(_.extend(1, [1,2,3], {a: 2}));
//结果：1
```
通过上面对比，当目标扩展对象参数为不可扩展变量时，jquery对其进行了处理，而其他库则直接返回该变量。事实在jquery源码中也得到了证明。

> 可扩展对象：函数、数组、对象这三种变量类型为可扩展类型，而其他类型则为不可扩展类型。

对于目标扩展对象处理还是不处理？其实这个问题只存在于封装者怎么认为，而使用者除了测试应该不会瞎搞吧。

## 最简版实现
只能浅复制，没有类型判断。
```js
function extend(){
	var args = arguments,
		l = args.length,
		reto;
	reto = args[0];
	for(var i = 1; i < l; i++){
		var source = args[i];
		for(var prop in source){
			if(source.hasOwnProperty(prop))
			reto[prop] = source[prop];
		}
	}
	return reto;
}
```
测试结果：
![extend最简版测试结果](http://ojwrejtvt.bkt.clouddn.com/17-7-16/59448916.jpg)
> 由于没有类型判断,所以当目标扩展对象为不可扩展变量时，程序仍然会遍历后面的参数，进行扩展，实际上这部分代码是徒劳，如果扩展对象变多时，代码性能就会降低了。

## 增加类型判断优化
```js
function extend1(){
	var args = arguments,
		l = args.length,
		reto;
	reto = args[0];
	//判断是否为可扩展函数，不是则提前返回
	if(!canExtend(reto)){
		return reto;
	}
	for(var i = 1; i < l; i++){
		var source = args[i];
		for(var prop in source){
			if(source.hasOwnProperty(prop))
			reto[prop] = source[prop];
		}
	}
	return reto;
	//判断函数
	function canExtend(o) {
		var s = Object.prototype.toString.apply(o);
		return s === '[object Object]' || s === '[object Array]' || s === '[object Function]'
	}
}
```

## 增加深浅复制判断
在jquery中，判断深浅复制的方法是判断第一个参数是否为`boolean`类型，如果是，则把该值赋给内部的一个deep变量（其实就是判断深浅复制的），默认为false，那么既然是这样，那不如直接给deep默认值设false，判断第一个参数是否全等于`true`,这样就行了。
```js
function extend2(){
	var args = arguments,
		i=1,
		l = args.length,
		reto,
		deep = false;
	reto = args[0];
	//判断第一个参数是否为true，如果是表示深复制
	if(reto === true){
		deep = true;
		//目标扩展对象变为第二个参数
		reto = args[1];
		i = 2;
	}
	//如果目标扩展对象为不可扩展对象或者已经是最后一个参数了则提前返回
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
	//判断是否为可扩展对象
	function canExtend(o) {
		var s = Object.prototype.toString.apply(o);
		return s === '[object Object]' || s === '[object Array]' || s === '[object Function]'
	}
	//合并两个可扩展对象
	function merge(obj1, obj2){
		for(var prop in obj2){
			if(obj2.hasOwnProperty(prop)){
				obj1[prop] = obj2[prop];
			}
		}
		return obj1;
	}
}
```
> 添加一个merge函数是因为在调用之前已经判断好两个合并对象是可扩展对象，虽然可以递归调用extend函数，但是这样会造成重复的判断，所以就没有必要啦。

#### 测试

测试数据：

`{a: 1 , b:{x:1}}, {a:2, b:{y:1}}`

测试结果：
![extend深浅复制测试结果](http://ojwrejtvt.bkt.clouddn.com/17-7-16/32464463.jpg)


## 相关链接

[jquery.extend源码解析](http://www.cnblogs.com/charling/p/3452677.html)
[extend函数实现github地址](https://github.com/huyuangang/person/blob/master/%E7%AE%97%E6%B3%95/extend.js)

