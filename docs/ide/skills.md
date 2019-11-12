# IDE使用技巧


## 反向捕捉替换技巧


### 在构造函数中要使用的。

我们希望把 `private xxx name`中的 `private xxx `替换成 `this.`
```
private [a-zA-Z]*
--->
this.
```
我们希望把 `private xxx name`中的 `private xxx `去掉
```
private [a-zA-Z]*
--->

```


我们希望把 `this.user`, 替换成 `user:this.user`,

```
this.([a-zA-Z]*)

--->

$1:this.$1

```

我们希望把 `xxxTime` 变成 `simpleDate(xxxTime)`

```

(this.[a-zA-Z]*Time)

--->

simpleDate($1)

```



我们希望把 `xxx;` 替换成以下的判断语句

```
([a-zA-Z]*);
--->
if (!this.$1) {
    this.errorMessage = "$1必填！";
    return false;
}
```