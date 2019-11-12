NbRadio
==

一种样式更为好看的 `Radio`

### 来源

该控件样式和内部逻辑均采用[iCheck](http://www.bootcss.com/p/icheck/)，我们使用`vue`对其进行了封装，主要使用方法如下：

### 使用


三个属性分别是：

#### `value`
	
	我们一般使用`v-model=""`这种语法糖来传入一个变量。`v-model`仅仅是一个语法糖，以下两句话等价：
	
```html
<input v-model="something">
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

	所以要让组件的 v-model 生效，它必须：
	接受一个 value 属性
	在有新的 value 时触发 input 事件

### `name`

	给radio指定一个`name`，具有相同`name`属性的radio可以进行联动。
	
### `val`

	这个属性就是原生态radio中的value属性，当radio勾选时，获得的值就是它。

对于单选按钮而言，我们通常是希望知道到底选择到的是哪个值，比如：性别选择，男或女，那么就按照如下的方式使用：

```html
<div>
	<NbRadio v-model="gender" val="male" name="gender"></NbRadio>
	<label>男</label>
</div>
<div>
	<NbRadio v-model="gender" val="female" name="gender"></NbRadio>
	<label>女</label>
</div>
```

```javascript
import NbRadio from "NbRadio.vue";
{
	components: {
  	NbRadio
  },
  data(){
    return {
      gender: "female"
    }
  }
}

```
