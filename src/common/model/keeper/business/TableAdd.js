import Base from "../../base/Base";
import TypeProcess from "./TypeProcess";

export default function TableAdd() {
  Base.call(this, arguments);

  this.title = null;
}

TableAdd.prototype = new Base();
TableAdd.prototype.constructor = TableAdd;

TableAdd.prototype.render = function (obj) {
  Base.prototype.render.call(this, obj);
};

TableAdd.prototype.getForm = function () {
  let form = {
    title: this.title
  };
  return form;
};
