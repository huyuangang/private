# vue跨组件调用方法

描述：最近在项目中遇到一个场景，有两个组件，暂且叫a，b；鼠标事件mousedown在a组件触发，但实际上我希望的结果是触发b组件内部的方法。a组件和b组件的关系是叔侄关系，这里将问题简化为a、b组件为兄弟关系，即a、b同属于一个父组件。

## 几个所需的vue知识点

### 一、$refs：一个对象，持有已注册过 ref 的所有子组件

其实就是该组件中注册过ref的子组件的集合，可以通过这个对象去调用子组件的方法或读取属性（注意：最好仅读取，至于能不能修改，笔者没有尝试，即使能修改，也不建议修改，如果你了解vue）。

[https://cn.vuejs.org/v2/api/#vm-refs](https://cn.vuejs.org/v2/api/#vm-refs)

> 这里ref也可以用在普通标签上，这样你就可以直接取到你想要的dom了，而不需要用原生方法或jQuery查找

### 二、$emit： 触发当前实例上的事件。附加参数都会传给监听器回调。

即触发一个事件，相当于事件驱动。父组件监听子组件触发事件，再进行其他操作

[https://cn.vuejs.org/v2/api/#vm-emit](https://cn.vuejs.org/v2/api/#vm-emit)
[父子组件数据传递方式](https://cn.vuejs.org/v2/guide/components.html#组件组合)

### 三、$nextTick：将回调延迟到下次 DOM 更新循环之后执行。在修改数据之后立即使用它，然后等待 DOM 更新。
当vue检测到与dom渲染相关的数据变化时，vue并不是立即刷新，可能只是推入了一个更新队列，这里的猜测是由于上次在看vue源码是发现watch属性监听到变化时只是推入了一个watcher队列，并没有立即调用，所以大家在用watch的时候一定要小心了，并不是属性先变化就先调用该属性的watcher方法。细节没有深究。。

## 代码
父组件parent，由于组件标签不能与普通标签重名，a、b分别用child1、child2代替
```html
<template>
	<div>
		<!--监听子组件1触发的'emitMouseDown方法'-->
		<child1 @emitMouseDown="emitMousedown"></child1>
		<!--注册子组件引用-->
		<child2 ref="child2"></child2>
	</div>
</template>
<script>
	export default{
		methods: {
			emitMouseDown(payload) {
				//调用子组件2的内部方法
				this.$refs.child2.moveMouseDown(payload.event);
			}
		}
	}
</script>
```
子组件1
```html
<template>
	<div @mousedown="emitMouseDown($event)">
	</div>
</template>
<script>
	export default{
		methods: {
			emitMouseDown(event) {
				//触发emitMouseDown事件
				this.$emit('emitMouseDown', { event });
			}
		}
	}
</script>
```
子组件2
```html
<template>
	<div @mousedown="moveMouseDown">
	</div>
</template>
<script>
	export default{
		methods: {
			moveMouseDown(event) {
				...
			}
		}
	}
</script>
```
通过上面代码可以看出，父组件仅仅只是做了一个数据传递的介质而已。事实上在vue中兄弟组件之间的基础交互也确实是这样做的。
如果交互更加复杂或者关系更加复杂的组件可以用一个global event bus实现，再更加复杂的话就可以上vuex了。这里不再赘述

看完代码大家发现只用到了前面所说的两个知识点，而$nextTick并没有用上。这里又要说到一个在源码中看到的东西：micro task 和 macro task。micro task执行优先级是高于macro task的，而事件触发在vue中拥有高的优先级，而数据更新属于macro task，这样如果有数据更新时，可能导致执行顺序错误的问题，那么这里稳妥的办法就是利用$nextTick让数据更新完成后再触发事件。
