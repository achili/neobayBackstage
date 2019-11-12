# js中数组的各种操作

### 1、数组的创建

创建一个数组
```
var arrayObj = new Array();
```

创建一个数组并指定长度，注意不是上限，是长度
```
var arrayObj = new Array([size]);
```

创建一个数组并赋值
```
var arrayObj = new Array([element0[, element1[, ...[, elementN]]]]);　
```

要说明的是，虽然第二种方法创建数组指定了长度，但实际上所有情况下数组都是变长的，也就是说即使指定了长度为5，仍然可以将元素存储在规定长度以外的，注意：这时长度会随之改变。
    
### 2、数组的元素的访问

获取数组的元素值
```
var testGetArrValue=arrayObj[1];
```


给数组元素赋予新的值
```
arrayObj[1]= "这是新值";
```

### 3、数组元素的添加

将一个或多个新元素添加到数组结尾，并返回数组新长度
```
arrayObj. push([item1 [item2 [. . . [itemN ]]]]);
```

将一个或多个新元素添加到数组开始，数组中的元素自动后移，返回数组新长度
```
arrayObj.unshift([item1 [item2 [. . . [itemN ]]]]);
```


将一个或多个新元素插入到数组的指定位置，插入位置的元素自动后移，返回""
```
arrayObj.splice(insertPos,0,[item1[, item2[, . . . [,itemN]]]]);。
```


### 4、数组元素的删除

移除最后一个元素并返回该元素值
```
arrayObj.pop();
```
移除最前一个元素并返回该元素值，数组中元素自动前移
```
arrayObj.shift();
```

删除从指定位置deletePos开始的指定数量deleteCount的元素，数组形式返回所移除的元素
```
arrayObj.splice(deletePos,deleteCount);
```

清空数组
```
arrayObj.splice(0,arrayObj.length);
```

### 5、数组的截取和合并

以数组的形式返回数组的一部分，注意不包括 end 对应的元素，如果省略 end 将复制 start 之后的所有元素
```
arrayObj.slice(start, [end]);
```

将多个数组（也可以是字符串，或者是数组和字符串的混合）连接为一个数组，返回连接好的新的数组
```
arrayObj.concat([item1[, item2[, . . . [,itemN]]]]);
```


### 6、数组的拷贝
返回数组的拷贝数组，注意是一个新的数组，不是指向
```
arrayObj.slice(0);
```

返回数组的拷贝数组，注意是一个新的数组，不是指向
```
arrayObj.concat();
```

### 7、数组元素的排序
反转元素（最前的排到最后、最后的排到最前），返回数组地址
```
arrayObj.reverse();
```
对数组元素排序，返回数组地址
```
arrayObj.sort();
```

### 8、数组元素的字符串化

返回字符串，这个字符串将数组的每一个元素值连接在一起，中间用 separator 隔开。
```
arrayObj.join(separator);
```

toLocaleString 、toString 、valueOf：可以看作是join的特殊用法，不常用


### 9、数组追加一个数组。

```

>>> a = [1, 2]
[1, 2]
>>> b = [3, 4, 5]
[3, 4, 5]
>>> a.push.apply(a, b)
>>> a
[1, 2, 3, 4, 5]

```