Javascript中的类
==


[Javascript定义类（class）的三种方法](http://www.ruanyifeng.com/blog/2012/07/three_ways_to_define_a_javascript_class.html)
[Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)
[Javascript 面向对象编程（一）：封装](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html)
[Javascript面向对象编程（二）：构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance.html)
[Javascript面向对象编程（三）：非构造函数的继承](http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_inheritance_continued.html)



### 一、构造函数法

```javascript 1.5

　　function Cat() {
　　　　this.name = "大毛";
　　}

　　var cat1 = new Cat();
　　alert(cat1.name); // 大毛

		Cat.prototype.makeSound = function(){
　　　　alert("喵喵喵");
　　}


```