import Base from "../base/Base";

export default function Menu(name, path, active = false, icon = null, children = [], contain = [], but = []) {

	//extend Base's Attributes.
	Base.call(this, arguments);

	this.name = name;
	this.active = active;
	this.icon = icon;
	this.router = {
		path: path
	};
	this.children = children;

  this.contain = contain;
  this.but = but;
}



//extend Base's methods.
Menu.prototype = new Base();
Menu.prototype.constructor = Menu;

Menu.prototype.add = function (menu) {
	this.children.push(menu);
}

Menu.prototype.refreshChildrenActivity = function (path) {
  //递归函
  this.active = false;
  if(!this.children || this.children.length === 0) {

    //
    let indexOfList1 = this.router.path.lastIndexOf('/list');
    let indexOfList21 = path.lastIndexOf('/detail');
    let indexOfList22 = path.lastIndexOf('/edit');
    let indexOfList23 = path.lastIndexOf('/create');
    let indexOfList24 = path.lastIndexOf('/profile');
    let indexOfList25 = path.lastIndexOf('/list');
    let isList = false;
    if(indexOfList1 !== -1 && (indexOfList21 !== -1 || indexOfList22 !== -1 || indexOfList23 !== -1 || indexOfList24 !== -1 || indexOfList25 !== -1)) {
      let indexOfSpecific = Math.max(indexOfList21, indexOfList22, indexOfList23, indexOfList24, indexOfList25);
      isList = path.substring(0 ,indexOfSpecific) === (this.router.path.substring(0 ,indexOfList1));
    } else {
      isList = path === this.router.path;
    }
    if(isList === false) {
      this.contain.forEach(url => {
        if(url === path) {
          isList = true;
        }
      })
    }

    if(isList === true) {
      this.but.forEach(url => {
        if(url === path) {
          isList = false;
        }
      })
    }

    if(isList) {
      this.active = true;
      return true;
    } else {
      return false;
    }
  } else {
    let isActivity = false;
    this.children.forEach(menu => {
      if(menu.refreshChildrenActivity(path)) {
        isActivity = true;
      }
    });
    this.active = isActivity;
    return isActivity;
  }

}



