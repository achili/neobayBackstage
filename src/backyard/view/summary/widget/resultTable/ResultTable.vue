<template>
  <div>

    <el-table :data="pager[pager.TAGS]" border>

      <el-table-column
        prop="baseIndex"
        label="序号"
        :resizable="false"
        width="68">
      </el-table-column>

      <el-table-column
        v-for="summaryAttribute in summary.summaryAttributeInfo" :key="summaryAttribute.name"
        :prop="summaryAttribute.name"
        :label="summaryAttribute.description"
        :formatter="formatter"
        width="180">
      </el-table-column>
    </el-table>



    <div>
      <NbPager :pager="pager" :callback="refresh"></NbPager>
    </div>
  </div>
</template>
<script>
  import NbPager from "../../../../../common/widget/NbPager.vue";

  import Summary from "../../../../../common/model/summary/Summary";
  import Pager from "../../../../../common/model/base/Pager";

  import {humanTime} from "../../../../../common/filter/time";
  import {endWith} from "../../../../../common/filter/str";

  export default{
    data(){
      return {
        hehe: false
      }
    },
    props: {
      summary: {
        type: Summary,
        required: true
      },
      pager: {
        type: Pager,
        required: true
      },
      refresh: {
        type: Function,
        required: true
      },
      width: {
        type: String,
        required: false,
        "default": "120px"
      }
    },
    components: {
      NbPager
    },
    watch: {},
    methods: {

      //这里要处理  时间/布尔/状态，但是这样“状态”会导致前后端双维护......
      //注意 ：此处的cellValue 在liux环境中一直为未定义，原因未知，所以不用cellValue的值
      formatter(row, column, cellValue) {
        let parameterNameArr = column.property.split(".");
        if(parameterNameArr.length === 0) {
          return null;
        }
        let newCellValue = row;
        parameterNameArr.forEach(item => {
          newCellValue = newCellValue[item];
          if(!newCellValue) {
            return null;
          }
        });
        if(newCellValue instanceof Date) {
          return humanTime(newCellValue)
        } else if((typeof newCellValue) === 'boolean') {
          return newCellValue ? '是' : '否';
        } else if(column.property === 'status') {
          return row.getStatusName();
        } else if(endWith(column.property, '.status')) {
          let result = newCellValue;
          //跨级status状态转换
          let arr = column.property.split('.');
          let obj = row;
          arr.forEach(field => {
            if(field === 'status') {
              if(obj.getStatusName instanceof Function) {
                result = obj.getStatusName();
                return result;
              } else {
                result = newCellValue;
                return result;
              }
            }
            if(obj[field]) {
              obj = obj[field];
            }
          })
          return result;
        }else {
          return newCellValue;
        }
      }
    },
    computed: {

    },
    mounted(){

    }
  }
</script>
