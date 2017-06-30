# Vue-verify:基于Vue的表单验证插件

描述：众所周知，vue是一个渐进式web框架，不论学习到什么阶段都能做一些东西，在做项目中，表单验证总是避免不了，为了方便，所以就做了这个表单验证插件。

> 实现思路：通过混合得到通用的验证规则，通过指令绑定得到需要验证的值、验证规则和验证触发的条件

## 定义验证规则
```js
const verify = {
    phone: {
        rule: /^(13|14|15|17|18)\d{9}$/,
        tip: '请输入正确的手机号'
    },
    email: {
        rule: /^([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
        tip: '输入正确的邮箱'
    },
    other: function (checkStr) {
        if (checkStr === '')
            return '此项不能为空';    
        return true;
    }
}
```
验证规则有两种形式：
1.如上代码中的phone和email对象，里面的rule则为验证的正则表达式，tip是当验证错误是显示的信息。
2.如上代码中的other，可以直接定义函数，该函数接收一个参数，即验证的字符串，使用这种方式的时候注意：当验证正确时，一定返回true，当验证错误时，返回想要显示的提示信息。
## 指令绑定
使用本插件将扩展一个指令，即v-verify，使用方法如下：
```html
<input type="text" v-model='test'>
<span v-verify:other.blur>
	<!--当需要提示信息时，data-verify属性必不可少，这个是用来指定当验证正确或错误时展示的内容-->
    <span class='success' data-verify='true'>验证正确</span>
    <!--当验证错误时，{%error%}将替换为错误信息，该串固定-->
    <span class='fail' data-verify='false'><i></i>{%error%}</span>
</span>
<br>
<label for="">请输入手机号：</label>
<br>
<input type="text" v-model='phone'>
<span v-verify:phone.keyup>
    <span class='success' data-verify='true'>验证正确</span>
    <span class='fail' data-verify='false'><i></i>{%error%}</span>
</span>
<br>
<label for="">请输入邮箱：</label>
<br>
<input type="text" v-model='email'>
<span v-verify:email.blur>
    <span class='success' data-verify='true'>验证正确</span>
    <span class='fail' data-verify='false'><i></i>{%error%}</span>
</span>
```
事件绑定格式：`v-verify:phone.blur`
':'符号后面的为验证规则，'.'符号后面的为触发条件，当然你也可以指定多个验证规则和多个触发条件`v-verify:phone:email:other.blur.keydown.change`

> 最最重要的一点是：当使用v-verify指令的时候，绑定这个指令的前一个兄弟节点一定是input,否则该节点将被移除

## 相关链接
[Vue-verify插件Github地址](https://github.com/huyuangang/vue-verify)
[Vue插件开发官网介绍](https://cn.vuejs.org/v2/guide/plugins.html)