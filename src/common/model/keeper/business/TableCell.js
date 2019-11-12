import Base from "../../base/Base";
import TypeProcess from "./TypeProcess";

export default function TableCell() {
  Base.call(this, arguments);

  this.title = null;
  this.content = null;
  // 英文翻译
  this.translate = null;
}

TableCell.prototype = new Base();
TableCell.prototype.constructor = TableCell;

TableCell.prototype.render = function (obj) {
  Base.prototype.render.call(this, obj);
};

TableCell.prototype.getForm = function () {
  let form = {
    title: this.title,
    content: this.content,
    translate: this.translate
  };
  return form;
};
