图标计划：
1.单类折线图：带鼠标坐标线 http://echarts.baidu.com/examples/editor.html?c=line-sections  对应文档中的第一类
2.多类折线图：带鼠标坐标线和图例 http://echarts.baidu.com/examples/editor.html?c=line-stack  对应文档中的第四类 -----》可自定义统计分析
3.点击出现拆分动画的饼状图：http://echarts.baidu.com/examples/editor.html?c=pie-rich-text  -----》可自定义统计分析
4.柱状图：带悬浮标识高度：http://echarts.baidu.com/examples/editor.html?c=bar-tick-align



##### 1.为了精简项目  我们统一使用 Line 主题，并且不定义任何颜色；  
##### 2.SVG渲染会出现：导出的图片无法打开，图内部按钮无法点击的问题，所以暂时使用 Canvas ；
##### 3.为了精简项目，决定只更改以下属性：  
title  
legend  
yAxis  
xAxis  
series  

###数据：
分类列表：categoryList
分组列表：dataList

#####折线图 
时间间隔timeIntervalType-分类表categoryList-影响X轴  
分组依据classifyAttribute-分组表dataList：影响图例和数据  

#####柱状图 
分组依据classifyAttribute-分类表categoryList-影响X轴
无-仅有一组分组表dataList：影响图例和数据(仅一组分组表)

#####饼图 
分组依据classifyAttribute-分类表categoryList-影响图例和数据分类
无-仅有一组分组表dataList：影响数据




