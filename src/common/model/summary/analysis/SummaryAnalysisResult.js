import Vue from "vue";

import Base from "../../base/Base";

let Type = {
  NONE: "NONE",
  BROKEN_LINE: "BROKEN_LINE",
  BAR_GRAPH: "BAR_GRAPH",
  PIE_RICH: "PIE_RICH"
}
let TypeMap = {
  NONE: {
    name: "数值",
    value: "NONE",
    style: "success",
    icon: "hourglass"
  },
  BROKEN_LINE: {
    name: "折线图",
    value: "BROKEN_LINE",
    style: "success",
    icon: "hourglass"
  },
  BAR_GRAPH: {
    name: "柱状图",
    value: "BAR_GRAPH",
    style: "success",
    icon: "hourglass"
  },
  PIE_RICH: {
    name: "饼图",
    value: "PIE_RICH",
    style: "success",
    icon: "hourglass"
  }
}


export default function SummaryAnalysisResult() {

  Base.call(this, arguments);
  //表标题
  this.title = null;
  //表述名
  this.note = null;
  //表类型
  this.type = Type.NONE;
  //分类
  this.categoryList = [];
  //数据
  this.dataList = [];

  ///界面
  this.option = {
    title: {
      text: '天气情况统计'//*******************
    },
    legend: {
      bottom: 10,
        left: 'center',
        data: ['西凉', '益州', '兖州', '荆州', '幽州']//*******************
    },
    series: [
      {
        type: 'pie',
        //饼图的半径
        radius: '65%',
        //饼图的中心（圆心）坐标
        center: ['50%', '50%'],
        //支持选中
        selectedMode: 'single',
        data: [
          {value: 1548, name: '幽州'},//*******************
          {value: 535, name: '荆州'},//*******************
          {value: 510, name: '兖州'},//*******************
          {value: 634, name: '益州'},//*******************
          {value: 735, name: '西凉'}//*******************
        ],
        itemStyle: {
          emphasis: {
            //阴影效果
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
      tooltip: {
      trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    }
  };

  if (Vue.store.state.debug) {
    this.mockData();
  }
}

SummaryAnalysisResult.prototype = new Base();
SummaryAnalysisResult.prototype.constructor = SummaryAnalysisResult;

SummaryAnalysisResult.prototype.Type = Type;
SummaryAnalysisResult.prototype.TypeMap = TypeMap;
SummaryAnalysisResult.prototype.TypeList = SummaryAnalysisResult.prototype.getTypeList();


SummaryAnalysisResult.prototype.getFilters = function () {
  return [

  ];
};

//测试数据。
SummaryAnalysisResult.prototype.mockData = function () {
  //this.summaryAttributeInfo = [new SummaryAttribute(), new SummaryAttribute()];
}

//We use this method to get the full js Object
SummaryAnalysisResult.prototype.render = function (obj, one2one = false) {

  Base.prototype.render.call(this, obj);

  this.getOption();

}

SummaryAnalysisResult.prototype.getForm = function () {

  let form = {

  };
  if (this.id) {
    form.id = this.id;
  }
  return form;
}

SummaryAnalysisResult.prototype.validate = function () {
  this.errorMessage = null;
  return true;
}

SummaryAnalysisResult.prototype.getOption = function () {
  if(this.type === Type.NONE) {
    this.option = {
      name: this.dataList[0].name,
      value: parseFloat(this.dataList[0].value[0])
    }
  } else if(this.type === Type.PIE_RICH) {
    this.getPieOption();
  } else if(this.type === Type.BROKEN_LINE) {
    this.getBrokenOption();
  } else if(this.type === Type.BAR_GRAPH) {
    this.getBarOption();
  }
}



SummaryAnalysisResult.prototype.getBrokenOption = function () {
  let dataNameList = [];
  let dataList = [];
  this.dataList.forEach(date => {
    dataNameList.push(date.name);
    let copyDate = {
      name: date.name,
      type: "line",
      data: []
    }
    for(let i = 0; i < date.value.length; i++) {
      copyDate.data.push(parseFloat(date.value[i]));
    }
    dataList.push(copyDate)
  })
  this.option = {
    //标题
    title: {
      text: this.title
    },
    //图例
    legend: {
      data: dataNameList
    },
    //X轴
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: this.categoryList,
      axisLabel:{
        interval: 0,//横轴信息全部显示
        rotate: -30//-30度角倾斜显示
      }
    },
    //数据
    series: dataList,
    yAxis: {type: 'value'},
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    //极坐标位置
    grid: {
      left: '0%',
      right: '10%',
      bottom: '3%',
      containLabel: true,
      y2: 140
    }
  }
  return this.option;
}
SummaryAnalysisResult.prototype.getBarOption = function () {
  let dataList = [];
  this.dataList.forEach(date => {
    let copyDate = {
      name: date.name,
      type: "bar",
      data: []
    }
    for(let i = 0; i < date.value.length; i++) {
      copyDate.data.push(parseFloat(date.value[i]));
    }
    dataList.push(copyDate)
  })
  this.option = {
    title: {
      text: this.title
    },
    xAxis : [
      {
        type : 'category',
        data : this.categoryList,
        axisTick: {alignWithLabel: true},
        axisLabel:{
          interval: 0,//横轴信息全部显示
          rotate: -30//-30度角倾斜显示
        }
      }
    ],
      series : dataList,
      yAxis : [{type : 'value'}],
      toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    tooltip : {
      trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    grid: {
      left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    }
  }
}
SummaryAnalysisResult.prototype.getPieOption = function () {
  let dataList = [];
  for(let i = 0; i < this.categoryList.length; i++) {
    let copyDate = {
      name: this.categoryList[i],
      value: parseFloat(this.dataList[0].value[i])
    }
    dataList.push(copyDate)
  }
  this.option = {
    title: {
      text: this.title
    },
    legend: {
      // bottom: 10,
      // left: 'center',
      data: this.categoryList,
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20
    },
    series: [
      {
        type: 'pie',
        //饼图的半径
        radius: '65%',
        //饼图的中心（圆心）坐标
        center: ['50%', '50%'],
        //支持选中
        selectedMode: 'single',
        data: dataList,
        itemStyle: {
          emphasis: {
            //阴影效果
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }
    ],
    tooltip: {
      trigger: 'item',
      formatter: "{b} : {c} ({d}%)"
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    }
  }
}
