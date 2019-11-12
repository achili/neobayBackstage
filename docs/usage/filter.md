Filter
==

##使用方法


#### 1.写filter函数

  使用`import` `export`风格在`common/filter`下写，`string`相关的放在`str.js`中，相关的放在`time.js`下面，验证相关的放在`validate.js`下面。
  
  
  
  
#### 2.引入到`index.js`中

  `common/filter`文件夹下除了index.js，其余的均要引入到`index.js`中
  
  
  
#### 3.使用

  使用方法有三种
  
    1.直接在html中使用，如：{{article.createTime | str2simpleDateTime}}
    
    2.在js中使用，如 console.log( this.$options.filters.getExtension("零号湾.jpg"))

    3.还是在js中使用，使用之前先import：
    
      import {simpleDateTime} from '../../../common/filter/time'
      
      然后像普通函数调用一样：
      
      simpleDateTime(this.pickerTime);
