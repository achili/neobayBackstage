Tank
==

[使用说明](http://tank.neobay.cn/)

### 使用tank来上传文件的步骤：

### 1.引入Tank.vue.

```
import Tank from '../../../common/widget/Tank'
```

### 2.使用<tank></tank>

```
<tank condition="image" privacy="false" :callback="imageCallback"></tank>

```
tank的属性有以下：

#### `condition`

允许上传的文件类型，可以是以下三种中的一种：
  
    1. * 表示允许所有类型 
    
    2.可以上传的文件后缀名， 用|分隔，如：.pdf|.doc|.ppt 
    
    3.可以上传的文件类型，text,audio,video,image 四种的组合，用|分隔，如：image|audio

#### `privacy` 

    false表示无需授权任何人均可访问该文件，true表示必须授权才能访问该文件。
    
    一般情况下，图片上传应该选用false，计划书，申请单等上传应该用true.
  
#### `:callback` 

    回掉函数，传回来的值第一个code是文件的唯一标识
    
    如果privacy是false，那么有第二个值，是公有文件的url链接。
  
