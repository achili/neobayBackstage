let Type = {
	NURSERY: "NURSERY",
	INCUBATOR: "INCUBATOR",
  CIRCULATE: "CIRCULATE",
	ACCELERATOR: "ACCELERATOR"
}

let TypeMap = {
	NURSERY: {
		name: "开放式工位",
		value: "NURSERY",
		style: "success"
	},
	INCUBATOR: {
		name: "2号楼独立空间",
		value: "INCUBATOR",
		style: "info"
	},
  CIRCULATE: {
    name: "流动工位",
    value: "CIRCULATE",
    style: "info"
  },
	ACCELERATOR: {
		name: "1号楼独立空间",
		value: "ACCELERATOR",
		style: "primary"
	}
}


let TypeList = [];
for (let key in TypeMap) {
	if (TypeMap.hasOwnProperty(key)) {
		TypeList.push(TypeMap[key]);
	}
}

export {Type, TypeMap, TypeList};
