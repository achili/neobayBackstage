NumberInput
==

一种样式更为好看,兼容性更好的 `type Number Input`

### 作用

	该控件只能输入数字
	点击上下按钮可以实现里面数字增加和减少
	长按可以持续增加/减少
	
### 用法

	用`v-model=""`绑定一个变量，NumberInput的显示值将与该变量双向绑定
	变量的值始终为String
	可选参数：allowedNegative(Boolean) 默认是false