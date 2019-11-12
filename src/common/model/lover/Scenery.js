import Base from "../base/Base";


//该类表示自定义页面。
export default function Scenery(id = null, component = null, name = null, description = null) {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.id = id;
	this.name = name;
	this.description = description;

	//view是一个vue component类型。
	this.component = component;
}


//extend Base's methods.
Scenery.prototype = new Base();
Scenery.prototype.constructor = Scenery;

//We use this method to get the full js Object.
Scenery.prototype.render = function (obj) {

	Base.prototype.render.call(this, obj);

}
