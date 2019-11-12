NbRadio
==

一种样式更为好看的 `Checkbox`

### 来源

该控件样式和内部逻辑均采用[iCheck](http://www.bootcss.com/p/icheck/)，我们使用`vue`对其进行了封装，主要使用方法如下：

### 属性

#### `value`
	
	我们一般使用`v-model=""`这种语法糖来传入一个变量。`v-model`仅仅是一个语法糖，以下两句话等价：
	
```html
<input v-model="something">
<input v-bind:value="something" v-on:input="something = $event.target.value">
```

	所以要让组件的 v-model 生效，它必须：
	接受一个 value 属性
	在有新的 value 时触发 input 事件

	
#### `val`

	这个属性就是原生态checkbox中的value属性，当checkbox勾选时，获得的值就是它。

### 逻辑勾选框

对于`checkbox`有时候我们就只想知道其`checked`为`true`或者`false`。只需往`v-model`中传入`checked`的变量即可。

```html
<div>
	<NbCheckbox v-model="checked"></NbCheckbox>
	<label>自动登录</label>
</div>
```

```javascript
import NbCheckbox from "NbCheckbox.vue";
{
	components: {
  	NbCheckbox
  },
  data(){
    return {
      checked: true
    }
  }
}

```


### 数组勾选框

对于`checkbox`有时候我们希望知道已经勾选了得数组是什么，这时需要往`v-model`中传入一个数组变量，同时需要指定每一个`checkbox`的`val`.

```html
<div>
	<label>喜欢的科目</label>
</div>
<div>
	<NbCheckbox val="Chinese" v-model="courses"></NbCheckbox>
	<label>语文</label>
	<NbCheckbox val="Math" v-model="courses"></NbCheckbox>
	<label>数学</label>
	<NbCheckbox val="English" v-model="courses"></NbCheckbox>
	<label>英语</label>
	<NbCheckbox val="Physics" v-model="courses"></NbCheckbox>
	<label>物理</label>
	<NbCheckbox val="Chemistry" v-model="courses"></NbCheckbox>
	<label>化学</label>
	<NbCheckbox val="Biology" v-model="courses"></NbCheckbox>
	<label>生物</label>
</div>
<div>
	{{courses}}
</div>

```

```javascript
import NbCheckbox from "NbCheckbox.vue";
{
	components: {
  	NbCheckbox
  },
  data(){
    return {
      courses: ["Chinese"]
    }
  }
}

```