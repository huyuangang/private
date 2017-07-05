# 工欲善其事必先利其器之前端编辑器 - Sublime篇

描述：由于个人开发的时候对工具要求比较高（可能是有强迫症吧），每次重装编辑器之后都要配置好久，各种翻别人博客，所以就写个笔记记录一下啦。

## Sublime配置
> 下载地址：[sublime](http://www.sublimetext.com/)

### 插件
#### 1.Package Control：插件管理
这个就不介绍了，安装地址在这：[Package Control 安装地址](https://packagecontrol.io/installation)
#### 2.Emmet：代码提示插件
这个应该都知道吧，不过个人感觉好像有问题，装了之后也没感觉到代码提示了多少TnT。
#### 3.Better Completion
又一个代码提示插件，不过需要配置一下，看下面：
```js
{
	//把你需要提示的改为true就行啦。
	"completion_active_list": {
		"css-properties": false,
		"gruntjs-plugins": false,
		"html": false,
		"lodash": false,
		"javascript": true,
		"jquery": false,
		"jquery-sq": false, // Single Quote
		"php": false,
		"phpci": false,
		"sql": false,
		"twitter-bootstrap": false,
		"twitter-bootstrap-less-variables": false,
		"twitter-bootstrap3": false,
		"twitter-bootstrap3-sass-variables": false,
		"underscorejs": false,
		"react": false
	}
}

```
#### 4.AutoFileName：补全文件路径
#### 5.DocBlockr：代码注释
#### 6.Markdown Preview：markdown预览插件
快捷键绑定：
```js
[
    { "keys": ["ctrl+m"], "command": "markdown_preview", "args":   {"target": "browser", "parser":"markdown"} }
]
```
#### 7.PakageResourceViewer：插件源码查看
本来装好的插件直接用文本打开是一堆看不懂的东西，但是用这个打开就能看见配置，最实用就是拿来修改侧边栏样式啦。

修改步骤：
（1）通过Package Control安装好PackageResourceViewer插件
（2）Ctrl+shift+p，选择PackageResourceViewer：Open Resource，然后选择你要打开的样式包
（3）Ctrl+f，搜索sidebar_lable，修改font.size即侧边栏字体大小，修改font.face即侧边栏字体
#### 8.Theme - itg.flat：好看的编码主题
### 个人设置
```js
{
	"color_scheme": "Packages/Theme - itg.flat/itg.dark.tmTheme",
	"font_face": "Source Code Pro",
	"font_size": 11,
	"ignored_packages":
	[
		"Vintage"
	],
	"theme": "itg.flat.dark.sublime-theme"
}
```
