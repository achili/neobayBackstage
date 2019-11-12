let ModuleType = {

  PUBLIC:"PUBLIC",
  OFFICIAL:"OFFICIAL",
  ENTRY_APPLY:"ENTRY_APPLY",
  STARTUP_PROJECT:"STARTUP_PROJECT",
  KEEPER_BUSINESS:"KEEPER_BUSINESS",
  ENTREPRENEUR_SERVICES:"ENTREPRENEUR_SERVICES",
  INVESTMENT:"INVESTMENT",
  SPACE:"SPACE",
  PROTOCOL:"PROTOCOL",
  FINANCE:"FINANCE",
  USER:"USER",
  MESSAGE:"MESSAGE",
  SYSTEM:"SYSTEM",
  SURVEY:"SURVEY",
  SUMMARY:"SUMMARY",
  I_SPACE:"I_SPACE",
  OTHER:"OTHER"

}

let ModuleTypeMap = {

  PUBLIC: {
    name: "公共接口",
    value: "PUBLIC",
    style: "info"
  },
  OFFICIAL: {
    name: "官方网站",
    value: "OFFICIAL",
    style: "info"
  },
  ENTRY_APPLY: {
    name: "入驻评审",
    value: "ENTRY_APPLY",
    style: "info"
  },
  STARTUP_PROJECT: {
    name: "创业项目",
    value: "STARTUP_PROJECT",
    style: "info"
  },
  KEEPER_BUSINESS: {
    name: "企业管家",
    value: "KEEPER_BUSINESS",
    style: "info"
  },
  ENTREPRENEUR_SERVICES: {
    name: "创业者服务",
    value: "ENTREPRENEUR_SERVICES",
    style: "info"
  },
  INVESTMENT: {
    name: "投融资",
    value: "INVESTMENT",
    style: "info"
  },
  SPACE: {
    name: "创业空间",
    value: "SPACE",
    style: "info"
  },
  PROTOCOL: {
    name: "合同签约",
    value: "PROTOCOL",
    style: "info"
  },
  FINANCE: {
    name: "财务管理",
    value: "FINANCE",
    style: "info"
  },
  USER: {
    name: "用户管理",
    value: "USER",
    style: "info"
  },
  MESSAGE: {
    name: "消息中心",
    value: "MESSAGE",
    style: "info"
  },
  SYSTEM: {
    name: "系统",
    value: "SYSTEM",
    style: "info"
  },
  SURVEY: {
    name: "表单",
    value: "SURVEY",
    style: "info"
  },
  SUMMARY: {
    name: "汇总统计",
    value: "SUMMARY",
    style: "info"
  },
  I_SPACE: {
    name: "智慧空间",
    value: "I_SPACE",
    style: "info"
  },
  OTHER: {
    name: "其他",
    value: "OTHER",
    style: "info"
  }

}


let ModuleTypeList = [];
for (let key in ModuleTypeMap) {
  if (ModuleTypeMap.hasOwnProperty(key)) {
    ModuleTypeList.push(ModuleTypeMap[key]);
  }
}

export {ModuleType, ModuleTypeMap, ModuleTypeList};
