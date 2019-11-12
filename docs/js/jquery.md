jQuery Doc
==

### 有时候需要在command line中使用jQuery

```javascript 1.5

var script=document.createElement('script');
script.setAttribute("type","text/javascript");
var url="http://liyarou.com/assets/js/libs/jquery-1.9.1.min.js";
script.setAttribute("src", url);
document.getElementsByTagName("head")[0].appendChild(script);

$.get("http://localhost:8100/article/detail/1",function(json){console.log(json);});


$.ajax({
	url: "http://localhost:8100/article/page",
  headers: {
    Authorization:"bfbf2186f42c58176a0f916e3b03cffd"
  },
  type: "get",
  success: function (json) {
  	console.log(json);
  }
});

```

```javascript 1.5

function Animal() {
  
	this.name="动物";
	this.age=12;
}
Animal.prototype.TAG="animal";
Animal.prototype.TAGS="animals";



function Cat() {
	Animal.call(this, arguments);
  this.color="红色";
  
  this.miao();
  
}
Cat.prototype=new Animal();
Cat.prototype.constructor=Cat;

Cat.prototype.TAG="cat";
Cat.prototype.TAGS="cats";

Cat.prototype.miao=function() {
  console.log("miao");
}

function Pager(Clazz) {
  
	this.page=0;
	this.pageSize=12;
	
	this[Clazz.prototype.TAG]=null;
}


var a=new Animal();
var c=new Cat();
console.log(a);
console.log(c);

var p1=new Pager(Animal);
var p2=new Pager(Cat);

console.log(p1);
console.log(p2);




```