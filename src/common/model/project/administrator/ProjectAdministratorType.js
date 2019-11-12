let Type = {
  MANAGE: "MANAGE",
  ORDINARY: "ORDINARY"
}
let TypeMap = {
  MANAGE: {
    name: "管理员",
    value: "MANAGE",
    style: "success"
  },
  ORDINARY: {
    name: "普通成员",
    value: "ORDINARY",
    style: "info"
  }
}


let TypeList = [];
for (let key in TypeMap) {
  if (TypeMap.hasOwnProperty(key)) {
    TypeList.push(TypeMap[key]);
  }
}

export {Type, TypeMap, TypeList};
